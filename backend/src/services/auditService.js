import { v4 as uuidv4 } from "uuid";

import db from "../config/database.js";
import { crawlNavigation } from "../crawlers/navigationCrawler.js";
import { fetchPage } from "../utils/fetchPage.js";
import { analyzePage } from "./seoAnalyzer.js";
import { normalizeUrl } from "../utils/normalizeUrl.js";

export const getAudit = async (auditId) => {
	return new Promise((resolve, reject) => {
		db.get(`SELECT * FROM audits WHERE id = ?`, [auditId], (err, audit) => {
			if (err) return reject(err);
			if (!audit) return resolve(null);

			db.all(
				`SELECT * FROM pages WHERE audit_id = ?`,
				[auditId],
				(err, pages) => {
					if (err) return reject(err);

					const summary = {
						missing_titles: 0,
						multiple_h1: 0,
						noindex_pages: 0,
						non_200_pages: 0,
						title_length_invalid: 0,
						meta_description_length_invalid: 0,
						meta_description_invalid: 0,
					};

					pages.forEach((page) => {
						const issues = JSON.parse(page.issues || "[]");

						if (issues.includes("TITLE_MISSING")) summary.missing_titles++;
						if (issues.includes("MULTIPLE_H1")) summary.multiple_h1++;
						if (issues.includes("NOINDEX")) summary.noindex_pages++;
						if (page.status_code !== 200) summary.non_200_pages++;
						if (issues.includes("TITLE_LENGTH_INVALID"))
							summary.title_length_invalid++;
						if (issues.includes("META_DESCRIPTION_LENGTH_INVALID"))
							summary.meta_description_length_invalid++;
						if (issues.includes("META_DESCRIPTION_INVALID"))
							summary.meta_description_invalid++;
					});

					resolve({
						audit_id: auditId,
						url: audit.url,
						summary,
						pages,
					});
				},
			);
		});
	});
};

export const createAudit = async (url) => {
	const auditId = uuidv4();

	db.run(`INSERT INTO audits (id, url) VALUES (?, ?)`, [auditId, url]);

	const MAX_PAGES = 25;
	const pages = (await crawlNavigation(url)).slice(0, MAX_PAGES);
	const home = normalizeUrl(url);
	if (!pages.includes(home)) {
		pages.unshift(home);
	}

	await Promise.all(
		pages.map(async (pageUrl) => {
			try {
				const { html, statusCode, pageSizeKb } = await fetchPage(pageUrl);

				const analysis = analyzePage(html, statusCode, pageSizeKb);

				db.run(
					`INSERT INTO pages (
							audit_id,
							url,
							status_code,
							title_length,
							meta_description_length,
							h1_count,
							canonical_present,
							noindex,
							page_size_kb,
							internal_link_count,
							issues
						) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
					[
						auditId,
						pageUrl,
						statusCode,
						analysis.metrics.title_length,
						analysis.metrics.meta_description_length,
						analysis.metrics.h1_count,
						analysis.metrics.canonical_present,
						analysis.metrics.noindex,
						analysis.metrics.page_size_kb,
						analysis.metrics.internal_link_count,
						JSON.stringify(analysis.issues),
					],
				);
			} catch (error) {
				console.error("Failed page:", pageUrl);
			}
		}),
	);

	return {
		audit_id: auditId,
		message: "Audit completed",
	};
};

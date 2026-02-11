import * as cheerio from "cheerio";
import { fetchPage } from "../utils/fetchPage.js";
import { normalizeUrl } from "../utils/normalizeUrl.js";

export const crawlNavigation = async (startUrl) => {
	const { html } = await fetchPage(startUrl);

	const $ = cheerio.load(html);

	const baseUrl = new URL(startUrl).origin;
	const links = new Set();

	const collectLinks = (selector) => {
		$(selector).each((_, el) => {
			const href = $(el).attr("href");
			if (!href) return;

			const absolute = new URL(href, baseUrl).href;
			const normalized = normalizeUrl(absolute);

			if (normalized && normalized.startsWith(baseUrl)) {
				links.add(normalized);
			}
		});
	};

	collectLinks("nav a");
	collectLinks("header a");

	// ---- Fallback if nav empty
	if (links.size === 0) {
		collectLinks("a");
	}

	return [...links];
};

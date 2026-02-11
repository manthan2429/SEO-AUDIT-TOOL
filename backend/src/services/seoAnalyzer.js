import * as cheerio from "cheerio";

export const analyzePage = (html, statusCode, pageSizeKb) => {
	const $ = cheerio.load(html);

	const issues = [];
	const title = $("title").text().trim();
	const titleLength = title.length;

	if (!title) issues.push("TITLE_MISSING");
	if (titleLength && (titleLength < 30 || titleLength > 65))
		issues.push("TITLE_LENGTH_INVALID");

	const metaDesc = $('meta[name="description"]').attr("content") || "";
	const metaLength = metaDesc.length;

	if (!metaDesc) issues.push("META_DESCRIPTION_MISSING");
	if (metaLength && (metaLength < 70 || metaLength > 160))
		issues.push("META_DESCRIPTION_INVALID");

	const h1Count = $("h1").length;
	if (h1Count === 0) issues.push("H1_MISSING");
	if (h1Count > 1) issues.push("MULTIPLE_H1");

	const canonical = $('link[rel="canonical"]').attr("href");
	const canonicalPresent = canonical ? 1 : 0;
	if (!canonical) issues.push("CANONICAL_MISSING");

	const robots = $('meta[name="robots"]').attr("content") || "";
	const noindex = robots.includes("noindex") ? 1 : 0;
	if (noindex) issues.push("NOINDEX");

	if (pageSizeKb > 2048) issues.push("PAGE_TOO_LARGE");
	const internalLinkCount = $("a")
		.map((_, el) => $(el).attr("href"))
		.get()
		.filter(Boolean).length;

	if (statusCode !== 200) {
		issues.push("NON_200_STATUS");
	}

	return {
		issues,
		metrics: {
			title_length: titleLength,
			meta_description_length: metaLength,
			h1_count: h1Count,
			canonical_present: canonicalPresent,
			noindex,
			page_size_kb: Math.round(pageSizeKb),
			internal_link_count: internalLinkCount,
		},
	};
};

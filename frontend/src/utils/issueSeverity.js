export const getIssueSeverity = (issue) => {
	const high = [
		"TITLE_MISSING",
		"H1_MISSING",
		"MULTIPLE_H1",
		"NOINDEX",
		"NON_200_STATUS",
	];

	const medium = [
		"META_DESCRIPTION_MISSING",
		"CANONICAL_MISSING",
		"PAGE_TOO_LARGE",
	];

	if (high.includes(issue)) return "error";
	if (medium.includes(issue)) return "warning";

	return "info";
};

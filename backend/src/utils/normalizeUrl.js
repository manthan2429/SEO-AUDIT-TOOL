export const normalizeUrl = (url) => {
	try {
		const parsed = new URL(url);

		parsed.hash = "";
		parsed.search = "";

		let normalized = parsed.href;

		if (normalized.endsWith("/")) {
			normalized = normalized.slice(0, -1);
		}

		return normalized;
	} catch {
		return null;
	}
};

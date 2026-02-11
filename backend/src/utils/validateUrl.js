export const validateUrl = (url) => {
	try {
		const parsedUrl = new URL(url);

		if (!["http:", "https:"].includes(parsedUrl.protocol)) {
			return false;
		}

		return true;
	} catch (error) {
		return false;
	}
};

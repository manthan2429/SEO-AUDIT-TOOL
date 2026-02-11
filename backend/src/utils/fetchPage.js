import axios from "axios";

export const fetchPage = async (url) => {
	try {
		const response = await axios.get(url, {
			timeout: 10000,
			validateStatus: () => true,
		});

		const html = response.data || "";
		const statusCode = response.status;

		const pageSizeKb = Buffer.byteLength(html, "utf8") / 1024;

		return {
			html,
			statusCode,
			pageSizeKb,
		};
	} catch (error) {
		return {
			html: "",
			statusCode: 0,
			pageSizeKb: 0,
		};
	}
};

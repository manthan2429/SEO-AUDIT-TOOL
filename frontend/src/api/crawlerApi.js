import axios from "./axios.js";

export const fetchCrawlResults = async () => {
	return await axios.get(`/crawl`);
};

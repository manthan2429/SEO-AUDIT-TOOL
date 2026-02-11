import axios from "./axios.js";

export const startAudit = (url) => {
	return axios.post("/audit", { url });
};

export const getAudit = (auditId) => {
	return axios.get(`/audit/${auditId}`);
};

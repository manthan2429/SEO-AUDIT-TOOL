import * as auditService from "../services/auditService.js";
import { validateUrl } from "../utils/validateUrl.js";

export const startAudit = async (req, res) => {
	try {
		const { url } = req.body;

		if (!url || !validateUrl(url)) {
			return res.status(400).json({
				success: false,
				message: "Valid URL is required.",
			});
		}

		const audit = await auditService.createAudit(url);

		return res.json({
			success: true,
			data: audit,
		});
	} catch (error) {
		console.error(error);
		return res.status(500).json({
			success: false,
			message: error.message || "Failed to start audit.",
		});
	}
};

export const getAuditResult = async (req, res) => {
	try {
		const { id } = req.params;

		const result = await auditService.getAudit(id);

		if (!result) {
			return res.status(404).json({
				success: false,
				message: "Audit not found.",
			});
		}

		return res.json({
			success: true,
			data: result,
		});
	} catch (error) {
		console.error(error);
		return res.status(500).json({
			success: false,
			message: error.message || "Failed to fetch audit.",
		});
	}
};

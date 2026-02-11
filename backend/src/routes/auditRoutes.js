import express from "express";
import { startAudit, getAuditResult } from "../controller/auditController.js";

const router = express.Router();

router.post("/", startAudit);
router.get("/:id", getAuditResult);

export default router;

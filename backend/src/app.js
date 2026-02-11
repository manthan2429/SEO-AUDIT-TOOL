import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import initDb from "./models/initDb.js";
import auditRoutes from "./routes/auditRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

initDb();

app.get("/health", (req, res) => {
	res.json({ status: "Server running" });
});

app.use("/audit", auditRoutes);

export default app;

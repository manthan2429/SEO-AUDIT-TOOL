import sqlite3 from "sqlite3";
import path from "path";
import dotenv from "dotenv";
import { fileURLToPath } from "url";

dotenv.config();

// Needed in ES Modules to get __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Fallback added to prevent crash
const dbPath = path.resolve(
	__dirname,
	process.env.DB_PATH || "./database.sqlite",
);

console.log("Database Path:", dbPath);

const db = new sqlite3.Database(dbPath, (err) => {
	if (err) {
		console.error("Database connection error:", err.message);
	} else {
		console.log("Connected to SQLite database");
	}
});

export default db;

import sqlite3 from "sqlite3";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

const dbPath = path.resolve(process.env.DB_PATH);

const db = new sqlite3.Database(dbPath, (err) => {
	if (err) {
		console.error("Database connection error:", err.message);
	} else {
		console.log("Connected to SQLite database");
	}
});

export default db;

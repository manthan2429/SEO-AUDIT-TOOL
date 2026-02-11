import db from "../config/database.js";

const initDb = () => {
	db.serialize(() => {
		db.run(`
      CREATE TABLE IF NOT EXISTS audits (
        id TEXT PRIMARY KEY,
        url TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

		db.run(`
      CREATE TABLE IF NOT EXISTS pages (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        audit_id TEXT,
        url TEXT,
        status_code INTEGER,
        title_length INTEGER,
        meta_description_length INTEGER,
        h1_count INTEGER,
        canonical_present INTEGER,
        noindex INTEGER,
        page_size_kb INTEGER,
        internal_link_count INTEGER,
        issues TEXT,
        FOREIGN KEY(audit_id) REFERENCES audits(id)
      )
    `);
	});
};

export default initDb;

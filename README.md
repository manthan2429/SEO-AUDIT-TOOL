# 🔎 SEO Audit Tool

![React](https://img.shields.io/badge/Frontend-React-blue)
![Node](https://img.shields.io/badge/Backend-Node.js-green)
![Express](https://img.shields.io/badge/API-Express-black)
![SQLite](https://img.shields.io/badge/Database-SQLite-lightgrey)
![Docker](https://img.shields.io/badge/Container-Docker-blue)
![License](https://img.shields.io/badge/License-MIT-yellow)

> Turning website navigation data into meaningful SEO insights.

---

## 📌 Project Overview

Technical SEO Audit Tool is a full-stack web application that performs navigation-based crawling and detects critical technical SEO issues. The system converts raw crawl diagnostics into structured, decision-ready insights using a dashboard-driven interface.

---

## ✨ Key Features

- 🌐 Navigation-based website crawling
- 🔍 Automated technical SEO analysis
- 📊 Audit summary dashboard
- 📄 Page-level issue breakdown
- ⚡ Skeleton loaders & responsive UI
- 🐳 Fully containerized using Docker
- 🔄 Non-blocking audit processing

---

## 🧱 Tech Stack

### Frontend
- React (Vite)
- Material UI
- Axios

### Backend
- Node.js
- Express.js
- Cheerio (HTML Parsing)

### Database
- SQLite

### DevOps
- Docker
- Docker Compose

---

## 🕸 Crawl Strategy

The crawler follows structured navigation-based rules:

1. Crawl starts from homepage.
2. Extracts links from:
   - `<nav>` elements
   - Header navigation
   - Primary anchor elements
3. Only same-domain URLs are crawled.
4. Duplicate URLs are normalized and removed.
5. Crawl depth is limited to avoid infinite loops.

---

## 🔍 SEO Checks Implemented

Each crawled page is validated for:

- Title Tag (30–65 characters)
- Meta Description (70–160 characters)
- H1 Tag Count (must be exactly one)
- Canonical Tag Presence
- Noindex Detection
- HTTP Status Validation
- Page Size Validation (>2MB)
- Internal Link Count

---

## 🏗 Architecture Overview

User Input
│
▼
Frontend (React Dashboard)
│
▼
Backend API (Express)
│
├── Navigation Crawler
├── SEO Analyzer
└── Result Processor
│
▼
SQLite Database
│
▼
Frontend Visualization


---

## 🔄 Data Flow

### Step 1 — Start Audit
User submits a website URL from frontend.

### Step 2 — Crawl & Analysis
Backend:
- Crawls navigation links
- Runs SEO validation checks
- Stores audit results

### Step 3 — Result Display
Frontend:
- Displays audit summary
- Shows page-level issue breakdown
- Highlights severity indicators

---

## 📸 Screenshots

### Start Audit Page
<img width="1914" height="847" alt="image" src="https://github.com/user-attachments/assets/2ce2425e-347f-4fec-aeb5-3b28b82fab0b" />


/screenshots/start-audit.png


### Audit Overview Dashboard
<img width="1893" height="797" alt="image" src="https://github.com/user-attachments/assets/b887fec7-435d-4936-a78a-5e37af2dbc5e" />


/screenshots/audit-overview.png


### Page-Level Breakdown
<img width="1861" height="660" alt="image" src="https://github.com/user-attachments/assets/91d98620-1194-4b62-8932-1bb260ff185d" />


/screenshots/page-breakdown.png


---

## 🐳 Running with Docker

### Prerequisites
- Docker
- Docker Compose

---

### Start Application

```bash
docker compose up --build

Access Services

Frontend:

http://localhost:5173


Backend API:

http://localhost:5000

📂 Project Structure
backend/
frontend/
docker-compose.yml
README.md

💼 Resume Description

Developed a full-stack technical SEO auditing platform that performs navigation-based crawling, analyzes SEO metrics, and visualizes diagnostics through an interactive React dashboard. Implemented backend crawling logic, SEO validation, and Dockerized deployment for scalable execution.

👨‍💻 Author

Manthan Patel
Full Stack MERN Developer




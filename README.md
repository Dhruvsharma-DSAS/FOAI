<p align="center">
  <img src="https://img.shields.io/badge/FOAI-Project-brightgreen?style=for-the-badge" alt="FOAI Project"/>
  <img src="https://img.shields.io/badge/Platform-EduPulse-blue?style=for-the-badge" alt="EduPulse"/>
  <img src="https://img.shields.io/badge/Automation-n8n-orange?style=for-the-badge" alt="n8n"/>
  <img src="https://img.shields.io/badge/Deployed-Vercel-black?style=for-the-badge" alt="Vercel"/>
</p>

<h1 align="center">📚 EduPulse — AI-Powered Student Engagement Tracking System</h1>

<p align="center">
  <b>FOAI Project — Fundamentals of Artificial Intelligence</b><br/>
  An end-to-end automated system that tracks, scores, and visualizes student engagement using AI, workflow automation, and a live web dashboard.
</p>

<p align="center">
  🌐 <a href="https://foai-4iif.vercel.app/"><b>Live Website → foai-4iif.vercel.app</b></a>
</p>

---

## 🎯 Problem Statement

Classroom engagement is invisible to both students and institutions. Teachers deliver lectures without quantitative insight into whether students are understanding the material, losing interest, or falling behind. Feedback collected through forms accumulates in spreadsheets but is rarely analyzed in a structured or timely manner. By the time a struggling student is identified, it is often too late for effective intervention.

### Specific Gaps Addressed

| Gap | Problem | Our Solution |
|-----|---------|--------------|
| **Data Silos** | Student feedback, teacher evaluations, and sentiment exist in separate systems with no unified view | 3-source merge pipeline joining Student Data + Teacher Feedback + AI Sentiment by Student ID |
| **No Syllabus Alignment** | No automated way to verify if teachers cover the required syllabus content | AI-powered transcript vs. syllabus comparison with coverage percentage and quality rating |
| **Scores Without Visibility** | Engagement scores remain locked in spreadsheets; students and teachers can't access them | Live React dashboard at [foai-4iif.vercel.app](https://foai-4iif.vercel.app/) with role-based views |

---

## 🔑 Sample Login Data

To explore the dual-dashboard system, use the following credentials:

### 👨‍🏫 Teacher Access
- **ID:** `Dhruvsh`
- **Password:** `Dhruv`

### 🎓 Student Access
*All students use the password:* **`Dhruv`**

| Student Name | ID | Login Email |
|--------------|----|-------------|
| Dhruv | 101 | `dhruv@email.com` |
| Rahul | 102 | `rahul@email.com` |
| Aisha | 103 | `aisha@email.com` |
| Neha | 104 | `neha@email.com` |
| Arjun | 105 | `arjun@email.com` |
| Simran | 106 | `simran@email.com` |
| Karan | 107 | `karan@email.com` |
| Priya | 108 | `priya@email.com` |
| Aman | 109 | `aman@email.com` |
| Riya | 110 | `riya@email.com` |

---

## 🏗️ System Architecture

```
┌─────────────────────────────────────────────────────────────────────────┐
│                        EduPulse Architecture                            │
├─────────────┬──────────────────┬───────────────┬────────────────────────┤
│  DATA       │  PROCESSING      │  DATA API     │  DASHBOARD             │
│  COLLECTION │                  │               │                        │
│             │                  │               │                        │
│ Google      │   n8n Workflow   │   SheetDB     │  React + Vercel        │
│ Forms +     │   (27 Nodes)     │   REST API    │  foai-4iif.vercel.app  │
│ Sheets      │                  │               │                        │
│             │  ┌──────────┐    │               │  • Landing Page        │
│ Student     │  │Pipeline A│    │  Google       │  • Student Dashboard   │
│ Form ───────┼─►│Engagement│────┼─►Sheets ──────┼─►• Teacher Dashboard   │
│             │  │Scoring   │    │  → JSON API   │  • Workflow Page       │
│ Teacher     │  └──────────┘    │               │                        │
│ Form ───────┤                  │               │                        │
│             │  ┌──────────┐    │               │                        │
│ Teacher     │  │Pipeline B│    │               │                        │
│ Notes ──────┼─►│Transcript│    │               │                        │
│ (G.Docs)    │  │Analysis  │    │               │                        │
│             │  └──────────┘    │               │                        │
│ Teacher     │        │         │               │                        │
│ Transcript──┤  ┌──────────┐   │               │                        │
│ (G.Docs)    │  │Pipeline C│   │               │                        │
│             │  │Report    │───┼─►Google Doc    │                        │
│             │  │Generation│   │  (Final Report)│                        │
│             │  └──────────┘   │               │                        │
└─────────────┴──────────────────┴───────────────┴────────────────────────┘
```

### End-to-End Data Flow

**Student Scoring Pipeline:**
> Google Form → Google Sheets → n8n → Groq AI (Sentiment) → JavaScript Merge → Weighted Score → Risk Classification → Google Sheets → SheetDB API → React Dashboard

**Teacher Analysis Pipeline:**
> Teacher Notes (Google Doc) → Chunked → Teacher Transcript (Google Doc) → Chunked → Groq AI Comparison → Coverage Score → Groq AI Summary → Merged with Student Data → Gemini Final Report → Google Doc

---

## 📊 JSON Data & API

The dashboard consumes live data from SheetDB, which converts the Google Sheets output into a REST JSON API.

**API Endpoint:**
```
https://sheetdb.io/api/v1/dgy8jxa62wops
```

### Sample JSON Response

```json
[
  {
    "Student Name": "Dhruv",
    "Student ID": "101",
    "Understanding (Student)": "8",
    "Quiz (%)": "75",
    "Interest": "7",
    "Assignment": "85",
    "Doubt": "Some",
    "Pace": "Perfect",
    "feedback_level": "Neutral",
    "Teacher Participation": "8",
    "Teacher Attention": "7",
    "Teacher Understanding": "7",
    "Effort": "8",
    "Student Score": "78",
    "Teacher Score": "75",
    "Final Engagement Score": "75",
    "Risk Level": "Low Risk"
  }
]
```

### JSON Data Schema

| Field | Type | Source | Description |
|-------|------|--------|-------------|
| `Student Name` | String | Student Form | Student identity |
| `Student ID` | Number | Student Form | Unique merge key across all data sources |
| `Understanding (Student)` | 1–10 | Student Form | Self-assessed comprehension |
| `Quiz (%)` | 0–100 | Student Form | Post-class quiz score |
| `Interest` | 1–10 | Student Form | Self-reported motivation |
| `Assignment` | 0–100 | Student Form | Assignment completion score |
| `Doubt` | None/Some/Many | Student Form | Confusion level |
| `Pace` | Slow/Perfect/Fast | Student Form | Perceived lecture speed |
| `Feedback` | Free text | Student Form | Open-ended feedback (analyzed by AI) |
| `feedback_level` | Positive/Neutral/Negative | AI (Groq) | AI-classified sentiment |
| `Teacher Participation` | 1–10 | Teacher Form | Observed participation |
| `Teacher Attention` | 1–10 | Teacher Form | Observed attentiveness |
| `Teacher Understanding` | 1–10 | Teacher Form | Teacher's judgment of comprehension |
| `Effort` | 1–10 | Teacher Form | Observed dedication |
| `Student Score` | 0–100 | Calculated | Weighted student metrics |
| `Teacher Score` | 0–100 | Calculated | Weighted teacher metrics |
| `Final Engagement Score` | 0–100 | Calculated | Combined weighted score |
| `Risk Level` | Low/Medium/High | Classified | Engagement risk category |

---

## ⚙️ n8n Workflow — 27-Node Pipeline

The n8n automation workflow is the brain of EduPulse. It runs three parallel pipelines that converge into a final report.

### Pipeline A — Student Engagement Scoring (Nodes 1–11)

Reads student and teacher data, runs AI sentiment analysis, merges all sources, calculates weighted scores, classifies risk, and writes results.

| # | Node Name | Type | Function |
|---|-----------|------|----------|
| 1 | Execute Workflow | Manual Trigger | Starts all pipelines simultaneously |
| 2 | Student Data | Google Sheets (Read) | Reads 10 student responses (14 columns) |
| 3 | Teacher Feedback | Google Sheets (Read) | Reads 10 teacher evaluations (6 columns) |
| 4 | Sentiment Conversion | LLM Chain | Sends feedback to Groq AI → Positive/Neutral/Negative |
| 5 | Groq Chat Model | Groq (gpt-oss-120b) | AI model for sentiment classification |
| 6 | Convert Sentiment | JavaScript | Parses AI JSON; extracts student_id + feedback_level |
| 7 | Combine Conversion | JavaScript | 3-source merge using Student ID as key |
| 8 | Split Items | JavaScript | Splits merged array into individual items |
| 9 | Append Row | Google Sheets (Append) | Writes combined data to sheet |
| 10 | Engagement Score & Risk | JavaScript | Applies weighted formula + risk classification |
| 11 | Write Scores | Google Sheets (Update) | Writes final scored data to output sheet |

### Pipeline B — Teacher Transcript Analysis (Nodes 12–22)

| # | Node Name | Type | Function |
|---|-----------|------|----------|
| 12 | Teacher Notes | Google Docs (Read) | Fetches official syllabus document |
| 13 | Teacher Transcript | Google Docs (Read) | Fetches lecture transcript |
| 14 | Chunk Notes | JavaScript | Smart extraction: first 1500 + 4 middle sentences + last 1500 chars |
| 15 | Chunk Transcript | JavaScript | Same chunking logic (~70% token reduction) |
| 16 | Merge | Merge Node | Combines chunked notes + transcript |
| 17 | LLM Comparison | LLM Chain | AI compares transcript vs syllabus → coverage %, rating |
| 18 | Groq Chat Model | Groq (llama-3.1-8b) | AI model for transcript comparison |
| 19 | Parse Results | JavaScript | Normalizes AI response; extracts metrics |
| 20 | Aggregate | JavaScript | Deduplicates topics; calculates averages |
| 21 | Teacher Summary | LLM Chain | Generates teacher performance summary |
| 22 | Groq Chat Model | Groq (llama-3.1-8b) | AI model for summary generation |

### Pipeline C — Report Generation (Nodes 23–27)

| # | Node Name | Type | Function |
|---|-----------|------|----------|
| 23 | Format Analytics | JavaScript | Transforms scored data for class-wide analysis |
| 24 | Class Analysis | Gemini 2.0 Flash | Analyzes risk distribution, averages, patterns |
| 25 | Final Merge | Merge Node | Combines student analytics + teacher analysis |
| 26 | Report Generator | Gemini 2.0 Flash | Generates comprehensive final text report |
| 27 | Write Report | Google Docs (Update) | Inserts report into Google Doc |

---

## 📐 Engagement Score Formula

### Three-Part Weighted Scoring System

**Student Score (60% of final):**
```
Student Score = 0.25 × Understanding + 0.25 × Quiz + 0.15 × Interest
             + 0.15 × Assignment + 0.10 × Doubt + 0.10 × Pace
```

**Teacher Score (30% of final):**
```
Teacher Score = 0.30 × Participation + 0.25 × Attention
             + 0.25 × Understanding + 0.20 × Effort
```

**Final Engagement Score:**
```
Final Score = 0.6 × Student Score + 0.3 × Teacher Score + 0.1 × Sentiment Score
```

### Categorical Conversions

| Input | Value | Score |
|-------|-------|-------|
| Doubt: None | — | 100 |
| Doubt: Some | — | 60 |
| Doubt: Many | — | 30 |
| Pace: Perfect | — | 100 |
| Pace: Slow | — | 70 |
| Pace: Fast | — | 50 |
| Sentiment: Positive | — | 100 |
| Sentiment: Neutral | — | 60 |
| Sentiment: Negative | — | 30 |

### Risk Classification

| Score Range | Risk Level | Action |
|-------------|------------|--------|
| ≥ 75 | 🟢 Low Risk | Maintain & challenge |
| 50 – 74 | 🟡 Medium Risk | Increase support & practice |
| < 50 | 🔴 High Risk | Immediate intervention required |

---

## 🌐 Website — EduPulse Dashboard

**🔗 Live at: [https://foai-4iif.vercel.app/](https://foai-4iif.vercel.app/)**

### Tech Stack

| Component | Technology |
|-----------|------------|
| Frontend | React (SPA) |
| Data Source | SheetDB REST API |
| Hosting | Vercel (auto-deploy from GitHub) |
| Auth | Client-side email + password matching |
| Updates | Real-time via SheetDB — reflects n8n output on page load |

### Pages

| Page | Description |
|------|-------------|
| **Landing** | Animated hero with classroom illustration, feature sections, stat counters (500+ Students, 98% Accuracy, Real-time), and login CTA |
| **Student Dashboard** | Personal view after email login — shows Final Score, Risk Level, all individual metrics, teacher evaluation, sentiment, and remarks |
| **Teacher Dashboard** | Class-wide analytics — 4 stat cards (Total Students, Avg Engagement, High Risk, Low Risk), searchable/sortable student table, risk filters, edit mode |
| **How It Works** | Interactive visualization of the n8n workflow pipeline |

### 🔐 Demo Credentials

Use these credentials to explore the dual-dashboard system:

| Role | Email / ID | Password |
|------|------------|----------|
| **Student** | `Dhruv` | `Dhruv` |
| **Teacher** | `Dhruvsh` | *(Any)* |
| **Teacher** | `Dhruv` | *(Any)* |

---

## 🤖 AI Models & Token Strategy

| Model | Provider | Used For | Reason |
|-------|----------|----------|--------|
| gpt-oss-120b | Groq | Sentiment Classification | High accuracy for nuanced feedback |
| llama-3.1-8b-instant | Groq | Transcript Comparison | Fast inference, lower token cost |
| gemini-2.0-flash | Google AI | Analytics & Report | Strong synthesis of multiple data sources |

### Token Optimization (70% Reduction)

Documents over 3,000 characters are chunked: first 1,500 chars + 4 evenly-spaced middle sentences + last 1,500 chars. This reduces ~10,000+ character documents to ~3,500 characters while preserving content from all sections of the lecture.

---

## 📈 Sample Output Data

| Name | ID | Sentiment | S.Score | T.Score | Final | Risk |
|------|----|-----------|---------|---------|-------|------|
| Dhruv | 101 | Neutral | 78 | 75 | **75** | 🟢 Low |
| Rahul | 102 | Negative | 46 | 45 | **44** | 🔴 High |
| Aisha | 103 | Positive | 77 | 83 | **81** | 🟢 Low |
| Neha | 104 | Neutral | 65 | 60 | **63** | 🟡 Medium |
| Arjun | 105 | Positive | 92 | 90 | **92** | 🟢 Low |
| Simran | 106 | Positive | 58 | 55 | **61** | 🟡 Medium |
| Karan | 107 | Negative | 38 | 35 | **36** | 🔴 High |
| Priya | 108 | Positive | 81 | 80 | **83** | 🟢 Low |
| Aman | 109 | Neutral | 69 | 65 | **67** | 🟡 Medium |
| Riya | 110 | Negative | 32 | 28 | **31** | 🔴 High |

**Risk Distribution:** 40% Low Risk · 30% Medium Risk · 30% High Risk

---

## 🔗 External Services & APIs

| Service | Purpose |
|---------|---------|
| Google Sheets | Data storage (4 sheets: Student Data, Teacher Feedback, Combine Data, Engagement Score) |
| Google Docs | Document storage (Teacher Notes, Transcript, Generated Report) |
| SheetDB | Google Sheets → REST JSON API (`https://sheetdb.io/api/v1/dgy8jxa62wops`) |
| Groq API | LLM inference — sentiment analysis + transcript comparison |
| Google Gemini | LLM inference — class analytics + report generation |
| Vercel | Dashboard hosting |
| n8n | Workflow automation engine (27-node pipeline) |

---

## 🚀 Future Scope

- **Automated Scheduling** — Cron-based triggers + webhook from Google Forms for real-time pipeline execution
- **Historical Trends** — Time-series tracking with trend charts showing student progress over weeks/months
- **Smart Alerts** — Auto-email teachers when students enter High Risk; weekly admin summaries
- **PDF Reports** — Downloadable reports for parent-teacher meetings
- **Multi-Scale** — Support for multiple subjects, classes, teachers, and schools
- **Database Migration** — Move from Google Sheets to PostgreSQL/Firebase for production-scale data

---

## 🛠️ Local Setup

```bash
# Clone the repository
git clone https://github.com/Dhruvsharma-DSAS/FOAI.git
cd FOAI/edupulse

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will run at `http://localhost:5173`.

---

## 📄 Project Info

| Field | Details |
|-------|---------|
| **Project** | FOAI — Fundamentals of Artificial Intelligence |
| **Platform** | EduPulse |
| **Author** | Dhruv Sharma |
| **Batch** | VMT35 |
| **Date** | April 2026 |
| **Live URL** | [https://foai-4iif.vercel.app/](https://foai-4iif.vercel.app/) |

---

<p align="center">
  <b>27 n8n nodes · 3 AI models · 6 data sources · 10 students tracked · 3 risk categories · 4 dashboard pages</b><br/>
  <i>Teacher transcript analysis with 70% token optimization</i><br/><br/>
  🌐 <a href="https://foai-4iif.vercel.app/"><b>Live at foai-4iif.vercel.app</b></a>
</p>

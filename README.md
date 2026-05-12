# SkillMap — Stage 1 Report

## 0. 🧑‍💻 Team Formation & Role Definition

**Team Member:**

| Name | Role | Responsibilities |
|------|------|-----------------|
| Lucas Scianna | Fullstack Developer & Project Manager | Architecture, frontend, backend, API integration, planning, task tracking |

SkillMap is a solo project — approved by Holberton School. Having one person handle both development and project management was a deliberate choice: it removes coordination overhead, keeps decision-making fast, and gives full ownership over every layer of the product. There's no handoff, no waiting on someone else, no miscommunication between teams. Everything moves at the same pace.

### Communication & Collaboration Tools

- **GitHub Projects** — main task board, used for sprint planning and progress tracking
- **Notion** — documentation hub (specs, notes, research, design decisions)
- **Discord** — async communication with the project coach and reviewers

### Collaboration Standards

- Daily commits with clear, descriptive messages
- One-week sprints with defined deliverables
- Personal code review at the end of each sprint — reviewing my own PRs before merging, checking for consistency and quality
- No external stakeholders involved in this project

---

## 1. 💡 Brainstorming & Idea Evaluation

### Step 1 — Ideas Explored

Before settling on SkillMap, I went through a bunch of different ideas. Some were tools I personally wanted, others came from problems I noticed around me. Here are the ones that made it furthest:

1. **FocusFlow** — A work timer with built-in task prioritization and weekly productivity stats. Basically a Pomodoro on steroids.
2. **MeetingMind** — Upload a meeting transcript, and the tool pulls out action items, decisions, and follow-ups automatically.
3. **HabitCoach** — A habit tracker that doesn't just log your habits but gives you personalized feedback on what's working and what isn't.
4. **Decision Journal** — Log your decisions, the reasoning behind them, and revisit them later to see how they played out.
5. **SkillMap** — Analyzes the gap between a user's current profile and their career goal, then generates a personalized learning roadmap with concrete resources.

### Step 2 — Evaluation & Ranking

Each idea was scored on three criteria: **Feasibility** (can I actually build this solo in 4–6 weeks?), **Impact** (does it solve a real, felt problem?), and **Innovation** (is there already a good tool for this?). The final score is a weighted average out of 10.

| Idea | Feasibility | Impact | Innovation | Score (/10) | Status |
|------|:-----------:|:------:|:----------:|:-----------:|--------|
| FocusFlow | 9 | 6 | 3 | 8 | ❌ Rejected — market is saturated with similar tools |
| MeetingMind | 5 | 8 | 7 | 5 | ❌ Rejected — scope way too large for a solo project |
| HabitCoach | 7 | 7 | 5 | 7 | ❌ Rejected — unclear what the MVP would actually look like |
| Decision Journal | 7 | 6 | 7 | 7 | ❌ Rejected — value only becomes clear after months of use |
| **SkillMap** | **9** | **9** | **8** | **9** | ✅ **Selected** |

---

## 2. 🎯 Decision & Refinement — SkillMap

### The Problem

Here's something I noticed during my time at Holberton: a lot of us have a rough idea of where we want to go career-wise, but almost nobody has a clear picture of what's actually missing to get there. You might want to become a backend engineer, but do you know exactly which skills you're lacking? And once you know, do you know what to learn first, and where?

There are plenty of job boards, plenty of online courses, and plenty of career advice blogs. But nothing that connects the dots — nothing that looks at *your* specific profile and tells you "here's the gap, here's the plan."

### The Solution

SkillMap lets users input their current profile — skills, education, experience — and define a target: a job title, a specific job listing, or just a career direction. The app then uses AI to analyze the gap between where they are and where they want to be, and generates a structured roadmap: what to learn, in what order, how long it should take, and where to find the resources.

It's not a course platform. It's not a job board. It's the step that comes before both of those — figuring out what you actually need.

### Target Audience

- Students wrapping up a bootcamp or degree, trying to figure out their next move
- People going through a career change who need a structured path forward
- Junior developers preparing for their job search and wanting to fill gaps strategically

### Application Type

Web application (responsive), accessible from any browser — no installation required.

### Why SkillMap Over the Other Ideas

- It solves a problem I've personally experienced during my training at Holberton
- It's applicable to any field, not just software development
- No existing tool covers the full pipeline — gap analysis → prioritized roadmap → curated resources — in one simple interface
- Technically feasible as a solo project using React, Node.js, and a local open-source AI model, within a 4 to 6 week timeline

### 3 Key Features (SMART)

1. **Gap Analysis** — The user fills in their profile and enters a career target. The AI identifies the missing skills in under 10 seconds.
2. **Roadmap Generation** — A prioritized list of skills to acquire, each with an estimated learning duration, generated with every analysis.
3. **Resource Suggestions** — For each missing skill, at least 2 concrete resources (courses, projects, readings) are suggested automatically.

### In-Scope (MVP)

- User profile form (skills, education, experience)
- Target input (job title or job description)
- AI-powered gap analysis
- Generated roadmap displayed in the UI
- Export functionality (PDF or shareable link)
- Progress tracking over time

### Out-of-Scope (planned for v2)

- Native mobile app
- Mentor matching
- LinkedIn integration

### Risks & Mitigation

| Risk | Mitigation |
|------|-----------|
| AI response quality can vary | Careful prompt engineering + backend validation of output format and structure |
| Solo workload can lead to burnout or delays | Strict weekly sprints managed via GitHub Projects, with a tightly scoped MVP |
| Sensitive data handling (resumes/CVs) | No raw CV storage — data is processed and immediately discarded |

---

## 3. 📝 Summary

SkillMap started from a simple observation: during my training at Holberton, I realized that most people — myself included — struggle to identify what's actually standing between them and their career goals. There are tons of resources out there, but no tool that connects the dots between where you are now and where you want to be. That gap felt like a real problem worth solving.

The idea went through a proper evaluation alongside several other concepts. Some were too niche, some had too much competition, and some were just not realistic to build solo in a few weeks. SkillMap stood out because it tackles a genuine, widely-felt problem, and it's technically achievable with the tools I already know — React for the frontend, Node.js for the backend, and a local open-source AI model for the intelligence layer.

The MVP is intentionally focused: a user fills in their profile, sets a career target, and gets back a personalized roadmap with prioritized skills, learning resources, and progress tracking built in from day one. No mentor matching, no LinkedIn scraping, no mobile app — just the core loop that delivers value from the first interaction. Everything else is v2.

This project is also a chance to go through the full product cycle solo — from ideation to architecture to shipping something real. It's not just about writing code; it's about making decisions, managing scope, and delivering on time. That's what SkillMap is about, both as a product and as a learning experience.

---

## 🗓️ Stage 2 — Project Planning

### High-Level Plan

| Stage | Duration | Key Deliverable | Status |
|-------|----------|----------------|--------|
| Stage 1 — Idea Development | Week 1–2 | Stage 1 Report (team formation, brainstorming, MVP selection) | ✅ Completed |
| Stage 2 — Project Planning | Week 3 | Project Charter + Timeline | 🔄 In Progress |
| Stage 3 — Technical Documentation | Week 4–5 | Architecture, ERD, API design, wireframes | ⏳ Upcoming |
| Stage 4 — MVP Development | Week 6–10 | Functional SkillMap web app | ⏳ Upcoming |
| Stage 5 — Project Closure | Week 11–12 | Final presentation, demo, retrospective | ⏳ Upcoming |

### Milestones

**Stage 1** wrapped up with a clear direction: SkillMap was selected out of several ideas after scoring highest on feasibility, impact, and innovation. The team (me), the tools, and the scope are all locked in.

**Stage 2** is about turning that idea into a real plan. This means writing the project charter, breaking the work into concrete milestones, and setting up the sprint structure in GitHub Projects so that development can start without hesitation.

**Stage 3** will focus on the technical foundation — system architecture, database schema, API contract, and UI wireframes. The goal is to have every major design decision documented before writing the first line of product code.

**Stage 4** is where the actual building happens. Five weeks of focused development: backend API, AI integration, frontend UI, and the full user flow from profile input to roadmap output. Each week ships something testable.

**Stage 5** closes the loop — final polish, demo preparation, presentation to reviewers, and a retrospective on what worked and what didn't.

### Project Charter

SkillMap is a web application that analyzes the gap between a user's current skill set and their career target, then generates a personalized learning roadmap with prioritized skills and concrete resources. The MVP delivers the core loop: a profile form, a target input, AI-powered gap analysis, a generated roadmap displayed in the UI, export functionality, and progress tracking — nothing more. Native mobile, mentor matching, and LinkedIn integration are explicitly out of scope and planned for a future version. The project is built solo using React, Node.js, and a local open-source AI model, with sprints managed through GitHub Projects. Success means one thing: a user can enter their profile and career goal and receive a clear, actionable roadmap in under 30 seconds.

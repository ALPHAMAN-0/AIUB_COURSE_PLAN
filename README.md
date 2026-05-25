# AIUB CSE Course Planner

A web app that helps **AIUB BSc in Computer Science & Engineering** students plan their 148-credit degree based on their target career.

Live site (after first deploy): `https://<your-github-username>.github.io/AIUB_COURSE_PLAN/`

## Features

- **Career-path recommendations** — pick from 11 paths (Software Engineer, AI/ML Engineer, Data Scientist, Cybersecurity, Computer Engineer, Mobile Dev, Game Dev, Network Engineer, Researcher, IT Manager, Web Dev) and the app highlights the right major track + electives.
- **Completed-course tracker** — check off courses you've finished; credit and percentage progress update live and persist in your browser's localStorage.
- **Prerequisite locking** — courses with unmet prerequisites are visually locked with a tooltip listing what's missing. Credit-gated courses (Research Methodology at 100 credits, Internship at 139) unlock automatically when the bar is reached.
- **Semester planner** — drag and drop courses across 8 semester slots (Y1S1 → Y4S2) to build your graduation roadmap. Each column shows total credits.
- **Filter & search** — filter by Core / My Major / Electives / Recommended, or search by code or course title.

## Tech stack

- React 18 + Vite 5
- Pure CSS (custom dark theme using CSS variables — no framework)
- Browser localStorage for persistence
- GitHub Actions for CI/CD to GitHub Pages

## Local development

```bash
npm install
npm run dev
```

Open `http://localhost:5173/AIUB_COURSE_PLAN/`.

```bash
npm run build      # outputs dist/
npm run preview    # preview the production build locally
```

## Deploying to GitHub Pages

This repo includes `.github/workflows/deploy.yml` which builds and deploys on every push to `main`.

**One-time setup after the first push:**

1. Go to your repo on GitHub → **Settings** → **Pages**
2. Under **Source**, select **GitHub Actions**
3. Push to `main` (or re-run the workflow from the Actions tab) — the workflow will build, upload, and deploy
4. Visit `https://<your-username>.github.io/AIUB_COURSE_PLAN/`

> **Note:** the Vite `base` in `vite.config.js` is set to `/AIUB_COURSE_PLAN/`. If you fork or rename the repo, update that value to match the new repo name.

## Project structure

```
src/
├── data/          # course catalog + career path map
├── components/    # React components
├── context/       # global state (PlannerContext)
├── hooks/         # useLocalStorage
├── utils/         # prerequisite parsing, credit math
├── App.jsx
├── main.jsx
└── index.css      # dark-theme tokens + layout
```

## How career recommendations work

When you pick a career on the Career tab:

1. The app auto-selects the corresponding **major track** (Information Systems, Software Engineering, Computational Theory, or Computer Engineering).
2. ~3 specific **CSE Major** courses and ~2 **COS Electives** matching that career are flagged with a yellow "★ Recommended" badge on the Courses tab.
3. Switch the filter chip to **Recommended** to see only those courses.

You can change your career at any time and your completed-course progress is preserved.

## Resetting progress

Click **Reset** in the top-right header. This clears all completed courses, your selected career, major track, and semester plan from localStorage.

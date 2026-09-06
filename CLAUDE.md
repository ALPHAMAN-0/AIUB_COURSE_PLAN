## Commands
- Dev server: `npm run dev` (package.json scripts.dev = `vite`)
- Build: `npm run build` (package.json scripts.build = `vite build`)
- Preview build: `npm run preview` (package.json scripts.preview = `vite preview`)
- No test script and no lint script defined in package.json.

## Rules
- Vite `base` in vite.config.js must match the repo name (`/AIUB_COURSE_PLAN/`) for GitHub Pages to serve assets correctly (README).

## Read first
- src/App.jsx — root routing/gating logic
- src/context/PlannerContext.jsx — global state shape
- README.md — feature list and project structure

Architecture: see ARCHITECTURE.md — read before structural changes

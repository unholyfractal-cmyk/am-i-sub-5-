# Am I Sub 5?

A playful, purple-nebula themed web app that (for entertainment purposes only) "detects" whether an uploaded image is "sub 5". This project is intentionally mock-first with a clear disclaimer: do not use for real assessments, hiring, dating decisions, or shaming.

## What you'll find
- Frontend (React + Vite): friendly Gen Z-targeted UI with a purple nebula theme and semi-rigid card UI.
- Backend (Express): image upload endpoint and a deterministic mock detector (reproducible pseudo-random score per image).
- Instructions to plug in a real model (Replicate or OpenAI Vision) if desired.

## Quick start
1. Install deps: `npm install`
2. Start dev servers: `npm run dev`
3. Open `http://localhost:5173` for the frontend and `http://localhost:4000` for the API.

## Safety & ethics
This app is just for fun and should not be used to evaluate real people. If you integrate a real ML model, add audits, opt-in consent, and rate-limiting. Always show an explicit disclaimer and avoid use cases that could harm people.

---

See `frontend/` and `backend/` for details.

## Replacing the mock detector with a real model

If you want real ML inference, replace `backend/src/detector.js` with a wrapper that calls a hosted model (for example, Replicate or OpenAI Vision). Key safety steps:

- Require explicit consent from any person pictured.
- Log and audit model decisions; keep an appeals/feedback path.
- Use a human-in-the-loop and never use this for consequential decisions.

Example (pseudocode):
- Send image to model API (Replicate/OpenAI). Get back a score or embedding.
- Map score to `sub5` / `not_sub5` with calibrated thresholds.
- Return `label`, `confidence`, and a short `explanation`.

Be mindful: models can amplify biases and are not objective. Use the app only for entertainment unless you implement proper safeguards.

# Deploy to Render

Monorepo layout:

- backend/
- frontend/

Backend deployment (Node + Express):

1. Push to GitHub.
2. In Render, create a new Web Service.
3. Select your repo, set Root Directory to `backend`.
4. Environment: Node.
5. Build Command: (leave empty or `npm install` if needed)
6. Start Command: `npm start`
7. Set Environment Variables:
   - `MONGODB_URI=...`
   - `GEMINI_API_KEY=...`
   - `FRONTEND_URL=https://your-frontend-domain` (or http://localhost:5173 for local dev)
8. Save & Deploy.

Notes:

- Render provides `PORT`; the server reads `process.env.PORT`.
- Health check: GET `/health` should return `{ "status": "ok" }`.
- CORS is restricted via `FRONTEND_URL`.

Frontend (optional):

- Host separately (e.g., Render Static Site) with Root Directory `frontend`, Build Command `npm run build`, Publish Directory `frontend/dist`.
- Set your backend URL in the frontend if needed.

# Hosting Notes (Render + Vercel)

Backend (Render):

- Set Root Directory: backend
- Start Command: npm start
- Environment:
  - MONGODB_URI=...
  - GEMINI_API_KEY=...
  - FRONTEND_URLS=http://localhost:5173,https://your-vercel-domain (no trailing slash)

Frontend (Vercel):

- Root Directory: frontend
- Framework: Vite
- Build Command: npm run build
- Output Directory: dist
- Environment:
  - VITE_API_BASE=https://healthcare-symptom-checker-unthinkable.onrender.com

Why CORS failed:

- The Access-Control-Allow-Origin must exactly match the Origin. A trailing slash mismatch will be blocked.
- Fix: Use FRONTEND_URLS without trailing slashes and dynamic CORS to echo the request Origin.

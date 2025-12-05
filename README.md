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

# Healthcare Symptom Checker

Monorepo:

- backend/
- frontend/

## Clone the Repository

```bash
git clone https://github.com/MAHESH94944/Healthcare-Symptom-Checker-Unthinkable-solutions-.git
cd Healthcare-Symptom-Checker-Unthinkable-solutions-
```

## Run Locally

### Backend (Node + Express)

```bash
cd backend
npm install
```

Create backend .env:

```
PORT=5000
GEMINI_API_KEY=YOUR_GEMINI_API_KEY
FRONTEND_URL=http://localhost:5173
# Optional:
MONGODB_URI=your-mongodb-uri
```

Start backend:

```bash
npm start
# API: http://localhost:5000
```

### Frontend (React + Vite + Tailwind)

```bash
cd ../frontend
npm install
```

Create frontend .env:

```
VITE_API_BASE=http://localhost:5000
```

Start frontend:

```bash
npm run dev
# App: http://localhost:5173
```

## Hosted Frontend

- Production (Vercel): https://healthcare-symptom-checker-unthinka-gamma.vercel.app/

Notes:

- Frontend calls the backend via VITE_API_BASE. Configure it per environment.

# Upivot — Mini "Interview Drills" MERN App

This is a full-stack MERN application that simulates a small slice of Upivot’s product.  
The project demonstrates **authentication, drill practice, scoring, history tracking, security best practices, performance basics, and containerized development**.

---

## ✨ Features

1. **Authentication**
   - Google Sign-In (OAuth2)
   - Session stored in **httpOnly, secure cookies** issued by backend
   - Optional LinkedIn OAuth (bonus, not mandatory)

2. **Frontend (React + Vite)**
   - **Landing Page**: Call to action with “Sign in with Google”
   - **Dashboard**: Lists available drills with title, difficulty, and tags
   - **Drill Page**: Render 5 questions, accept free-text answers, submit, and show score
   - **History Page**: Shows last 5 attempts with score and timestamp
   - Responsive design with loading & error states

3. **Backend (Node.js + Express)**
   - API Routes:
     - `GET /api/health` → `{ ok: true }`
     - `GET /api/me` → return current user (auth required)
     - `GET /api/drills` → list drills (cached 60s, public)
     - `GET /api/drills/:id` → drill details (public)
     - `POST /api/attempts` → submit answers and compute score (auth required)
     - `GET /api/attempts?limit=5` → last 5 attempts for logged-in user
   - **Auth Flow**
     - `/auth/google` and `/auth/google/callback`
     - Finds/creates user in DB
     - Issues signed session cookie
   - **Scoring**
     - Simple keyword matching (case-insensitive)
     - Score = % of keywords matched across 5 questions
   - **Security**
     - `helmet` for secure headers
     - Strict CORS (allow web origin only)
     - Input validation with `zod`
     - Rate limiting (100 req / 5 min per IP)
     - Request logging with `morgan`

4. **Database (MongoDB)**
   - **Collections**
     - `users`: `{ _id, email, name, picture, providers:[{provider, providerId}], createdAt }`
     - `drills`: `{ _id, title, difficulty, tags:[string], questions:[{id, prompt, keywords:[string]}] }`
     - `attempts`: `{ _id, userId, drillId, answers:[{qid,text}], score, createdAt }`
   - **Indexes**
     - `users.email` unique
     - `attempts.userId + createdAt (desc)`
     - `drills.tags`, `drills.difficulty`

5. **Performance**
   - MongoDB connection pooling
   - In-memory caching of `GET /api/drills` for 60s
   - k6 script for load testing (300 rps for 60s, p95 < 150ms target)

6. **Containerized Local Development**
   - `docker-compose.yml` includes:
     - `api` (Node 20 + Express)
     - `web` (React dev server)
     - `mongo` (MongoDB)
     - `mongo-express` (DB admin UI)
   - Optional `Makefile` with `make up`, `make down`, `make logs`

7. **Testing & Tooling**
   - Postman/Insomnia collection (`postman_collection.json`)
   - k6 load test script (`k6/script.js`)
   - Lighthouse / Web Vitals report for `/dashboard`

8. **Docs**
   - `docs/ERD.png` — Entity Relationship Diagram
   - `docs/sequence-diagram.png` — Auth + Drill flow

---

## 🚀 Quick Start

### Prerequisites
- Docker & Docker Compose
- Google OAuth Client (instructions below)

### Steps
```bash
# Clone the repo
git clone https://github.com/<your-username>/upivot-minidrills.git
cd upivot-minidrills

# Copy environment variables
cp .env.example .env

# Start all services
docker compose up --build

# Seed sample drills into MongoDB
docker compose exec api node seed/seed.js

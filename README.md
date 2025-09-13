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

## 🚀 Local Development

- **API** available at: [http://localhost:4000](http://localhost:4000)  
- **Frontend** available at: [http://localhost:5173](http://localhost:5173)  
- **Mongo Express** available at: [http://localhost:8081](http://localhost:8081)  

---

## 🔑 Google OAuth Setup

1. Go to **Google Cloud Console** → *APIs & Services* → *Credentials*  
2. Create a new **OAuth 2.0 Client ID**  
   - **Application type:** Web application  
   - **Authorized redirect URI:**  
     ```
     http://localhost:4000/auth/google/callback
     ```
3. Copy the **Client ID** and **Client Secret** into your `.env` file  

**Example `.env`:**
```env
GOOGLE_CLIENT_ID=xxx.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=yyy
GOOGLE_CALLBACK_URL=http://localhost:4000/auth/google/callback
```
## How to run the project
README.md:

## ▶️ How to Run the Project

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/upivot-minidrills.git
cd upivot-minidrills

2. Set Up Environment Variables

Create a .env file in the api/ directory based on .env.example.
Add your MongoDB URL and Google OAuth credentials:

PORT=4000
MONGO_URI=mongodb://mongo:27017/upivot
SESSION_SECRET=supersecretkey

GOOGLE_CLIENT_ID=xxx.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=yyy
GOOGLE_CALLBACK_URL=http://localhost:4000/auth/google/callback

3. Start Services with Docker

Make sure you have Docker + Docker Compose installed.
Run:

docker compose up --build


This will start:

API at http://localhost:4000

Frontend at http://localhost:5173

Mongo Express at http://localhost:8081

4. Seed the Database

In another terminal, run the seed script to insert sample drills:

docker compose exec api node seed/seed.js

5. Test the Setup

Visit http://localhost:5173
 in your browser

Click Login with Google

Try a drill, submit answers, then check History

6. Run Tests

API health check:

curl http://localhost:4000/api/health


Load testing with k6:

k6 run k6/script.js


Postman:

Import postman_collection.json

Test the flow: Login → Drills → Attempt → History

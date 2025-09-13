API Quick Notes

- Start Mongo and API, then seed data: node seed/seed.js
- Endpoints:
  GET /api/health
  GET /api/drills
  GET /api/drills/:id
  POST /api/attempts  (requires cookie auth)
  GET /api/attempts?limit=5 (requires cookie auth)
- OAuth: /auth/google -> Google, callback sets httpOnly cookie

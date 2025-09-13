Auth + Drill flow (simplified)

1) User clicks Sign in with Google on web -> GET /auth/google (api)
2) Google OAuth popup/callback -> api creates/finds user, sets httpOnly cookie, redirects to web
3) Web fetches /api/me to confirm session
4) Web loads /api/drills (cached route)
5) User opens /api/drills/:id -> answers submitted to POST /api/attempts (auth required)
6) API scores attempt and stores attempt document
7) Web shows /history by calling GET /api/attempts?limit=5

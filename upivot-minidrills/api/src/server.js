require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const passport = require('passport');
const cookieParser = require('cookie-parser');

const connectDB = require('./config/db');

const healthRoutes = require('./routes/health');
const authRoutes = require('./routes/auth');
const drillsRoutes = require('./routes/drills');
const attemptsRoutes = require('./routes/attempts');

const app = express();

connectDB();

app.use(helmet());
app.use(express.json());
app.use(cookieParser());
app.use(morgan('dev'));

// CORS - allow frontend origin on dev
const WEB_ORIGIN = process.env.WEB_ORIGIN || 'http://localhost:5173';
app.use(cors({ origin: WEB_ORIGIN, credentials: true }));

// rate limiter
const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '300000'),
  max: parseInt(process.env.RATE_LIMIT_MAX || '100')
});
app.use(limiter);

// Passport (for Google OAuth)
app.use(passport.initialize());
require('./routes/auth').setupPassport(passport);

// routes
app.use('/api/health', healthRoutes);
app.use('/auth', authRoutes);
app.use('/api/drills', drillsRoutes);
app.use('/api/attempts', attemptsRoutes);

// simple /api/me
const jwt = require('jsonwebtoken');
app.get('/api/me', (req, res) => {
  const token = req.cookies?.[process.env.SESSION_COOKIE_NAME || 'upivot_sid'];
  if (!token) return res.status(401).json({ error: { code: 'unauth', message: 'Not authenticated' } });
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    res.json({ id: payload.id, email: payload.email });
  } catch (err) {
    res.status(401).json({ error: { code: 'unauth', message: 'Invalid session' } });
  }
});

// error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({ error: { code: err.code || 'server_error', message: err.message || 'Internal Error' } });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`API listening on ${PORT}`));

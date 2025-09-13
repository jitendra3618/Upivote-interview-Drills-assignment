const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  const token = req.cookies?.[process.env.SESSION_COOKIE_NAME || 'upivot_sid'];
  if (!token) return res.status(401).json({ error: { code: 'unauth', message: 'Not authenticated' } });
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: payload.id, email: payload.email };
    next();
  } catch (err) {
    return res.status(401).json({ error: { code: 'unauth', message: 'Invalid session' } });
  }
};

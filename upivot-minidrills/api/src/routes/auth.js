const express = require('express');
const router = express.Router();
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const jwt = require('jsonwebtoken');
const User = require('../models/User');

function setupPassport(passport) {
  passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL
  }, async (accessToken, refreshToken, profile, done) => {
    try {
      const providerId = profile.id;
      let user = await User.findOne({ 'providers.providerId': providerId });
      if (!user) {
        user = await User.create({ email: profile.emails?.[0]?.value, name: profile.displayName, picture: profile.photos?.[0]?.value, providers: [{ provider: 'google', providerId }] });
      }
      done(null, user);
    } catch (err) { done(err); }
  }));
}

module.exports.setupPassport = setupPassport;

// start google auth
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// callback
router.get('/google/callback', passport.authenticate('google', { session: false, failureRedirect: '/?error=auth' }), (req, res) => {
  const token = jwt.sign({ id: req.user._id, email: req.user.email }, process.env.JWT_SECRET, { expiresIn: '7d' });
  const cookieName = process.env.SESSION_COOKIE_NAME || 'upivot_sid';
  res.cookie(cookieName, token, { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'lax' });
  res.redirect(process.env.WEB_ORIGIN || 'http://localhost:5173');
});

router.post('/logout', (req, res) => {
  const cookieName = process.env.SESSION_COOKIE_NAME || 'upivot_sid';
  res.clearCookie(cookieName);
  res.json({ ok: true });
});

module.exports = router;

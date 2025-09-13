const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Drill = require('../models/Drill');
const Attempt = require('../models/Attempt');
const { scoreAttempt } = require('../utils/scoring');

// submit attempt
router.post('/', auth, async (req, res, next) => {
  try {
    const { drillId, answers } = req.body;
    if (!drillId || !Array.isArray(answers)) return res.status(400).json({ error: { code: 'bad_request', message: 'Missing fields' } });
    const drill = await Drill.findById(drillId);
    if (!drill) return res.status(404).json({ error: { code: 'not_found', message: 'Drill not found' } });
    const score = scoreAttempt(drill, answers);
    const att = await Attempt.create({ userId: req.user.id, drillId, answers, score });
    res.json({ ok: true, attempt: att });
  } catch (err) { next(err); }
});

// last attempts
router.get('/', auth, async (req, res, next) => {
  try {
    const limit = Math.min(50, parseInt(req.query.limit || '5'));
    const attempts = await Attempt.find({ userId: req.user.id }).sort({ createdAt: -1 }).limit(limit).lean();
    res.json(attempts);
  } catch (err) { next(err); }
});

module.exports = router;

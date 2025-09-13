const express = require('express');
const router = express.Router();
const Drill = require('../models/Drill');
const cache = require('../middleware/cache');

// list drills (cached 60s)
router.get('/', async (req, res, next) => {
  try {
    const cached = cache.getCached('drills_list');
    if (cached) return res.json(cached);
    const docs = await Drill.find({}, { title: 1, difficulty: 1, tags: 1 }).lean();
    cache.setCached('drills_list', docs, 60);
    res.json(docs);
  } catch (err) { next(err); }
});

// drill detail (public)
router.get('/:id', async (req, res, next) => {
  try {
    const d = await Drill.findById(req.params.id).lean();
    if (!d) return res.status(404).json({ error: { code: 'not_found', message: 'Drill not found' } });
    res.json(d);
  } catch (err) { next(err); }
});

module.exports = router;

const mongoose = require('mongoose');

const answerSchema = new mongoose.Schema({ qid: String, text: String }, { _id: false });

const attemptSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', index: true },
  drillId: { type: mongoose.Schema.Types.ObjectId, ref: 'Drill' },
  answers: [answerSchema],
  score: Number,
  createdAt: { type: Date, default: Date.now }
});

attemptSchema.index({ userId: 1, createdAt: -1 });

module.exports = mongoose.model('Attempt', attemptSchema);

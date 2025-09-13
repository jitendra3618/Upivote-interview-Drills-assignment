const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({ id: String, prompt: String, keywords: [String] }, { _id: false });

const drillSchema = new mongoose.Schema({
  title: String,
  difficulty: String,
  tags: [String],
  questions: [questionSchema]
});

drillSchema.index({ tags: 1 });
drillSchema.index({ difficulty: 1 });

module.exports = mongoose.model('Drill', drillSchema);

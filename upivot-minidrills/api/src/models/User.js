const mongoose = require('mongoose');

const providerSchema = new mongoose.Schema({ provider: String, providerId: String }, { _id: false });

const userSchema = new mongoose.Schema({
  email: { type: String, unique: true, sparse: true },
  name: String,
  picture: String,
  providers: [providerSchema],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);

const mongoose = require('mongoose');

module.exports = function connectDB() {
  const uri = process.env.MONGO_URI || 'mongodb://localhost:27017/upivot';
  mongoose.connect(uri, {
    maxPoolSize: 20,
    minPoolSize: 2
  }).then(() => console.log('Mongo connected')).catch(err => console.error('Mongo connect error', err));
};

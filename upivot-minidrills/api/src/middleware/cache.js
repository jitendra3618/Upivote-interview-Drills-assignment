const cache = new Map();

module.exports = {
  getCached(key) { return cache.get(key); },
  setCached(key, value, ttl = 60) {
    cache.set(key, value);
    setTimeout(() => cache.delete(key), ttl * 1000);
  }
};

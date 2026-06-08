const { redisClient } = require("../config/redis");

const setCache = async (key, value, expiry = 3600) => {
  try {
    await redisClient.set(key, JSON.stringify(value), { EX: expiry });
    return true;
  } catch (err) {
    console.error("Error setting cache:", err);
    return false;
  }
};

const getCache = async (key) => {
  try {
    const data = await redisClient.get(key);
    return data ? JSON.parse(data) : null;
  } catch (err) {
    console.error("Error getting cache:", err);
    return null;
  }
};

const deleteCache = async (key) => {
  try {
    await redisClient.del(key);
    return true;
  } catch (err) {
    console.error("Error deleting cache:", err);
    return false;
  }
};

module.exports = {
  setCache,
  getCache,
  deleteCache,
};

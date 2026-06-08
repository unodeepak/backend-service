const { createClient } = require("redis");
const ENV = require("./env");

const redisClient = createClient({
  url: ENV.REDIS_URL,
});

redisClient.on("connect", () => {
  console.log("✅✅✅ Connected to Redis successfully! ✅✅✅");
});

redisClient.on("ready", () => {
  console.log("✅ Redis Client is ready to use! ✅");
});

redisClient.on("error", (err) => {
  console.error("❌❌❌ Redis Client Error ❌❌❌", err);
});

redisClient.on("end", () => {
  console.error("⚠️⚠️⚠️ Redis Client Error ⚠️⚠️⚠️");
});

const connectRedis = async () => {
  try {
    if (!redisClient.isOpen) {
      await redisClient.connect();
    }
  } catch (err) {
    console.error("❌❌❌ Failed to connect to Redis ❌❌❌", err);
    process.exit(1);
  }
};

module.exports = {
  connectRedis,
  redisClient,
};

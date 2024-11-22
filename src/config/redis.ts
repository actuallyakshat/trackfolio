import { createClient, RedisClientType } from "redis";

let redisClient: RedisClientType | null = null;

const redis = createClient({
  socket: {
    host: process.env.REDIS_HOST || "localhost",
    port: Number(process.env.REDIS_PORT) || 6379,
  },
});

redis.on("error", (err) => {
  console.error("Redis Client Error:", err);
});

// Connect immediately
redis.connect();

export default redis;

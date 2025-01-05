// import { createClient, RedisClientType } from "redis";

// let redisClient: RedisClientType | null = null;

// const redis = createClient();

// redis.on("error", (err) => {
//   console.error("Redis Client Error:", err);
// });

// redis.on("connect", () => {
//   console.log("Redis Client Connected");
// });

// // Connect immediately
// redis.connect();

// export default redis;

import { Redis } from "@upstash/redis";

if (!process.env.UPSTASH_REDIS_URL || !process.env.UPSTASH_REDIS_TOKEN) {
  throw new Error("Redis credentials not found in environment variables");
}

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_URL as string,
  token: process.env.UPSTASH_REDIS_TOKEN as string,
});

export default redis;

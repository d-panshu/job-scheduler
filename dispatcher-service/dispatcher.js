const mongoose = require("mongoose");
const Redis = require("ioredis");

mongoose.connect("mongodb://mongo:27017/scheduler");

const Job = mongoose.model(
  "Job",
  new mongoose.Schema({
    jobId: String,
    payload: Object,
    executeAt: Number,
    status: String
  })
);

const redis = new Redis({
  host: "redis",
  port: 6379
});

async function poll() {
  const now = Date.now();

  const jobs = await redis.zrangebyscore(
    "job_queue",
    0,
    now
  );

  for (const jobId of jobs) {
    console.log("Executing job:", jobId);

    await Job.updateOne(
      { jobId },
      { status: "completed" }
    );

    await redis.zrem("job_queue", jobId);
  }
}

setInterval(poll, 1000);

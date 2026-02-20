const express = require("express");
const mongoose = require("mongoose");
const jobRoutes = require("./routes/jobRoutes");

const app = express();
app.use(express.json());

mongoose.connect("mongodb://mongo:27017/scheduler");

app.use("/jobs", jobRoutes);

app.listen(3000, () => {
  console.log("API Gateway running on port 3000");
});

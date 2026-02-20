const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
    jobId: String,
    payload: Object,
    executeAt: Number,
    status: {
        type: String,
        default: "scheduled"
    }
});

module.exports = mongoose.model("Job", jobSchema);
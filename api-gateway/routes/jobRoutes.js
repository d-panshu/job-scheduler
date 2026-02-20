const express = require("express");
const router = express.Router();
const Job = require("../models/Job");
const { v4: uuidv4 } = require("uuid");


router.post("/create", async (req, res) => {
    const {payload, delayInSeconds} = req.body;

    const jobId = uuidv4();
    const executeAt= Date.now()+delayInSeconds*1000;

    await Job.create({
        jobId,
        payload,
        executeAt,
        status:"pending"
    });
    

    res.json({message:"hob has store in wharehouse", jobId});

});

module.exports = router;

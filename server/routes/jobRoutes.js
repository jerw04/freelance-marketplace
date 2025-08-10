const express = require("express");
const router = express.Router();
const Job = require("../models/Job");
const authMiddleware = require("../middleware/authMiddleware");
const User = require("../models/User");
require("../models/Application"); // ensure Application model is registered

// POST /api/jobs - Only clients can post
router.post("/", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user || user.role !== "client") {
      return res.status(403).json({ message: "Only clients can post jobs" });
    }

    const { title, description, budget, category } = req.body;

    if (!title || !description || !budget || !category) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const job = new Job({
      title,
      description,
      budget,
      category,
      clientId: req.user.id,
    });

    await job.save();
    res.status(201).json({ message: "Job posted successfully", job });
  } catch (err) {
    console.error("Error posting job:", err);
    res.status(500).json({ message: "Failed to post job", error: err.message });
  }
});

// GET /api/jobs/client/:clientId - Get all jobs posted by a client
router.get("/client/:clientId", authMiddleware, async (req, res) => {
  try {
    if (req.user.id !== req.params.clientId) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    const jobs = await Job.find({ clientId: req.params.clientId })
      .populate({
        path: "applicants",
        model: "Application", // ensure Application model exists
        populate: {
          path: "freelancer",
          model: "User",
          select: "username resumeUrl",
        },
      })
      .sort({ createdAt: -1 });

    res.json(jobs);
  } catch (err) {
    console.error("Error fetching client jobs:", err);
    res.status(500).json({
      message: "Failed to fetch jobs",
      error: err.message,
    });
  }
});

module.exports = router;

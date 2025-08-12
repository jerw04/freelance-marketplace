// server/routes/applicationRoutes.js
const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const Application = require("../models/Application");
const Job = require("../models/Job");
const User = require("../models/User");

// POST /api/applications/:jobId - Apply for a job
router.post("/:jobId", authMiddleware, async (req, res) => {
  try {
    const { jobId } = req.params;
    const { coverLetter, resumeUrl } = req.body;

    // Ensure user is freelancer
    const user = await User.findById(req.user.id);
    if (!user || user.role !== "freelancer") {
      return res.status(403).json({ message: "Only freelancers can apply" });
    }

    // Ensure job exists
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    // Check if already applied
    const alreadyApplied = await Application.findOne({
      job: jobId,
      freelancer: req.user.id,
    });
    if (alreadyApplied) {
      return res.status(400).json({ message: "Already applied to this job" });
    }

    // Create application
    const application = new Application({
      job: jobId,
      freelancer: req.user.id,
      coverLetter,
      resumeUrl,
    });
    await application.save();

    // Push to job.applicants
    job.applicants.push(application._id);
    await job.save();

    res.status(201).json({ message: "Application submitted", application });
  } catch (err) {
    console.error("Error applying for job:", err);
    res.status(500).json({ message: "Failed to apply", error: err.message });
  }
});

module.exports = router;

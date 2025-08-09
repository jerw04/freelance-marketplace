const express = require("express");
const router = express.Router();
const Job = require("../models/Job");
const Application = require("../models/Application"); // new model we'll make
const User = require("../models/User");

// POST /api/jobs - Only for clients
router.post("/", async (req, res) => {
  const { title, description, budget, category, clientId } = req.body;

  if (!title || !description || !budget || !category || !clientId) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    const job = new Job({ title, description, budget, category, clientId });
    await job.save();
    res.status(201).json({ message: "Job posted successfully!", job });
  } catch (error) {
    res.status(500).json({ message: "Failed to post job", error });
  }
});

// POST /api/jobs/:jobId/apply - Freelancer applies to a job
router.post("/:jobId/apply", async (req, res) => {
  const { freelancerId, coverLetter, resumeUrl } = req.body;

  if (!freelancerId || !coverLetter) {
    return res.status(400).json({ message: "Freelancer ID and cover letter are required." });
  }

  try {
    const application = new Application({
      jobId: req.params.jobId,
      freelancerId,
      coverLetter,
      resumeUrl
    });
    await application.save();

    // Add this application to job's applicants array
    await Job.findByIdAndUpdate(req.params.jobId, {
      $push: { applicants: application._id }
    });

    res.status(201).json({ message: "Applied successfully!", application });
  } catch (error) {
    res.status(500).json({ message: "Failed to apply for job", error });
  }
});

// GET /api/jobs/client/:clientId - View all jobs posted by a client with applicants info
router.get("/client/:clientId", async (req, res) => {
  try {
    const jobs = await Job.find({ clientId: req.params.clientId })
      .populate({
        path: "applicants",
        populate: {
          path: "freelancerId",
          model: "User",
          select: "username email role resumeUrl"
        }
      });

    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch jobs", error });
  }
});

module.exports = router;

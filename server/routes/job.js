// server/routes/jobs.js
const express = require("express");
const router = express.Router();
const Job = require("../models/Job");
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET;

// Middleware to verify token
const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.status(401).json({ message: "No token provided" });

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: "Invalid token" });
    req.user = user;
    next();
  });
};

// POST /api/jobs
router.post("/", verifyToken, async (req, res) => {
  const { title, description, budget, category, clientId } = req.body;

  if (!title || !description || !budget || !category || !clientId) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    const job = new Job({
      title,
      description,
      budget,
      category,
      clientId,
    });

    await job.save();
    res.status(201).json({ message: "Job posted successfully!", job });
  } catch (err) {
    res.status(500).json({ message: "Failed to post job", error: err });
  }
});

module.exports = router;
// server/models/Job.js
const mongoose = require("mongoose");

const JobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    budget: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    clientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    // Applications will be stored in a separate "Application" collection
    applicants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Application",
      }
    ]
  },
  { timestamps: true }
);

module.exports = mongoose.model("Job", JobSchema);

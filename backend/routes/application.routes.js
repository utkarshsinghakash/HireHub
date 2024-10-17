import express from "express";
const router = express.Router();
import Application from "../models/application.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import Job from "../models/job.js";

router.get("/applyjob/:id", isAuthenticated, async (req, res) => {
  try {
    let userId = req.id;
    let jobId = req.params.id;
    let existingapplicant = await Application.findOne({
      job: jobId,
      applicant: userId,
    });

    //cannot apply again if already applied
    if (existingapplicant) {
      return res.status(400).json({
        message: "You have already applied for this job",
        success: false,
      });
    }

    //check if job exist
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(400).json({
        message: "Job not found",
        success: false,
      });
    }
    const newApplication = await Application.create({
      job: jobId,
      applicant: userId,
    });
    job.applications.push(newApplication._id);
    await job.save();
    return res.status(201).json({
      message: "Job applied successfully",
      success: true,
    });
  } catch (err) {
    console.log(err);
  }
});

//get person applied all jobs
router.get("/getappliedjobs", isAuthenticated, async (req, res) => {
  try {
    const userId = req.id;

    const application = await Application.find({ applicant: userId })
      .sort({ createdAt: -1 })
      .populate({
        path: "job",
        options: { sort: { createdAt: -1 } },
        populate: {
          path: "company",
          options: { sort: { createdAt: -1 } },
        },
      });
    if (!application) {
      return res.status(404).json({
        message: "No Applications found",
        success: false,
      });
    }
    return res.status(200).json({
      application,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
});

//admin wants to see all applicants of particular job
router.get("/getApplicants/:id/applicants", isAuthenticated, async (req, res) => {
  try {
    let jobId = req.params.id;
    let job = await Job.findById(jobId).populate({
      path: "applications",
      options: { sort: { createdAt: -1 } },
      populate: {
        path: "applicant",
        options: { sort: { createdAt: -1 } },
      },
    });

    if (!job) {
      return res.status(400).json({
        message: "Job not found",
        success: false,
      });
    }
    return res.status(200).json({
      job,
      success: true,
    });
  } catch (err) {
    console.log(err);
  }
});

router.post("/updatestatus/:id", isAuthenticated, async (req, res) => {
  try {
    let { status } = req.body;
    let applicationId = req.params.id;
    if (!status) {
      return res.status(400).json({
        message: "status is required",
        success: false,
      });
    }
    let application = await Application.findOne({ _id: applicationId });
    if (!application) {
      return res.status(404).json({
        message: "Application not found",
        success: false,
      });
    }

    application.status = status.toLowerCase();
    await application.save();
    return res.status(200).json({
      message: "Status Saved successfully",
      success: true,
    });
  } catch (err) {
    console.log(err);
  }
});

export default router; // Change module.exports to export default

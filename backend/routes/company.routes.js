import express from "express";
const router = express.Router();
import Company from "../models/company.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import getDataUri from "../utils/dataUri.js";
import cloudinary from "../utils/cloudinary.js";
import singleupload from "../middlewares/multer.js";

router.post("/register", isAuthenticated, async (req, res) => {
  try {
    const { companyName } = req.body;
    if (!companyName) {
      return res.status(400).json({
        message: "Company name is required",
        success: false,
      });
    }
    let company = await Company.findOne({ name: companyName });
    if (company) {
      return res.status(400).json({
        message: "this company name is already registered",
        success: false,
      });
    }
    company = await Company.create({
      name: companyName,
      userId: req.id,
    });

    return res.status(201).json({
      message: "Company registered successfully.",
      company,
      success: true,
    });
  } catch (err) {
    console.log(err);
  }
});

router.get("/getAll", isAuthenticated, async (req, res) => {
  try {
    const userId = req.id; //logged in as user
    const companies = await Company.find({ userId });
    if (!companies) {
      return res.status(404).json({
        message: "Companies not found",
        success: false,
      });
    }

    return res.status(200).json({
      companies,
      success: true,
    });
  } catch (err) {
    console.log(err);
  }
});

router.get("/get/:id", isAuthenticated, async (req, res) => {
  try {
    let companyId = req.params.id;
    let company = await Company.findById(companyId);
    if (!company) {
      return res.status(404).json({
        message: "Company not found",
        success: false,
      });
    }
    console.log(res);
    return res.status(200).json({
      company,
      success: true,
    });
  } catch (err) {
    console.log(err);
  }
});

router.put("/update/:id", singleupload, isAuthenticated, async (req, res) => {
  try {
    const { name, description, website, location } = req.body;
    const file = req.file;

    const fileDataUri = getDataUri(file);
    let cloudResponse = await cloudinary.uploader.upload(fileDataUri.content, {
      timeout: 120000,
    });
    const logo = cloudResponse.secure_url;

    const updateData = { name, description, website, location, logo };
    const company = await Company.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    });

    if (!company) {
      return res.status(404).json({
        message: "Company not found",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Company information updated",
      success: true,
    });
  } catch (err) {
    console.log(err);
  }
});

// Export the router
export default router;

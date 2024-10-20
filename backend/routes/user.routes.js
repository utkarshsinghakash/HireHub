import express from "express";
import User from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"; // to generate user token
import isAuthenticated from "../middlewares/isAuthenticated.js";
import singleupload from "../middlewares/multer.js";
import getDataUri from "../utils/dataUri.js";
import cloudinary from "../utils/cloudinary.js";

// const passport = require("passport");
// const passportconfig = require("../config/passport");

// const router = express.Router();
// Google OAuth login route
// router.get("/auth/google", (req, res) => {
//   console.log("Google login route hit"); // Debugging log
//   // Initiates the Google authentication process
//   passport.authenticate("google", { scope: ["profile", "email"] })(req, res);
// });

// Google OAuth callback route
// router.get(
//   "/auth/google/callback",
//   passport.authenticate("google", { failureRedirect: "/login" }),
//   (req, res) => {
//     // Send the JWT token to the client
//     console.log("1");
//     return res.cookie("token", req.user.token, {
//       maxAge: 1 * 24 * 60 * 60 * 1000,
//       httpOnly: true,
//       sameSite: "strict",
//       message: "Welcome back",
//       success: true,
//     });
//   }
// );

const router = express.Router();

router.post("/register", singleupload, async (req, res) => {
  try {
    const { fullname, email, phone, password, role } = req.body;

    if (!fullname || !email || !phone || !password || !role) {
      return res.status(400).json({
        message: "Something is missing",
        success: false,
      });
    }
    let file = req.file;
    let DataUri = getDataUri(file);
    let cloudResponse = await cloudinary.uploader.upload(DataUri.content);

    let profilelink;
    if (cloudResponse) {
      profilelink = cloudResponse.secure_url;
    }
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        message: "User already exists with this email",
        success: false,
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    user = await User.create({
      fullname,
      email,
      phone,
      password: hashedPassword,
      role,
      profile: {
        profilePhoto: profilelink,
      },
    });

    return res.status(200).json({
      message: "Account created successfully",
      user,
      success: true,
    });
  } catch (err) {
    console.log(err);
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password, role } = req.body;
    if (!email || !password || !role) {
      return res.status(400).json({
        message: "Something is missing",
        success: false,
      });
    }
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "Incorrect email or password",
        success: false,
      });
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({
        message: "Incorrect email or password",
        success: false,
      });
    }
    if (role !== user.role) {
      return res.status(400).json({
        message: "Account doesn't exist with this role",
        success: false,
      });
    }

    const tokenData = {
      userId: user._id,
    };
    const token = await jwt.sign(tokenData, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });

    user = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      phone: user.phone,
      password: user.password,
      role: user.role,
      profile: user.profile,
    };

    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 1 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "strict",
      })
      .json({
        message: `Welcome back ${user.fullname}`,
        user,
        success: true,
      }); // protect from hacker or unauthorized access
  } catch (err) {
    console.log(err);
  }
});

router.get("/logout", async (req, res) => {
  try {
    return res.status(200).cookie("token", "", { maxAge: 0 }).json({
      message: "Logged out successfully",
      success: true,
    });
  } catch (err) {
    console.log(err);
  }
});

router.post(
  "/profile/update",
  isAuthenticated,
  singleupload,
  async (req, res) => {
    try {
      const { fullname, email, phone, bio, skills } = req.body;

      const file = req.file;
      const fileUri = getDataUri(file);

      let cloudResponse = await cloudinary.uploader.upload(fileUri.content, {
        timeout: 120000,
      });

      let skillsArray;
      if (skills) {
        skillsArray = skills.split(",");
      }
      const userId = req.id;
      let user = await User.findById(userId);
      if (!user) {
        return res.status(400).json({
          message: "User not found",
          success: false,
        });
      }

      // Updating the value
      if (fullname) {
        user.fullname = fullname;
      }
      if (email) {
        user.email = email;
      }
      if (phone) {
        user.phone = phone;
      }
      if (bio) {
        user.profile.bio = bio;
      }
      if (skills) {
        user.profile.skills = skillsArray;
      }
      if (cloudResponse) {
        user.profile.resume = cloudResponse.secure_url;
        user.profile.resumeOriginalName = file.originalname;
      }

      await user.save();
      console.log(user);
      // Collecting the value of user in user
      user = {
        _id: user._id,
        fullname: user.fullname,
        email: user.email,
        phone: user.phone,
        password: user.password,
        role: user.role,
        profile: user.profile,
      };

      return res.status(200).json({
        message: "Profile updated successfully",
        user,
        success: true,
      });
    } catch (err) {
      console.log(err);
    }
  }
);

export default router;

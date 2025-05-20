const Admin = require("../models/Admin");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const ms = require("ms"); // to convert 1d into seconds used to expire cookies

// Admin Registration Controller
exports.registerAdmin = async (req, res) => {
  const { fullName, email, password, phone } = req.body;

  try {
    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email });

    if (existingAdmin) {
      return res
        .status(400)
        .json({ message: "Admin with this email already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create admin
    const newAdmin = new Admin({
      fullName,
      email,
      password: hashedPassword,
      phone,
    });

    await newAdmin.save();

    res.status(201).json({
      message: "Admin registered successfully",
      newAdmin,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" + error.message });
  }
};

// Admin Login Controller
exports.loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find admin
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Compare password
    const isPasswordCorrect = await admin.verifyPassword(password); //defined this in model

    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Generate JWT
    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN || "1d",
    });

    // storing token in cookies
    const expiresIn = process.env.JWT_EXPIRES_IN || "1d";
    res.cookie("token", token, {
      maxAge: ms(expiresIn),
    });

    res.status(200).json({
      message: "Login successful",
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" + error.message });
  }
};

//Admin Logout Controller
exports.logoutAdmin = async (req, res) => {
  try {
    res.clearCookie("token");

    res.status(200).json({
      message: "Logout successful",
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" + error.message });
  }
};

const Admin = require("../models/Admin");
const bcrypt = require("bcryptjs");
const {
  validateAdminRegistration,
} = require("../validators/adminDataValidations");

exports.registerAdmin = async (req, res) => {
  const { fullName, email, password, phone } = req.body;

  try {
    validateAdminRegistration(req);
    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email });

    if (existingAdmin) {
      return res
        .status(400)
        .json({ message: "Admin with this email already exists" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

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

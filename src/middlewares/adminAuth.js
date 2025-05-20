const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");

exports.adminAuth = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: "Not authorized" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const admin = await Admin.findById(decoded.id).select("-password");

    if (!admin) {
      res.status(401).json({ message: "Admin is not found" });
    }

    req.admin = admin;

    next();
  } catch (error) {
    res.status(401).json({ message: "Not authorized, token failed" });
  }
};

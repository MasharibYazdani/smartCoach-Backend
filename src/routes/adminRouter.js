const express = require("express");
const {
  registerAdmin,
  loginAdmin,
  logoutAdmin,
} = require("../controllers/adminController");
const {
  validateAdminRegistration,
  validateAdminLogin,
} = require("../validators/adminDataValidations");

const adminRouter = express.Router();

adminRouter.post("/admin/register", validateAdminRegistration, registerAdmin);
adminRouter.post("/admin/login", validateAdminLogin, loginAdmin);
adminRouter.post("/admin/logout", logoutAdmin);

module.exports = { adminRouter };

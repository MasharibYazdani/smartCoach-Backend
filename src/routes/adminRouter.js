const express = require("express");
const { registerAdmin } = require("../controllers/adminController");

const adminRouter = express.Router();

adminRouter.post("/admin/register", registerAdmin);

module.exports = { adminRouter };

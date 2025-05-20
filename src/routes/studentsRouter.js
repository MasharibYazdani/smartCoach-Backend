const express = require("express");
const { adminAuth } = require("../middlewares/adminAuth");
const { validateAddStudent } = require("../validators/studentDataValidations");
const { addStudent } = require("../controllers/studentController");

const studentRouter = express.Router();

studentRouter.post("/student/new", adminAuth, validateAddStudent, addStudent);

module.exports = { studentRouter };

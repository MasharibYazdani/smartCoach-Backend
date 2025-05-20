const express = require("express");
const { adminAuth } = require("../middlewares/adminAuth");
const {
  validateAddStudent,
  validateUpdateStudent,
} = require("../validators/studentDataValidations");
const {
  addStudent,
  getAllStudents,
  getOneStudent,
  updateStudentInfo,
  deleteStudent,
} = require("../controllers/studentController");

const studentRouter = express.Router();

studentRouter.post("/student/new", adminAuth, validateAddStudent, addStudent);
studentRouter.get("/student/getAllStudents", adminAuth, getAllStudents);
studentRouter.get("/student/getOneStudent/:id", adminAuth, getOneStudent);
studentRouter.patch(
  "/student/update/:id",
  adminAuth,
  validateUpdateStudent,
  updateStudentInfo
);
studentRouter.delete("/student/delete/:id", adminAuth, deleteStudent);

module.exports = { studentRouter };

const express = require("express");
const { adminAuth } = require("../middlewares/adminAuth");
const {
  createEnrollment,
  getStudentEnrollments,
  getCourseEnrollments,
} = require("../controllers/enrollmentController");

const enrollmentRouter = express.Router();

enrollmentRouter.post("/enrollment/new", adminAuth, createEnrollment);
enrollmentRouter.get(
  "/enrollment/student/:studentId",
  adminAuth,
  getStudentEnrollments
);

enrollmentRouter.get(
  "/enrollment/course/:courseId",
  adminAuth,
  getCourseEnrollments
);

module.exports = { enrollmentRouter };

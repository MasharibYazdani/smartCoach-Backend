const express = require("express");
const { adminAuth } = require("../middlewares/adminAuth");
const {
  addCourse,
  getAllCourses,
  updateCourseInfo,
  deleteCourse,
  getOneCourse,
} = require("../controllers/courseController");
const {
  validateAddCourse,
  validateUpdateCourse,
} = require("../validators/courseDataValidations");

const courseRouter = express.Router();

courseRouter.post("/course/new", adminAuth, validateAddCourse, addCourse);
courseRouter.get("/course/getAllCourse", adminAuth, getAllCourses);
courseRouter.get("/course/getOneCourse/:id", adminAuth, getOneCourse);
courseRouter.patch(
  "/course/update/:id",
  adminAuth,
  validateUpdateCourse,
  updateCourseInfo
);
courseRouter.delete("/course/delete/:id", adminAuth, deleteCourse);

module.exports = { courseRouter };

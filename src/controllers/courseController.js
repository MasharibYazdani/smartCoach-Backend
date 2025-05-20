const Course = require("../models/Course");

exports.addCourse = async (req, res) => {
  const { name, description, duration, fees } = req.body;
  try {
    const existingCourse = await Course.findOne({
      name: name,
      admin: req.admin._id,
    });

    if (existingCourse) {
      return res
        .status(409)
        .json({ message: "Course with this name already exists." });
    }

    const course = new Course({
      name,
      description,
      duration,
      fees,
      admin: req.admin._id,
    });
    await course.save();
    res.status(201).json({ message: "Course Added Successfully.", course });
  } catch (error) {
    res.status(500).json({ message: "Error creating course" + error.message });
  }
};

exports.getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find({ admin: req.admin._id }).sort({
      createdAt: -1,
    });

    res.status(200).json({ total: courses.length, courses });
  } catch (error) {
    res.status(500).json({ message: "Error fetching courses", error });
  }
};

exports.getOneCourse = async (req, res) => {
  try {
    const course = await Course.findOne({
      _id: req.params.id,
      admin: req.admin._id,
    });

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    res.status(200).json(course);
  } catch (error) {
    res.status(500).json({ message: "Error fetching course", error });
  }
};

exports.updateCourseInfo = async (req, res) => {
  try {
    const course = await Course.findOneAndUpdate(
      { _id: req.params.id, admin: req.admin._id },
      req.body,
      { new: true, runValidators: true }
    );

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    res.status(200).json(course);
  } catch (error) {
    res.status(500).json({ message: "Error updating course" + error.message });
  }
};

exports.deleteCourse = async (req, res) => {
  try {
    const course = await Course.findOneAndDelete({
      _id: req.params.id,
      admin: req.admin._id,
    });

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    res.status(200).json({ message: "Course deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting course" + error.message });
  }
};

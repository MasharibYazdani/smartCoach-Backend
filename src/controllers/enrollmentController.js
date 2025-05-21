const Enrollment = require("../models/Enrollment");
const Student = require("../models/Student");
const Course = require("../models/Course");

exports.createEnrollment = async (req, res) => {
  try {
    const { student, course } = req.body;
    const adminId = req.admin._id;

    // Check if student belongs to logged-in admin
    const foundStudent = await Student.findOne({
      _id: student,
      admin: adminId,
    });

    if (!foundStudent) {
      return res.status(403).json({
        message: "You haven't added this student",
      });
    }

    // Check if course belongs to logged-in admin
    const foundCourse = await Course.findOne({ _id: course, admin: adminId });
    if (!foundCourse) {
      return res.status(403).json({
        message: "You haven't added this course",
      });
    }

    // Check whether the enrollment already exists
    const existingEnrollment = await Enrollment.findOne({
      student: student,
      course: course,
    });

    if (existingEnrollment) {
      return res.status(403).json({
        message: "Enrollment already exists ",
      });
    }

    const newEnrollment = await Enrollment.create({
      student,
      course,
      admin: adminId,
    });

    res.status(201).json({
      newEnrollment,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error" + error.message,
    });
  }
};

exports.getStudentEnrollments = async (req, res) => {
  try {
    const { studentId } = req.params;
    const adminId = req.admin._id;

    const enrollments = await Enrollment.find({
      student: studentId,
      admin: adminId,
    })
      .populate("course", "name description duration fees") // return course info
      .populate("student", "fullName email") // optional
      .sort({ createdAt: -1 });

    if (enrollments.length === 0) {
      return res
        .status(500)
        .json({ message: "No enrollment for this student" });
    }

    res.status(200).json({
      enrollments,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error " + error.message });
  }
};

exports.getCourseEnrollments = async (req, res) => {
  try {
    const { courseId } = req.params;
    const adminId = req.admin._id;

    const enrollments = await Enrollment.find({
      course: courseId,
      admin: adminId,
    })
      .populate("student", "fullName email phone address dob gender")
      .populate("course", "name description")
      .sort({ createdAt: -1 });

    if (enrollments.length === 0) {
      return res.status(500).json({ message: "No enrollment for this course" });
    }

    res.status(200).json({
      enrollments,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error " + error.message });
  }
};

exports.updateEnrollmentStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const adminId = req.admin._id;

    const validStatuses = ["pending", "active", "completed", "cancelled"];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        message:
          "Invalid status. Must be one of: pending, active, completed, cancelled",
      });
    }

    const enrollment = await Enrollment.findOne({ _id: id, admin: adminId });

    if (!enrollment) {
      return res.status(404).json({
        success: false,
        message: "Enrollment not found",
      });
    }

    enrollment.status = status;

    // Optionally set enrollmentDate if activating
    if (status === "active") {
      enrollment.enrollmentDate = new Date();
    }

    await enrollment.save();

    res.status(200).json({
      message: `Enrollment status updated to '${status}'`,
      enrollment,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error " + error.message });
  }
};

exports.deleteEnrollment = async (req, res) => {
  try {
    const adminId = req.admin._id;
    const enrollmentId = req.params.id;

    const deletedEnrollment = await Enrollment.findOneAndDelete({
      _id: enrollmentId,
      admin: adminId,
    });

    if (!deletedEnrollment) {
      return res.status(404).json({ message: "Enrollment not found" });
    }

    res.status(200).json({ message: "Enrollment deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" + error.message });
  }
};

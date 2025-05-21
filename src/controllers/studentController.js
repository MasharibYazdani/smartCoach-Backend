const Student = require("../models/Student");

// Adding a new student
exports.addStudent = async (req, res) => {
  try {
    const { fullName, email, phone, address, dob, gender } = req.body;

    const existingStudent = await Student.findOne({
      email: email,
      admin: req.admin._id,
    });

    if (existingStudent) {
      return res
        .status(409)
        .json({ message: "Student with this email already exists" });
    }

    const student = new Student({
      fullName,
      email,
      phone,
      address,
      dob,
      gender,
      admin: req.admin.id, // from auth middleware
    });

    await student.save();
    res.status(201).json({ message: "Student added successfully", student });
  } catch (error) {
    res.status(500).json({ message: "Server error" + error.message });
  }
};

//Gettting all student for logged in admin
exports.getAllStudents = async (req, res) => {
  try {
    const students = await Student.find({ admin: req.admin._id }).sort({
      createdAt: -1,
    });

    res.status(200).json({
      total: students.length,
      students,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" + error.message });
  }
};

//Getting one student details
exports.getOneStudent = async (req, res) => {
  try {
    const studentId = req.params.id;
    const adminId = req.admin._id;

    const student = await Student.findOne({
      _id: studentId,
      admin: adminId,
    });

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    return res.status(200).json(student);
  } catch (error) {
    return res.status(500).json({ message: "Server error" + error.message });
  }
};

//Updating one student details
exports.updateStudentInfo = async (req, res) => {
  try {
    const adminId = req.admin._id;
    const studentId = req.params.id;
    const updates = req.body;

    const student = await Student.findOneAndUpdate(
      { _id: studentId, admin: adminId },
      updates,
      { new: true, runValidators: true }
    );

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.status(200).json(student);
  } catch (error) {
    res.status(500).json({ message: "Server error" + error.message });
  }
};

//Deleting a student
exports.deleteStudent = async (req, res) => {
  try {
    const adminId = req.admin._id;
    const studentId = req.params.id;

    const deletedStudent = await Student.findOneAndDelete({
      _id: studentId,
      admin: adminId,
    });

    if (!deletedStudent) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.status(200).json({ message: "Student deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" + error.message });
  }
};

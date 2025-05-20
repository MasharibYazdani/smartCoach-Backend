const Student = require("../models/Student");

exports.addStudent = async (req, res) => {
  try {
    const { fullName, email, phone, address, dob, gender } = req.body;

    const existingStudent = await Student.findOne({ email });

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

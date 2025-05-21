const Fee = require("../models/Fee");
const Enrollment = require("../models/Enrollment");

// Record a fee payment
exports.feesPay = async (req, res) => {
  try {
    const { enrollment, amountPaid, paymentMethod, notes } = req.body;
    const adminId = req.admin._id;

    const foundEnrollment = await Enrollment.findOne({
      _id: enrollment,
      admin: adminId,
    });

    if (!foundEnrollment) {
      return res.status(404).json({
        message: "Enrollment not found",
      });
    }
    const fee = new Fee({
      enrollment,
      amountPaid,
      paymentMethod,
      notes,
      admin: adminId,
    });

    // Update enrollment status only if it's pending
    if (foundEnrollment.status === "pending") {
      foundEnrollment.status = "active";
      foundEnrollment.enrollmentDate = new Date();
      await foundEnrollment.save();
    }

    await fee.save();

    res.status(201).json({
      message: "Payment recorded successfully.",
      fee,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error " + error.message,
    });
  }
};

// Getting all the payment for a student
exports.getStudentFeeHistory = async (req, res) => {
  try {
    const { studentId } = req.params;
    const adminId = req.admin._id;

    // Find all enrollments of this student under the current admin
    const enrollments = await Enrollment.find({
      student: studentId,
      admin: adminId,
    }).populate("course");

    if (!enrollments.length) {
      return res
        .status(404)
        .json({ message: "No enrollments found for this student." });
    }

    const coursePayments = [];

    for (const enrollment of enrollments) {
      const fees = await Fee.find({
        enrollment: enrollment._id,
        admin: adminId,
      });

      const totalPaid = fees.reduce((sum, fee) => sum + fee.amountPaid, 0);

      coursePayments.push({
        courseName: enrollment.course.name,
        courseFees: enrollment.course.fees,
        amountPaid: totalPaid,
      });
    }

    return res.status(200).json({
      success: true,
      data: coursePayments,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error fetching fee history." });
  }
};

// Getting all the payment details for an enrollment
exports.getPaymentsByEnrollment = async (req, res) => {
  try {
    const { enrollmentId } = req.params;
    const adminId = req.admin._id;

    const enrollment = await Enrollment.findOne({
      _id: enrollmentId,
      admin: adminId,
    }).populate("course student");

    if (!enrollment) {
      return res.status(404).json({ message: "Enrollment not found." });
    }

    const payments = await Fee.find({
      enrollment: enrollmentId,
      admin: adminId,
    }).sort({ paymentDate: -1 });

    return res.status(200).json({
      enrollmentDetails: {
        courseName: enrollment.course.name,
        studentName: enrollment.student.fullName,
        courseFees: enrollment.course.fees,
      },
      payments,
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error " + error.message });
  }
};

// Delete a payment record
exports.deletePayment = async (req, res) => {
  try {
    const { id } = req.params;
    const adminId = req.admin._id;

    const deletedPaymentRecord = await Fee.findOneAndDelete({
      _id: id,
      admin: adminId,
    });

    if (!deletedPaymentRecord) {
      return res.status(404).json({ message: "Student not found" });
    }

    return res
      .status(200)
      .json({ message: "Payment record deleted successfully." });
  } catch (error) {
    return res.status(500).json({ message: "Server error " + error.message });
  }
};

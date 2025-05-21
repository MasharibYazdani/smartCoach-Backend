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

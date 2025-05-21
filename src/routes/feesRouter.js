const express = require("express");
const {
  feesPay,
  getStudentFeeHistory,
  getPaymentsByEnrollment,
  deletePayment,
} = require("../controllers/feesController");
const { validatePayment } = require("../validators/feesDataValidations");
const { adminAuth } = require("../middlewares/adminAuth");

const feesRouter = express.Router();

feesRouter.post("/fees/pay", adminAuth, validatePayment, feesPay);

feesRouter.post("/fees/student/:studentId", adminAuth, getStudentFeeHistory);
feesRouter.post(
  "/fees/enrollment/:enrollmentId",
  adminAuth,
  getPaymentsByEnrollment
);
feesRouter.post("/fees/delete/:id", adminAuth, deletePayment);

module.exports = { feesRouter };

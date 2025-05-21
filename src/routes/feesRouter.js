const express = require("express");
const { feesPay } = require("../controllers/feesController");
const { validatePayment } = require("../validators/feesDataValidations");
const { adminAuth } = require("../middlewares/adminAuth");

const feesRouter = express.Router();

feesRouter.post("/fees/pay", adminAuth, validatePayment, feesPay);

module.exports = { feesRouter };

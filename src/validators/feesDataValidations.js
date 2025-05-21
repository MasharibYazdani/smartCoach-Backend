const Joi = require("joi");

const paymentSchema = Joi.object({
  enrollment: Joi.string().required().messages({
    "string.empty": "Enrollment ID is required.",
    "any.required": "Enrollment ID is required.",
  }),
  amountPaid: Joi.number().min(1).required().messages({
    "number.base": "Amount must be a number.",
    "number.min": "Amount must be greater than 0.",
    "any.required": "Amount is required.",
  }),
  paymentMethod: Joi.string()
    .valid("cash", "card", "online", "other")
    .required()
    .messages({
      "any.only": "Payment method must be cash, card, online, or other.",
      "any.required": "Payment method is required.",
    }),
  notes: Joi.string().allow("").optional(),
});

exports.validatePayment = (req, res, next) => {
  const { error } = paymentSchema.validate(req.body, { abortEarly: false });

  if (error) {
    const errors = error.details.map((err) => ({
      field: err.context.key,
      message: err.message,
    }));
    return res.status(400).json({ errors });
  }
  next();
};

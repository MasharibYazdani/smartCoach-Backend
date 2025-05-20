const Joi = require("joi");

// Admin registration validation schema
const adminRegisterSchema = Joi.object({
  fullName: Joi.string().min(3).max(30).required().messages({
    "string.empty": "Full name is required.",
    "string.min": "Full name must be at least 3 characters.",
    "string.max": "Full name must be less than 30 characters.",
  }),

  email: Joi.string().email().required().messages({
    "string.empty": "Email is required.",
    "string.email": "Enter a valid email.",
  }),

  password: Joi.string()
    .min(8)
    .required()
    .pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*])"))
    .messages({
      "string.empty": "Password is required.",
      "string.min": "Password must be at least 8 characters.",
      "string.pattern.base":
        "Enter a strong password with uppercase, lowercase, number, and symbol.",
    }),

  phone: Joi.string()
    .pattern(/^[0-9]{10}$/)
    .required()
    .messages({
      "string.pattern.base": "Phone number must have exactly 10 digits.",
      "string.empty": "Phone number is required.",
    }),
});

// Express middleware
exports.validateAdminRegistration = (req, res, next) => {
  const { error } = adminRegisterSchema.validate(req.body, {
    abortEarly: false,
  });

  if (error) {
    const formattedErrors = error.details.map((detail) => ({
      field: detail.context.key,
      message: detail.message,
    }));

    return res.status(400).json({ errors: formattedErrors });
  }

  next();
};

// Login validation schema
const adminLoginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.email": "Email must be valid",
    "string.empty": "Email is required",
  }),
  password: Joi.string().min(6).required().messages({
    "string.empty": "Password is required",
    "string.min": "Password must be at least 6 characters",
  }),
});

exports.validateAdminLogin = (req, res, next) => {
  const { error } = adminLoginSchema.validate(req.body, { abortEarly: false });

  if (error) {
    const formattedErrors = error.details.map((detail) => ({
      field: detail.context.key,
      message: detail.message,
    }));

    return res.status(400).json({ errors: formattedErrors });
  }

  next();
};

const Joi = require("joi");

// Validation while adding a new student

const addStudentSchema = Joi.object({
  fullName: Joi.string().min(3).max(30).required().messages({
    "string.base": "Full name must be a string",
    "string.empty": "Full name is required",
    "string.min": "Full name must be at least 3 characters",
    "string.max": "Full name must be at most 30 characters",
    "any.required": "Full name is required",
  }),

  email: Joi.string().email().required().messages({
    "string.email": "Email must be a valid email address",
    "string.empty": "Email is required",
    "any.required": "Email is required",
  }),

  phone: Joi.string()
    .pattern(/^[0-9]{10}$/)
    .required()
    .messages({
      "string.pattern.base": "Phone must be a 10-digit number",
      "string.empty": "Phone is required",
      "any.required": "Phone is required",
    }),

  address: Joi.string().optional().messages({
    "string.base": "Address must be a string",
  }),

  dob: Joi.date().optional().messages({
    "date.base": "Date of birth must be a valid date",
    "date.format": "Date of birth must be in ISO format (YYYY-MM-DD)",
  }),

  gender: Joi.string().valid("Male", "Female", "Other").optional().messages({
    "any.only": "Gender must be one of Male, Female, or Other",
  }),
});

exports.validateAddStudent = (req, res, next) => {
  const { error } = addStudentSchema.validate(req.body, { abortEarly: false });
  if (error) {
    const errors = error.details.map((err) => ({
      field: err.context.key,
      message: err.message,
    }));
    return res.status(400).json({ errors });
  }
  next();
};

// Update Validation
const updateStudentSchema = Joi.object({
  fullName: Joi.string().trim().min(3).max(30).messages({
    "string.base": "Full name must be a string",
    "string.min": "Full name must be at least 3 characters",
    "string.max": "Full name must be at most 30 characters",
    "string.empty": "Full name cannot be empty",
  }),

  email: Joi.string().email().lowercase().messages({
    "string.email": "Email must be a valid email address",
    "string.empty": "Email cannot be empty",
  }),

  phone: Joi.string()
    .pattern(/^[0-9]{10}$/)
    .messages({
      "string.pattern.base": "Phone must be a 10-digit number",
      "string.empty": "Phone cannot be empty",
    }),

  address: Joi.string().allow("", null).messages({
    "string.base": "Address must be a string",
  }),

  dob: Joi.date().iso().messages({
    "date.base": "Date of birth must be a valid date",
    "date.format": "Date of birth must be in ISO format (YYYY-MM-DD)",
  }),

  gender: Joi.string().valid("Male", "Female", "Other").messages({
    "any.only": "Gender must be one of Male, Female, or Other",
    "string.empty": "Gender cannot be empty",
  }),
})
  .min(1)
  .messages({
    "object.min": "At least one field must be provided to update",
  });

exports.validateUpdateStudent = (req, res, next) => {
  const { error } = updateStudentSchema.validate(req.body, {
    abortEarly: false,
  });

  if (error) {
    const errors = error.details.map((err) => ({
      field: err.context.key,
      message: err.message,
    }));
    return res.status(400).json({ errors });
  }

  next();
};

const Joi = require("joi");

// Schema for creating a course
const createCourseSchema = Joi.object({
  name: Joi.string().trim().min(3).max(50).required().messages({
    "string.base": "Course name must be a string",
    "string.empty": "Course name is required",
    "string.min": "Course name must be at least 3 characters",
    "string.max": "Course name must be at most 50 characters",
    "any.required": "Course name is required",
  }),

  description: Joi.string().trim().min(10).max(1000).required().messages({
    "string.base": "Description must be a string",
    "string.empty": "Description is required",
    "string.min": "Description must be at least 10 characters",
    "string.max": "Description must be at most 1000 characters",
    "any.required": "Description is required",
  }),

  duration: Joi.string().trim().min(2).max(50).required().messages({
    "string.base": "Duration must be a string",
    "string.empty": "Duration is required",
    "string.min": "Duration must be at least 2 characters",
    "string.max": "Duration must be at most 50 characters",
    "any.required": "Duration is required",
  }),

  fees: Joi.number().positive().required().messages({
    "number.base": "Fees must be a number",
    "number.positive": "Fees must be a positive number",
    "any.required": "Fees is required",
  }),
});

exports.validateAddCourse = (req, res, next) => {
  const { error } = createCourseSchema.validate(req.body, {
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

// Schema for updating a course — same fields, but all optional
const updateCourseSchema = createCourseSchema.fork(
  ["name", "description", "duration", "fees"],
  (field) => field.optional()
);

exports.validateUpdateCourse = (req, res, next) => {
  const { error } = updateCourseSchema.validate(req.body, {
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

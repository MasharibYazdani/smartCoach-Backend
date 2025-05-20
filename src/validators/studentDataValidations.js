const Joi = require("joi");

const addStudentSchema = Joi.object({
  fullName: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  phone: Joi.string()
    .pattern(/^[0-9]{10}$/)
    .required(),
  address: Joi.string().optional(),
  dob: Joi.date().optional(),
  gender: Joi.string().valid("Male", "Female", "Other").optional(),
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

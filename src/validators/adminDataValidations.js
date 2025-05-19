const validator = require("validator");

const validateAdminRegistration = (req) => {
  const { fullName, email, password, phone } = req.body;

  if (fullName.length < 3 || fullName.length > 30) {
    throw new Error("Lenght of name must be greater than 3 and less than 30.");
  } else if (!validator.isEmail(email)) {
    throw new Error("Enter a valid email.");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("Enter a strong password.");
  } else if (Math.abs(phone).toString().length !== 10) {
    throw new Error("Phone number must have 10 digits.");
  }
};

module.exports = { validateAdminRegistration };

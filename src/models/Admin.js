const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const adminSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
      match: /^[0-9]{10}$/,
    },
    role: {
      type: String,
      default: "admin",
    }, // can add 'superadmin' later if needed
  },
  { timestamps: true }
);

adminSchema.methods.verifyPassword = async function (passwordEnterByUser) {
  const admin = this;

  const passwordHash = admin.password;

  const isPasswordCorrect = await bcrypt.compare(
    passwordEnterByUser,
    passwordHash
  );

  return isPasswordCorrect;
};

module.exports = mongoose.model("Admin", adminSchema);

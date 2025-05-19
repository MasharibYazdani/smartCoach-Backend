const mongoose = require("mongoose");

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
      type: Number,
      trim: true,
    },
    role: {
      type: String,
      default: "admin",
    }, // can add 'superadmin' later if needed
  },
  { timestamps: true }
);

module.exports = mongoose.model("Admin", adminSchema);

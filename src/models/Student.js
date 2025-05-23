const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
      match: /^[0-9]{10}$/,
    },
    address: {
      type: String,
    },
    dob: {
      type: Date,
    }, // date of birth

    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
    },

    admin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
      required: true,
    },
    // You can add more personal fields as needed
  },
  { timestamps: true }
);

module.exports = mongoose.model("Student", studentSchema);

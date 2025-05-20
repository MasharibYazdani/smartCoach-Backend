const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    duration: {
      type: String,
      required: true,
    }, // e.g. "3 months"
    fees: {
      type: Number,
      required: true,
    },

    admin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
      required: true,
    },
    // Add other course-related info if needed
  },
  { timestamps: true }
);

module.exports = mongoose.model("Course", courseSchema);

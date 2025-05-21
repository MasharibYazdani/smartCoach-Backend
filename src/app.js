require("dotenv").config();
const express = require("express");
const { connectDB } = require("./config/database");
const { adminRouter } = require("./routes/adminRouter");
const cookieParser = require("cookie-parser");
const { studentRouter } = require("./routes/studentsRouter");
const { courseRouter } = require("./routes/courseRouter");
const { enrollmentRouter } = require("./routes/enrollmentRouter");

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/", adminRouter);
app.use("/", studentRouter);
app.use("/", courseRouter);
app.use("/", enrollmentRouter);

connectDB()
  .then(() => {
    console.log("DB Connected");
  })
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`SmartCoach app listening on port ${process.env.PORT}`);
    });
  });

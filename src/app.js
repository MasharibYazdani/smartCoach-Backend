require("dotenv").config();
const express = require("express");
const { connectDB } = require("./config/database");
const app = express();
const { adminRouter } = require("./routes/adminRouter");

app.use(express.json());

app.use("/", adminRouter);

connectDB()
  .then(() => {
    console.log("DB Connected");
  })
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`SmartCoach app listening on port ${process.env.PORT}`);
    });
  });

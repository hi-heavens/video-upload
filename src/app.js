const express = require("express");
const cors = require("cors");
const AppError = require("./services/AppError");
const globalErrorHandler = require("./services/error.controller");
const videoRouter = require("./video/video.route");

const app = express();

app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

app.use("/video-upload", videoRouter);

app.all("*", (req, res, next) => {
  next(new AppError(`The route ${req.originalUrl} does not exist! 💨`, 404));
});

app.use(globalErrorHandler);

module.exports = app;

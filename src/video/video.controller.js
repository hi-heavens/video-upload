const { v4: uuidv4 } = require("uuid");
const catchAsync = require("../services/catchAsync");
const AppError = require("../services/AppError");
const Upload = require("./video.model");

exports.startRecording = catchAsync(async (req, res, next) => {
  const sessionId = uuidv4();
  res.json({ sessionId });
  console.log(`Screen recording session started with ID: ${sessionId}`);
});

exports.stopRecording = catchAsync(async (req, res, next) => {});

exports.uploadVideo = catchAsync(async (req, res, next) => {
  const videoBase64 = req.body.video;
  if (!videoBase64) {
    return next(new AppError("No valid data uploaded.", 400));
  }
  const fileId = uuidv4();
  const filename = `${fileId}-video.mp4`;
  const buffer = Buffer.from(videoBase64, "base64");
  console.log(typeof buffer);

  console.log(typeof videoBase64);

  const video = new Upload({
    fileId,
    filename,
    data: buffer,
    videoBase64,
  });

  await video.save();
  res.send(
    `Video uploaded: <video controls><source src="${videoBase64}" type="video/mp4"></video>`
  );
  res.send("Hello World 3");
});

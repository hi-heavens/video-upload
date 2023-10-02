const express = require("express");
const router = express.Router();
const videoController = require("./video.controller");

router.post("/start-recording", videoController.uploadVideo);

module.exports = router;

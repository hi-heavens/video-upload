const express = require("express");
const router = express.Router();
const multer = require("multer");
const { startRecording, streamingVideos } = require("./video.controller");

const storage = multer.memoryStorage();
const upload = multer({ storage });

const streamUpload = upload.fields([{ name: "Blob" }, { name: "sessionId" }]);

router.post("/start-recording", startRecording);
router.post("/start-stream", streamUpload, streamingVideos);

module.exports = router;

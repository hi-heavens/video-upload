const express = require("express");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const path = require("path");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
  secure: true,
});

const storage = multer.diskStorage({
  destination: "./uploads",
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

app.use(express.json());

app.post("/upload", upload.single("video"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send("No file uploaded.");
    }

    const fileName = req.file.filename;
    const filePath = path.join(__dirname, "uploads", fileName);
    console.log(filePath);

    const videoUrl = `${req.protocol}://${req.get("host")}/uploads/${
      req.file.filename
    }`;
    console.log(videoUrl);

    const result = await cloudinary.uploader.upload(filePath, {
      resource_type: "video",
      chunk_size: 6000000,
    });
    console.log(result.url);

    res.send(`Video uploaded: <a href="${videoUrl}">${req.file.filename}</a>`);
  } catch (error) {
    console.error("Error uploading to Cloudinary:", error);
    res.status(500).send("Error uploading to Cloudinary.");
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

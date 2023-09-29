const express = require("express");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const fileProcessingUsingForm = require("./fileProcessingUsingForm");
require("dotenv").config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
  secure: true,
});

const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

app.post("/upload", async (req, res) => {
  try {
    if (!req.body.video) {
      return res
        .status(400)
        .json({ status: false, message: "No valid data uploaded." });
    }

    const base64Data = req.body.video;

    // Convert the base64 data to a buffer
    const bufferData = Buffer.from(base64Data, "base64");

    // Code to save the binary data to disk or my database if needed
    // fs.writeFileSync(filePath, bufferData);

    const uploadOptions = {
      resource_type: "video",
      chunk_size: 6000000,
    };

    cloudinary.uploader.upload(base64Data, uploadOptions, (error, result) => {
      if (error) {
        console.error("Error uploading to Cloudinary:", error);
        return res.status(500).send("Error uploading to Cloudinary.");
      }

      // Construct the video URL from the Cloudinary response
      const videoUrl = result.secure_url;

      res.send(
        `Video uploaded: <video controls><source src="${videoUrl}" type="video/mp4"></video>`
      );
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Internal Server Error.");
  }
});
/**
const storage = multer.diskStorage({
  destination: "./uploads",
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

app.post("/upload", upload.single("video"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send("No file uploaded.");
    }
    const videoUrl = await fileProcessingUsingForm(req);

    res.send(`Video uploaded: <a href="${videoUrl}">${req.file.filename}</a>`);
  } catch (error) {
    console.error("Error uploading to Cloudinary:", error);
    res.status(500).send("Error uploading to Cloudinary.");
  }
});
*/
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

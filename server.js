const express = require("express");
const multer = require("multer");

const app = express();
const PORT = process.env.PORT || 3000;

const storage = multer.diskStorage({
  destination: "./uploads",
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

app.use(express.json());

app.post("/upload", upload.single("video"), (req, res) => {
  if (!req.file) {
    return res.status(400).send("No file uploaded.");
  }

  const filePath = req.file.path;
  console.log(filePath);

  const videoUrl = `${req.protocol}://${req.get("host")}/uploads/${
    req.file.filename
  }`;
  res.send(`Video uploaded: <a href="${videoUrl}">${req.file.filename}</a>`);
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

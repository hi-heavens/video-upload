const path = require("path");
const cloudinary = require("cloudinary").v2;
require("dotenv").config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
  secure: true,
});

module.exports = async function (request) {
  const fileName = request.file.filename;
  const filePath = path.join(__dirname, "uploads", fileName);

  const videoUrl = `${request.protocol}://${request.get("host")}/uploads/${
    request.file.filename
  }`;

  const result = await cloudinary.uploader.upload(filePath, {
    resource_type: "video",
    chunk_size: 6000000,
  });
  return result.secure_url;
};

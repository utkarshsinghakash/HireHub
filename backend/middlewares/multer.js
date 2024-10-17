const multer = require("multer");
// const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../utils/cloudinary");
const storage = multer.memoryStorage();

// const storage = new CloudinaryStorage({
//   cloudinary: cloudinary,
//   params: {
//     folder: "pdfs", // The folder where PDFs will be stored
//     allowed_formats: ["pdf"], // Only allow PDFs
//   },
// });

const singleupload = multer({ storage }).single("file");
module.exports = singleupload;

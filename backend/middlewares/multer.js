import multer from "multer";
// import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../utils/cloudinary.js"; // Include .js extension for local files
const storage = multer.memoryStorage();

// const storage = new CloudinaryStorage({
//   cloudinary: cloudinary,
//   params: {
//     folder: "pdfs", // The folder where PDFs will be stored
//     allowed_formats: ["pdf"], // Only allow PDFs
//   },
// });

const singleupload = multer({ storage }).single("file");
export default singleupload;

import multer from "multer";
import cloudinary from "../config/cloudinary.js";
import { v4 as uuidv4 } from "uuid";
import path from "path";

// Multer storage in memory
const storage = multer.memoryStorage();
const temp = multer({ storage });

// Middleware to handle image upload and Cloudinary upload
const uploadImage = [
  temp.single("image"),
  async (req, res, next) => {
    if (!req.file) {
      return res.status(400).json({ error: "No image file provided" });
    }
    try {
      const fileExt = path.extname(req.file.originalname);
      const uniqueFilename = uuidv4() + fileExt;
      const uploadResult = await cloudinary.uploader.upload_stream(
        {
          folder: "business_ideas",
          public_id: uniqueFilename,
          resource_type: "image",
        },
        (error, result) => {
          if (error) {
            return res
              .status(500)
              .json({ error: "Cloudinary upload failed", details: error });
          }
          req.body.image = result.secure_url;
          next();
        }
      );
      // Pipe the buffer to Cloudinary
      uploadResult.end(req.file.buffer);
    } catch (err) {
      return res
        .status(500)
        .json({ error: "Image upload failed", details: err.message });
    }
  },
];

export default uploadImage;

import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import dotenv from 'dotenv'
dotenv.config()
const uploadOnCloudinary = async (file) => {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

  try {
    // Use file.path, not the whole object
    const result = await cloudinary.uploader.upload(file.path);
    
    fs.unlinkSync(file.path);

    // Return the secure URL
    return result.secure_url;
  } catch (error) {
    fs.unlinkSync(file.path);
    console.error("Cloudinary upload error:", error);
    throw error;
  }
};

export default uploadOnCloudinary;

import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";

const storage = (folder) => new CloudinaryStorage({
  cloudinary,
  params: { folder: `village-digital/${folder}`, allowed_formats: ["jpg","jpeg","png","pdf","webp"] },
});

export const uploadProfile     = multer({ storage: storage("profiles") });
export const uploadNews        = multer({ storage: storage("news") });
export const uploadMarketplace = multer({ storage: storage("marketplace") });
export const uploadGrievance   = multer({ storage: storage("grievances") });
export const uploadJob         = multer({ storage: storage("jobs") });

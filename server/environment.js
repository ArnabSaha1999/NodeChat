import dotenv from "dotenv";
dotenv.config();

export const databaseURL =
  process.env.NODE_ENV === "production"
    ? process.env.DATABASE_URL_PROD
    : process.env.DATABASE_URL_DEV;

export const host = process.env.HOST || "localhost";

export const port = process.env.PORT || 3000;

export const origin = process.env.ORIGIN || "http://localhost:5173";

export const jwtSecret = process.env.JWT_SECRET;

export const cloudinaryName = process.env.CLOUDINARY_CLOUD_NAME;
export const cloudinaryKey = process.env.CLOUDINARY_KEY;
export const cloudinarySecret = process.env.CLOUDINARY_SECRET;
export const cloudinaryBaseUrl = process.env.CLOUDINARY_BASE_URL;

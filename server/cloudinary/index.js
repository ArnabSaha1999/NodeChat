import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import {
  cloudinaryName,
  cloudinaryKey,
  cloudinarySecret,
} from "../environment.js";
import multer from "multer";

cloudinary.config({
  cloud_name: cloudinaryName,
  api_key: cloudinaryKey,
  api_secret: cloudinarySecret,
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    let folderName = "NodeChat";
    let resourceType = "auto";
    let format = null;

    const { userId } = req;
    console.log(userId);
    const isProfileAvatar = req.headers["profile-avatar"] === "true";
    console.log("isProfileAvatar", isProfileAvatar);
    if (isProfileAvatar && file.mimetype.startsWith("image/")) {
      folderName = "NodeChat/Profile Avatar";
    } else if (file.mimetype.startsWith("image/")) {
      folderName = "NodeChat/Images";
    } else if (file.mimetype === "application/pdf") {
      folderName = "NodeChat/Documents/PDFs";
      format = "pdf";
    } else if (
      file.mimetype ===
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
      file.mimetype === "application/msword"
    ) {
      folderName = "NodeChat/Documents/Word";
      format = "docx";
    } else if (
      file.mimetype === "application/vnd.ms-excel" ||
      file.mimetype ===
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    ) {
      folderName = "NodeChat/Documents/Excel";
      format = "xlsx";
    } else if (file.mimetype.startsWith("video/")) {
      folderName = "NodeChat/Videos";
      resourceType = "video";
      format = "mp4";
    } else if (file.mimetype.startsWith("audio/")) {
      folderName = "NodeChat/Audios";
      format = "mp3";
    } else if (file.mimetype === "application/json") {
      folderName = "NodeChat/JSON";
      format = "json";
    } else if (
      file.mimetype === "text/html" ||
      file.mimetype === "application/xhtml+xml"
    ) {
      folderName = "NodeChat/Web/HTML";
      format = "html";
    } else if (file.mimetype === "text/javascript") {
      folderName = "NodeChat/Web/JavaScript";
      format = "js";
    } else if (file.mimetype === "text/css") {
      folderName = "NodeChat/Web/CSS";
      format = "css";
    } else if (
      file.mimetype === "application/zip" ||
      file.mimetype === "application/x-rar-compressed"
    ) {
      folderName = "NodeChat/Archives";
      format = "zip";
    } else if (file.mimetype.startsWith("text/")) {
      folderName = "NodeChat/TextFiles";
      format = "txt";
    } else if (
      file.mimetype === "application/octet-stream" ||
      file.mimetype === "application/x-msdownload"
    ) {
      folderName = "NodeChat/Executables";
      format = "exe";
    } else {
      folderName = "NodeChat/Other";
      format = "auto";
    }
    return {
      folder: folderName,
      resource_type: resourceType,
      format: format,
      public_id: `${file.originalname.split(".")[0]}_${userId}`,
    };
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
});

export default upload;

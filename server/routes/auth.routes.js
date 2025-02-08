import { Router } from "express";
import upload from "../cloudinary/index.js";
import {
  addProfileAvatar,
  changePassword,
  chooseThemePreference,
  getUserInfo,
  login,
  logOut,
  removeProfileAvatar,
  signUp,
  updateProfile,
  updateProfileAvatar,
} from "../controllers/auth.controller.js";
import { validateMulter, verifyToken } from "../middlewares/auth.middleware.js";

const authRoutes = Router();

authRoutes.post("/signup", signUp);
authRoutes.post("/login", login);
authRoutes.get("/get-user-info", verifyToken, getUserInfo);
authRoutes.post("/update-profile", verifyToken, updateProfile);
authRoutes.post(
  "/add-profile-avatar",
  verifyToken,
  upload.single("profile-avatar"),
  validateMulter,
  addProfileAvatar
);

authRoutes.post(
  "/update-profile-avatar",
  verifyToken,
  upload.single("profile-avatar"),
  validateMulter,
  updateProfileAvatar
);

authRoutes.delete("/remove-profile-avatar", verifyToken, removeProfileAvatar);

authRoutes.post("/choose-theme-preference", verifyToken, chooseThemePreference);

authRoutes.post("/change-password", verifyToken, changePassword);

authRoutes.post("/logout", logOut);

export default authRoutes;

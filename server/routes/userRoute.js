import express from "express";
import { changePassword, googleLogin, login, signup, updateProfile, toggleSavePost, getSavedPosts } from "../controllers/userController.js";
import isAuthenticated from "../middlewares/authMiddleware.js";
import upload from "../middlewares/upload.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.put("/profile/update", isAuthenticated, upload.single("avatar"), updateProfile);
router.post("/google", googleLogin);
router.put("/change-password", isAuthenticated, changePassword);
router.post("/save/:postId", isAuthenticated, toggleSavePost);
router.get("/saved-posts", isAuthenticated, getSavedPosts);

export default router;
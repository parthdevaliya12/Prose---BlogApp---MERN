import express from "express";
import { generateBlogContent } from "../controllers/aiController.js";
import isAuthenticated from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/generate", isAuthenticated, generateBlogContent);

export default router;

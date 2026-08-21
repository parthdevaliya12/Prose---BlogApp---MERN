import express from "express";
import { addComment, deleteComment, getComments, getMyCommentsCount } from "../controllers/commentController.js";
import isAuthenticated from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/add/:postId", isAuthenticated, addComment);

router.get("/all/:postId", getComments);

router.get("/my-comments-count", isAuthenticated, getMyCommentsCount);

router.delete("/delete/:id", isAuthenticated, deleteComment);

export default router;
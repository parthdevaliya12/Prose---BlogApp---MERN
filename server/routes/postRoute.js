import express from "express";
import { createPost, deletePost, editPost, getAllPosts, getMyPosts, getMyPostsCount, getSinglePost, searchPostsByCategory, likePost, incrementViews, getRelatedPosts } from "../controllers/postController.js";
import isAuthenticated from "../middlewares/authMiddleware.js";
import upload from "../middlewares/upload.js";

const router = express.Router();

router.post("/create", isAuthenticated, upload.single("image"), createPost);
router.get("/all", getAllPosts);
router.get("/single/:id", getSinglePost);
router.get("/my-posts-count", isAuthenticated, getMyPostsCount);
router.get("/my-posts", isAuthenticated, getMyPosts);
router.delete("/delete/:id", isAuthenticated, deletePost);
router.put("/edit/:id", isAuthenticated, upload.single("image"), editPost);
router.get("/search", searchPostsByCategory);
router.post("/like/:id", isAuthenticated, likePost);
router.put("/views/:id", incrementViews);
router.get("/related/:id", getRelatedPosts);




export default router;
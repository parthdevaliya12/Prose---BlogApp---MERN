import postModel from "../models/postModel.js";
import { GoogleGenAI } from "@google/genai";

export const createPost = async (req, res) => {
    try {
        const { title, category, content } = req.body;

        if (!title || !category || !content) {
            return res.status(400).json({
                success: false,
                message: "All fields required",
            });
        }

        const post = await postModel.create({
            title,
            category,
            content,
            image: req.file
                ? `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`
                : "",
            author: req.userId,
        });

        return res.status(201).json({
            success: true,
            message: "Post created successfully",
            post,
        });

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const getAllPosts = async (req, res) => {
    try {
        const posts = await postModel
            .find()
            .populate("author", "fullname email avatar")
            .sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            posts,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const getSinglePost = async (req, res) => {
    try {
        const { id } = req.params;

        const post = await postModel
            .findById(id)
            .populate("author", "fullname email avatar");

        if (!post) {
            return res.status(404).json({
                success: false,
                message: "Post not found",
            });
        }

        return res.status(200).json({
            success: true,
            post,
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};



export const getMyPostsCount = async (req, res) => {
    try {
        const totalPosts = await postModel.countDocuments({
            author: req.userId,
        });

        return res.status(200).json({
            success: true,
            totalPosts,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};


export const getMyPosts = async (req, res) => {
    try {
        const posts = await postModel.find({
            author: req.userId,
        }).populate("author", "fullname").sort({ createdAt: -1 });;

        return res.status(200).json({
            success: true,
            posts,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const deletePost = async (req, res) => {
    try {
        const { id } = req.params;

        const post = await postModel.findById(id);

        if (!post) {
            return res.status(404).json({
                success: false,
                message: "Post not found",
            });
        }

        // owner check
        if (post.author.toString() !== req.userId) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized",
            });
        }

        await postModel.findByIdAndDelete(id);

        return res.status(200).json({
            success: true,
            message: "Post deleted successfully",
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const editPost = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, content, category } = req.body;

        const post = await postModel.findById(id);

        if (!post) {
            return res.status(404).json({
                success: false,
                message: "Post not found",
            });
        }

        // owner check
        if (post.author.toString() !== req.userId) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized",
            });
        }

        if (title) post.title = title;
        if (content) post.content = content;
        if (category) post.category = category;

        // image update
        if (req.file) {
            post.image = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
        }

        await post.save();

        return res.status(200).json({
            success: true,
            message: "Post updated successfully",
            post,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const searchPostsByCategory = async (req, res) => {
    try {
        const { category } = req.query;

        let filter = {};

        if (category && category !== "All") {
            filter.category = {
                $regex: category,
                $options: "i", // Case-insensitive
            };
        }

        const posts = await postModel
            .find(filter)
            .populate("author", "fullname email avatar")
            .sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            posts,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};


export const likePost = async (req, res) => {
    try {
        const { id } = req.params;
        const post = await postModel.findById(id);

        if (!post) {
            return res.status(404).json({ success: false, message: "Post not found" });
        }

        const userId = req.userId;
        const hasLiked = post.likes.includes(userId);

        if (hasLiked) {
            post.likes = post.likes.filter((likeId) => likeId.toString() !== userId);
        } else {
            post.likes.push(userId);
        }

        await post.save();

        return res.status(200).json({
            success: true,
            message: hasLiked ? "Post unliked" : "Post liked",
            likes: post.likes,
        });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

export const incrementViews = async (req, res) => {
    try {
        const { id } = req.params;
        const post = await postModel.findByIdAndUpdate(
            id,
            { $inc: { views: 1 } },
            { new: true }
        );

        if (!post) {
            return res.status(404).json({ success: false, message: "Post not found" });
        }

        return res.status(200).json({
            success: true,
            views: post.views,
        });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

export const getRelatedPosts = async (req, res) => {
    try {
        const { id } = req.params;
        const post = await postModel.findById(id);

        if (!post) {
            return res.status(404).json({ success: false, message: "Post not found" });
        }

        const relatedPosts = await postModel
            .find({
                category: post.category,
                _id: { $ne: id },
            })
            .populate("author", "fullname email avatar")
            .limit(3)
            .sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            posts: relatedPosts,
        });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

import commentModel from "../models/commentModel.js";
import postModel from "../models/postModel.js";


// ADD COMMENT
export const addComment = async (req, res) => {
    try {
        const { comment } = req.body;
        const { postId } = req.params;

        if (!comment) {
            return res.status(400).json({
                success: false,
                message: "Comment required",
            });
        }

        // check post exists
        const post = await postModel.findById(postId);

        if (!post) {
            return res.status(404).json({
                success: false,
                message: "Post not found",
            });
        }

        const newComment = await commentModel.create({
            comment,
            user: req.userId,
            post: postId,
        });

        return res.status(201).json({
            success: true,
            message: "Comment added",
            newComment,
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};


// GET COMMENTS
export const getComments = async (req, res) => {
    try {
        const { postId } = req.params;

        const comments = await commentModel
            .find({ post: postId })
            .populate("user", "fullname avatar")
            .sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            comments,
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const getMyCommentsCount = async (req, res) => {
    try {
        const totalComments = await commentModel.countDocuments({
            user: req.userId,
        });

        return res.status(200).json({
            success: true,
            totalComments,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};


export const deleteComment = async (req, res) => {
    try {
        const { id } = req.params;   // comment id

        const comment = await commentModel.findById(id);

        if (!comment) {
            return res.status(404).json({
                success: false,
                message: "Comment not found",
            });
        }

        // only comment owner can delete
        if (comment.user.toString() !== req.userId) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized",
            });
        }

        await commentModel.findByIdAndDelete(id);

        return res.status(200).json({
            success: true,
            message: "Comment deleted successfully",
        });
    } catch (error) {
        console.log(error);

        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
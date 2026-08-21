import postModel from "../models/postModel.js";
import commentModel from "../models/commentModel.js";

export const getDashboardStats = async (req, res) => {
    try {
        const userId = req.userId;

        // total posts by logged user
        const totalPosts = await postModel.countDocuments({
            author: userId,
        });

        // total comments on user's posts
        const myPosts = await postModel.find({
            author: userId,
        }).select("_id");

        const postIds = myPosts.map((p) => p._id);

        const totalComments = await commentModel.countDocuments({
            post: { $in: postIds },
        });

        // monthly posts (last 6 months)
        const monthlyPosts = await postModel.aggregate([
            {
                $match: {
                    author: userId,
                },
            },
            {
                $group: {
                    _id: { $month: "$createdAt" },
                    total: { $sum: 1 },
                },
            },
            {
                $sort: { _id: 1 },
            },
        ]);

        res.json({
            totalPosts,
            totalComments,
            monthlyPosts,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};
import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
    {
        comment: {
            type: String,
            required: true,
        },

        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        post: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Post",
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const commentModel = mongoose.model("Comment", commentSchema);

export default commentModel;
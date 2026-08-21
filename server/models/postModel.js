import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },

        category: {
            type: String,
            required: true,
        },

        content: {
            type: String,
            required: true,
        },

        image: {
            type: String,
            default: "",
        },

        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        likes: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            }
        ],

        views: {
            type: Number,
            default: 0,
        },
    },
    { timestamps: true }
);

const postModel = mongoose.model("Post", postSchema);

export default postModel;
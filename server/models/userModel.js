import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        fullname: {
            type: String,
            required: true,
        },

        email: {
            type: String,
            required: true,
            unique: true,
        },

        password: {
            type: String,
            required: function() {
                return !this.googleId;
            },
            default: "",
        },
        googleId: {
            type: String,
            default: "",
        },
        avatar: {
            type: String,
            default: "",
        },
        savedPosts: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Post",
            }
        ],
    },
    {
        timestamps: true,
    }
);

const userModel = mongoose.model("User", userSchema);

export default userModel;
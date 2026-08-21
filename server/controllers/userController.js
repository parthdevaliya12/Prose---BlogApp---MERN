// import userModel from "../models/userModel.js";
// import bcrypt from "bcrypt";
// import jwt from "jsonwebtoken";
// import { OAuth2Client } from "google-auth-library";


// export const signup = async (req, res) => {
//     try {
//         const { fullname, email, password } = req.body;

//         const existingUser = await userModel.findOne({ email });

//         if (existingUser) {
//             return res.status(400).json({
//                 success: false,
//                 message: "User already exists",
//             });
//         }

//         const hashedPassword = await bcrypt.hash(password, 10);

//         const user = await userModel.create({
//             fullname,
//             email,
//             password: hashedPassword,
//         });

//         const token = jwt.sign(
//             { id: user._id },
//             process.env.JWT_SECRET
//         );

//         return res.status(201).json({
//             success: true,
//             message: "Signup successful",
//             token,
//             user: {
//                 id: user._id,
//                 fullname: user.fullname,
//                 email: user.email,
//                 avatar: user.avatar,
//             },
//         });

//     } catch (error) {
//         console.log(error);

//         return res.status(500).json({
//             success: false,
//             message: error.message,
//         });
//     }
// };

// export const login = async (req, res) => {
//     try {
//         const { email, password } = req.body;

//         const user = await userModel.findOne({ email });

//         if (!user) {
//             return res.status(400).json({
//                 success: false,
//                 message: "User not found",
//             });
//         }

//         const match = await bcrypt.compare(
//             password,
//             user.password
//         );

//         if (!match) {
//             return res.status(400).json({
//                 success: false,
//                 message: "Wrong password",
//             });
//         }

//         const token = jwt.sign(
//             { id: user._id },
//             process.env.JWT_SECRET
//         );

//         return res.status(200).json({
//             success: true,
//             message: "Login successful",
//             token,
//             user: {
//                 id: user._id,
//                 fullname: user.fullname,
//                 email: user.email,
//                 avatar: user.avatar,
//             },
//         });

//     } catch (error) {
//         console.log(error);

//         return res.status(500).json({
//             success: false,
//             message: error.message,
//         });
//     }
// };

// export const updateProfile = async (req, res) => {
//     try {
//         // console.log("BODY:", req.body);
//         // console.log("FILE:", req.file);
//         // console.log("USER ID:", req.userId);

//         const { fullname } = req.body;

//         const user = await userModel.findById(req.userId);

//         console.log("FOUND USER:", user);

//         if (!user) {
//             return res.status(404).json({
//                 success: false,
//                 message: "User not found",
//             });
//         }

//         if (fullname) {
//             user.fullname = fullname;
//         }

//         if (req.file) {
//             user.avatar =
//                 "http://localhost:5000/uploads/" + req.file.filename;
//         }

//         await user.save();

//         return res.json({
//             success: true,
//             message: "Updated",
//             user
//         });

//     } catch (error) {
//         console.log("UPDATE ERROR:", error);

//         return res.status(500).json({
//             success: false,
//             message: error.message
//         });
//     }
// };



// const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// export const googleLogin = async (req, res) => {
//     try {
//         const { credential } = req.body;

//         const ticket = await client.verifyIdToken({
//             idToken: credential,
//             audience: process.env.GOOGLE_CLIENT_ID,
//         });

//         const payload = ticket.getPayload();

//         const {
//             email,
//             name,
//             picture,
//             sub,
//         } = payload;

//         let user = await userModel.findOne({ email });

//         if (!user) {
//             user = await userModel.create({
//                 fullname: name,
//                 email,
//                 avatar: picture,
//                 googleId: sub,
//                 password: "",
//             });
//         }

//         const token = jwt.sign(
//             {
//                 id: user._id,
//             },
//             process.env.JWT_SECRET,
//             {
//                 expiresIn: "7d",
//             }
//         );

//         res.json({
//             success: true,
//             token,
//             user: {
//                 id: user._id,
//                 fullname: user.fullname,
//                 email: user.email,
//                 avatar: user.avatar,
//             },
//         });
//     } catch (error) {
//         res.status(500).json({
//             success: false,
//             message: error.message,
//         });
//     }
// };

// export const changePassword = async (req, res) => {
//     try {
//         const { newPassword } = req.body;

//         if (!newPassword || newPassword.length < 6) {
//             return res.status(400).json({
//                 success: false,
//                 message: "Password must be at least 6 characters long",
//             });
//         }

//         const user = await userModel.findById(req.userId);

//         if (!user) {
//             return res.status(404).json({
//                 success: false,
//                 message: "User not found",
//             });
//         }

//         // Hash and set/update the new password
//         const hashedPassword = await bcrypt.hash(newPassword, 10);
//         user.password = hashedPassword;
//         await user.save();

//         return res.status(200).json({
//             success: true,
//             message: "Password updated successfully",
//         });
//     } catch (error) {
//         console.log("CHANGE PASSWORD ERROR:", error);
//         return res.status(500).json({
//             success: false,
//             message: error.message,
//         });
//     }
// };
import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { OAuth2Client } from "google-auth-library";

// Reusable regex pattern for strong password validation
const passwordRegex = /^(?=.*[a-z])(?=(?:.*[A-Z]){1,})(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/;

export const signup = async (req, res) => {
    try {
        const { fullname, email, password } = req.body;

        // Password validation: min 8 chars, 1 uppercase, 1 lowercase, 1 special char
        if (!password || !passwordRegex.test(password)) {
            return res.status(400).json({
                success: false,
                message: "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one special character.",
            });
        }

        const existingUser = await userModel.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User already exists",
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await userModel.create({
            fullname,
            email,
            password: hashedPassword,
        });

        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET
        );

        return res.status(201).json({
            success: true,
            message: "Signup successful",
            token,
            user: {
                id: user._id,
                fullname: user.fullname,
                email: user.email,
                avatar: user.avatar,
            },
        });

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await userModel.findOne({ email });

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User not found",
            });
        }

        const match = await bcrypt.compare(
            password,
            user.password
        );

        if (!match) {
            return res.status(400).json({
                success: false,
                message: "Wrong password",
            });
        }

        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET
        );

        return res.status(200).json({
            success: true,
            message: "Login successful",
            token,
            user: {
                id: user._id,
                fullname: user.fullname,
                email: user.email,
                avatar: user.avatar,
            },
        });

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const updateProfile = async (req, res) => {
    try {
        // console.log("BODY:", req.body);
        // console.log("FILE:", req.file);
        // console.log("USER ID:", req.userId);

        const { fullname } = req.body;

        const user = await userModel.findById(req.userId);

        console.log("FOUND USER:", user);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        if (fullname) {
            user.fullname = fullname;
        }

        if (req.file) {
            user.avatar =
                "http://localhost:5000/uploads/" + req.file.filename;
        }

        await user.save();

        return res.json({
            success: true,
            message: "Updated",
            user
        });

    } catch (error) {
        console.log("UPDATE ERROR:", error);

        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};



const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export const googleLogin = async (req, res) => {
    try {
        const { credential } = req.body;

        const ticket = await client.verifyIdToken({
            idToken: credential,
            audience: process.env.GOOGLE_CLIENT_ID,
        });

        const payload = ticket.getPayload();

        const {
            email,
            name,
            picture,
            sub,
        } = payload;

        let user = await userModel.findOne({ email });

        if (!user) {
            user = await userModel.create({
                fullname: name,
                email,
                avatar: picture,
                googleId: sub,
                password: "",
            });
        }

        const token = jwt.sign(
            {
                id: user._id,
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "7d",
            }
        );

        res.json({
            success: true,
            token,
            user: {
                id: user._id,
                fullname: user.fullname,
                email: user.email,
                avatar: user.avatar,
            },
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const changePassword = async (req, res) => {
    try {
        const { newPassword } = req.body;

        // Updated password validation matching the new strict security rules
        if (!newPassword || !passwordRegex.test(newPassword)) {
            return res.status(400).json({
                success: false,
                message: "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one special character.",
            });
        }

        const user = await userModel.findById(req.userId);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        // Hash and set/update the new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        await user.save();

        return res.status(200).json({
            success: true,
            message: "Password updated successfully",
        });
    } catch (error) {
        console.log("CHANGE PASSWORD ERROR:", error);
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const toggleSavePost = async (req, res) => {
    try {
        const { postId } = req.params;
        const user = await userModel.findById(req.userId);

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        const hasSaved = user.savedPosts.includes(postId);

        if (hasSaved) {
            user.savedPosts = user.savedPosts.filter((id) => id.toString() !== postId);
        } else {
            user.savedPosts.push(postId);
        }

        await user.save();

        return res.status(200).json({
            success: true,
            message: hasSaved ? "Post removed from saved" : "Post saved",
            savedPosts: user.savedPosts,
        });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

export const getSavedPosts = async (req, res) => {
    try {
        const user = await userModel.findById(req.userId).populate({
            path: "savedPosts",
            populate: {
                path: "author",
                select: "fullname email avatar",
            },
        });

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        return res.status(200).json({
            success: true,
            savedPosts: user.savedPosts.reverse(), // most recently saved first
        });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};
import jwt from "jsonwebtoken";

const isAuthenticated = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(401).json({
                success: false,
                message: "No token found",
            });
        }

        const token = authHeader.split(" ")[1];

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        req.userId = decoded.id;

        next();

    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Invalid token",
        });
    }
};

export default isAuthenticated;
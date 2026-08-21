import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import userRoute from "./routes/userRoute.js";
import postRoute from "./routes/postRoute.js";
import commentRoute from "./routes/commentRoute.js";
import dashboardRoute from "./routes/dashboardRoute.js";
import aiRoute from "./routes/aiRoute.js";
import cors from "cors";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

// IMPORTANT
app.use("/uploads", express.static("uploads"));

connectDB();

app.use("/api/auth", userRoute);
app.use("/api/post", postRoute);
app.use("/api/comment", commentRoute);
app.use("/api/dashboard", dashboardRoute);
app.use("/api/ai", aiRoute);

app.listen(port, () => {
    console.log(`App is running on port ${port}`);
});
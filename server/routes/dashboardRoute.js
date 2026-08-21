import express from "express";
import { getDashboardStats } from "../controllers/dashboardController.js";
import isAuthenticated from "../middlewares/authMiddleware.js";

const router = express.Router();


router.get("/dashboard-stats", isAuthenticated, getDashboardStats);

export default router;
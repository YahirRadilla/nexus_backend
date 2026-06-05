import express from "express";

import {
    getDashboard
} from "../controllers/dashboardController.js";

import {
    authenticate
} from "../middlewares/authMiddleware.js";

const router =
    express.Router();

router.get(
    "/",
    authenticate,
    getDashboard
);

export default router;
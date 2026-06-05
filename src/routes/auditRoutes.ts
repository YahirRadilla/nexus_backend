import express from "express";

import {
    getAuditLogs
} from "../controllers/auditController.js";

import {
    authenticate
} from "../middlewares/authMiddleware.js";

const router =
    express.Router();

router.get(
    "/",
    authenticate,
    getAuditLogs
);

export default router;
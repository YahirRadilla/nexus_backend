import express from "express";

import {
    getTransactions,
    createTransaction,
    deposit,
    withdraw,
    getHistory,
    transfer,
    getMyHistory
} from "../controllers/transactionController.js";
import { authenticate } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", getTransactions);

router.get("/historial/:cuenta", getHistory);

router.post("/", createTransaction);

router.post("/deposito", deposit);

router.post("/retiro", withdraw);

router.post("/transferencia", authenticate, transfer);

router.get("/mi-historial", authenticate, getMyHistory);

export default router;
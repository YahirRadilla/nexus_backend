import express from "express";

import {
    getTransactions,
    createTransaction,
    deposit,
    withdraw,
    getHistory,
    transfer
} from "../controllers/transactionController.js";

const router = express.Router();

router.get("/", getTransactions);

router.get("/historial/:cuenta", getHistory);

router.post("/", createTransaction);

router.post("/deposito", deposit);

router.post("/retiro", withdraw);

router.post("/transferencia", transfer);

export default router;
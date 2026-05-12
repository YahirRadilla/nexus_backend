import type { Request, Response } from "express";

import Transaction from "../models/Transaction.js";

export const getTransactions = async (
    req: Request,
    res: Response
): Promise<void> => {

    try {

        const transactions = await Transaction.find();

        res.json(transactions);

    } catch (error) {

        res.status(500).json({
            message: "Error getting transactions"
        });

    }

};

export const createTransaction = async (
    req: Request,
    res: Response
): Promise<void> => {

    try {

        const transaction = await Transaction.create(req.body);

        res.status(201).json(transaction);

    } catch (error) {

        res.status(500).json({
            message: "Error creating transaction"
        });

    }

};
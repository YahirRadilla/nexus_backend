import type { Request, Response } from "express";

import Transaction from "../models/Transaction.js";
import Account from "../models/Account.js";

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

export const deposit = async (
    req: Request,
    res: Response
): Promise<void> => {

    try {

        const {
            accountNumber,
            amount,
            branch
        } = req.body;

        if (amount <= 0) {

            res.status(400).json({
                message: "Invalid amount"
            });

            return;
        }

        const account = await Account.findOne({
            accountNumber
        });

        if (!account) {

            res.status(404).json({
                message: "Account not found"
            });

            return;
        }

        account.balance += amount;

        await account.save();

        const transaction = await Transaction.create({
            fromAccount: null,
            toAccount: accountNumber,
            type: "Deposit",
            amount,
            description: "Deposit operation",
            branch,
            status: "Completed"
        });

        res.status(200).json({
            message: "Deposit successful",
            balance: account.balance,
            transaction
        });

    } catch (error) {

        res.status(500).json({
            message: "Error processing deposit"
        });

    }

};

export const withdraw = async (
    req: Request,
    res: Response
): Promise<void> => {

    try {

        const {
            accountNumber,
            amount,
            branch
        } = req.body;

        if (amount <= 0) {

            res.status(400).json({
                message: "Invalid amount"
            });

            return;
        }

        const account = await Account.findOne({
            accountNumber
        });

        if (!account) {

            res.status(404).json({
                message: "Account not found"
            });

            return;
        }

        if (account.balance < amount) {

            res.status(400).json({
                message: "Insufficient funds"
            });

            return;
        }

        account.balance -= amount;

        await account.save();

        const transaction = await Transaction.create({
            fromAccount: accountNumber,
            toAccount: null,
            type: "Withdraw",
            amount,
            description: "Withdraw operation",
            branch,
            status: "Completed"
        });

        res.status(200).json({
            message: "Withdraw successful",
            balance: account.balance,
            transaction
        });

    } catch (error) {

        res.status(500).json({
            message: "Error processing withdraw"
        });

    }

};

export const getHistory = async (
    req: Request,
    res: Response
): Promise<void> => {

    try {

        const cuenta = req.params.cuenta as string;

        const transactions = await Transaction.find({
            $or: [
                { fromAccount: cuenta },
                { toAccount: cuenta }
            ]
        }).sort({ date: -1 });

        res.json(transactions);

    } catch (error) {

        res.status(500).json({
            message: "Error getting history"
        });

    }

};
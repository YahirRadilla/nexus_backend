import type { Request, Response } from "express";

import Transaction from "../models/Transaction.js";
import Account from "../models/Account.js";
import type { AuthRequest } from "../middlewares/authMiddleware.js";

import mongoose from "mongoose";

import { transferSchema } from "../validators/transferValidator.js";

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

        const account = await Account.findOneAndUpdate(
            {
                accountNumber
            },
            {
                $inc: {
                    balance: amount
                }
            },
            {
                new: true
            }
        );

        if (!account) {

            res.status(404).json({
                message: "Account not found"
            });

            return;
        }

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

        const account = await Account.findOneAndUpdate(
            {
                accountNumber,
                balance: { $gte: amount }
            },
            {
                $inc: {
                    balance: -amount
                }
            },
            {
                new: true
            }
        );

        if (!account) {

            res.status(400).json({
                message: "Insufficient funds or account not found"
            });

            return;
        }

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

export const transfer = async (
    req: AuthRequest,
    res: Response
): Promise<void> => {

    const validation =
        transferSchema.safeParse(
            req.body
        );

    if (!validation.success) {

        res.status(400).json({
            errors:
                validation.error.flatten()
        });

        return;
    }

    const session =
        await mongoose.startSession();

    try {

        if (!req.clientId) {

            res.status(401).json({
                message:
                    "Unauthorized"
            });

            return;
        }

        const {
            toAccount,
            amount,
            description,
            branch
        } = req.body;

        if (
            !amount ||
            amount <= 0
        ) {

            res.status(400).json({
                message:
                    "Invalid amount"
            });

            return;
        }

        session.startTransaction();

        const origin =
            await Account.findOne({
                clientId: req.clientId
            }).session(session);

        if (!origin) {

            await session.abortTransaction();

            res.status(404).json({
                message:
                    "Origin account not found"
            });

            return;
        }

        const fromAccount =
            origin.accountNumber;

        if (
            fromAccount ===
            toAccount
        ) {

            await session.abortTransaction();

            res.status(400).json({
                message:
                    "Cannot transfer to same account"
            });

            return;
        }

        const destination =
            await Account.findOne({
                accountNumber:
                    toAccount
            }).session(session);

        if (!destination) {

            await session.abortTransaction();

            res.status(404).json({
                message:
                    "Destination account not found"
            });

            return;
        }

        if (
            origin.balance <
            amount
        ) {

            await session.abortTransaction();

            res.status(400).json({
                message:
                    "Insufficient funds"
            });

            return;
        }

        origin.balance -= amount;

        destination.balance += amount;

        await origin.save({
            session
        });

        await destination.save({
            session
        });

        const transaction =
            await Transaction.create(
                [{
                    fromAccount,
                    toAccount,
                    type:
                        "Transfer",
                    amount,
                    description:
                        description ||
                        "Bank transfer",
                    branch:
                        branch ||
                        "Online",
                    status:
                        "Completed"
                }],
                {
                    session
                }
            );

        await session.commitTransaction();

        res.status(200).json({
            message:
                "Transfer successful",
            balances: {
                origin:
                    origin.balance,
                destination:
                    destination.balance
            },
            transaction:
                transaction[0]
        });

    } catch (error) {

        await session.abortTransaction();

        console.error(error);

        res.status(500).json({
            message:
                "Error processing transfer"
        });

    } finally {

        await session.endSession();

    }

};

export const getMyHistory = async (
    req: AuthRequest,
    res: Response
): Promise<void> => {

    try {

        if (!req.clientId) {

            res.status(401).json({
                message:
                    "Unauthorized"
            });

            return;
        }

        const account =
            await Account.findOne({
                clientId:
                    req.clientId
            });

        if (!account) {

            res.status(404).json({
                message:
                    "Account not found"
            });

            return;
        }

        const transactions =
            await Transaction.find({
                $or: [
                    {
                        fromAccount:
                            account.accountNumber
                    },
                    {
                        toAccount:
                            account.accountNumber
                    }
                ]
            }).sort({
                date: -1
            });

        res.json(
            transactions
        );

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message:
                "Error getting history"
        });

    }

};

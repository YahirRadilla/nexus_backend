import type { Request, Response } from "express";

import Account from "../models/Account.js";
import Client from "../models/Client.js";
import Transaction from "../models/Transaction.js";

export const getAccounts = async (
    req: Request,
    res: Response
): Promise<void> => {

    try {

        const accounts = await Account.find()
            .populate("clientId");

        res.json(accounts);

    } catch (error) {

        res.status(500).json({
            message: "Error getting accounts"
        });

    }

};

export const createAccount = async (
    req: Request,
    res: Response
): Promise<void> => {

    try {

        const {
            clientId,
            accountNumber,
            accountType,
            balance,
            currency
        } = req.body;

        const client = await Client.findById(clientId);

        if (!client) {

            res.status(404).json({
                message: "Client not found"
            });

            return;
        }

        const account = await Account.create({
            clientId,
            accountNumber,
            accountType,
            balance,
            currency
        });

        res.status(201).json(account);

    } catch (error) {

        res.status(500).json({
            message: "Error creating account"
        });

    }

};

export const getAccountDetails = async (
    req: Request,
    res: Response
): Promise<void> => {

    try {

        const cuenta = req.params.cuenta as string;

        const account = await Account.findOne({
            accountNumber: cuenta
        }).populate("clientId");

        if (!account) {

            res.status(404).json({
                message: "Account not found"
            });

            return;
        }

        const transactions = await Transaction.find({
            $or: [
                { fromAccount: cuenta },
                { toAccount: cuenta }
            ]
        });

        res.json({
            account,
            transactions
        });

    } catch (error) {

        res.status(500).json({
            message: "Error getting account details"
        });

    }

};
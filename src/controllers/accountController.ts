import type { Request, Response } from "express";

import Account from "../models/Account.js";
import Client from "../models/Client.js";

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
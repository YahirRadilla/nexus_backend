import type {
    Response
} from "express";

import type {
    AuthRequest
} from "../middlewares/authMiddleware.js";

import Client from "../models/Client.js";
import Account from "../models/Account.js";
import Beneficiary from "../models/Beneficiary.js";
import Transaction from "../models/Transaction.js";

export const getDashboard = async (
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

        const client =
            await Client.findById(
                req.clientId
            );

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

        const beneficiaries =
            await Beneficiary.find({
                ownerId:
                    req.clientId
            });

        const lastTransactions =
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
            })
            .sort({
                date: -1
            })
            .limit(10);

        res.json({
            client,
            account,
            beneficiaries,
            lastTransactions
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message:
                "Error loading dashboard"
        });

    }

};
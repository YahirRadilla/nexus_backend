import type {
    Response
} from "express";

import type {
    AuthRequest
} from "../middlewares/authMiddleware.js";

import Beneficiary from "../models/Beneficiary.js";
import Account from "../models/Account.js";

const getClientId = (
    req: AuthRequest
): string => {

    if (!req.clientId) {
        throw new Error(
            "ClientId not found"
        );
    }

    return req.clientId;
};

export const createBeneficiary = async (
    req: AuthRequest,
    res: Response
): Promise<void> => {

    try {

        const ownerId =
            getClientId(req);

        const {
            accountNumber,
            alias
        } = req.body;

        const account =
            await Account.findOne({
                accountNumber
            });

        if (!account) {

            res.status(404).json({
                message:
                    "Destination account not found"
            });

            return;
        }

        const exists =
            await Beneficiary.findOne({
                ownerId,
                accountNumber
            });

        if (exists) {

            res.status(400).json({
                message:
                    "Beneficiary already exists"
            });

            return;
        }

        const beneficiary =
            await Beneficiary.create({
                ownerId,
                accountNumber,
                alias
            });

        res.status(201).json(
            beneficiary
        );

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message:
                "Error creating beneficiary"
        });

    }

};

export const getBeneficiaries = async (
    req: AuthRequest,
    res: Response
): Promise<void> => {

    try {

        const ownerId =
            getClientId(req);

        const beneficiaries =
            await Beneficiary.find({
                ownerId
            });

        res.json(
            beneficiaries
        );

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message:
                "Error getting beneficiaries"
        });

    }

};

export const deleteBeneficiary = async (
    req: AuthRequest,
    res: Response
): Promise<void> => {

    try {

        const ownerId =
            getClientId(req);

        const beneficiaryId =
            req.params.id;

        if (!beneficiaryId) {

            res.status(400).json({
                message:
                    "Beneficiary id required"
            });

            return;
        }

        const beneficiary =
            await Beneficiary.findOneAndDelete({
                _id: beneficiaryId,
                ownerId
            });

        if (!beneficiary) {

            res.status(404).json({
                message:
                    "Beneficiary not found"
            });

            return;
        }

        res.json({
            message:
                "Beneficiary deleted"
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message:
                "Error deleting beneficiary"
        });

    }

};
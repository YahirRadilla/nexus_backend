import type {
    Response
} from "express";

import Client from "../models/Client.js";

import type {
    AuthRequest
} from "../middlewares/authMiddleware.js";

export const getProfile = async (
    req: AuthRequest,
    res: Response
): Promise<void> => {

    try {

        const client =
            await Client.findById(
                req.clientId
            );

        if (!client) {

            res.status(404).json({
                message:
                    "Client not found"
            });

            return;
        }

        res.json(client);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message:
                "Error getting profile"
        });

    }

};

export const updateProfile = async (
    req: AuthRequest,
    res: Response
): Promise<void> => {

    try {

        const {
            name,
            phone,
            address
        } = req.body;

        const client =
            await Client.findById(
                req.clientId
            );

        if (!client) {

            res.status(404).json({
                message:
                    "Client not found"
            });

            return;
        }

        if (name)
            client.name = name;

        if (phone)
            client.phone = phone;

        if (address)
            client.address = address;

        await client.save();

        res.json({
            message:
                "Profile updated",
            client
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message:
                "Error updating profile"
        });

    }

};
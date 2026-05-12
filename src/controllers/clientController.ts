import type { Request, Response } from "express";

import Client from "../models/Client.js";

export const getClients = async (
    req: Request,
    res: Response
): Promise<void> => {

    try {

        const clients = await Client.find();

        res.json(clients);

    } catch (error) {

        res.status(500).json({
            message: "Error getting clients"
        });

    }

};

export const createClient = async (
    req: Request,
    res: Response
): Promise<void> => {

    try {

        const client = await Client.create(req.body);

        res.status(201).json(client);

    } catch (error) {

        res.status(500).json({
            message: "Error creating client"
        });

    }

};
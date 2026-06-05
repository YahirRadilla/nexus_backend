import type {
    Request,
    Response
} from "express";

export const healthCheck = (
    req: Request,
    res: Response
): void => {

    res.status(200).json({
        status: "UP",
        service: "Nexus Backend",
        timestamp:
            new Date().toISOString()
    });

};
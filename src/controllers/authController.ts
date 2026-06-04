import type {
    Request,
    Response
} from "express";

export const register = async (
    req: Request,
    res: Response
): Promise<void> => {

    try {



    } catch (error) {

        res.status(500).json({
            message: "Error registering user"
        });

    }

};

export const login = async (
    req: Request,
    res: Response
): Promise<void> => {

    try {



    } catch (error) {

        res.status(500).json({
            message: "Error logging in"
        });

    }

};
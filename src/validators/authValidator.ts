import { z } from "zod";

export const registerSchema =
    z.object({

        name:
            z.string()
                .min(3)
                .max(100),

        curp:
            z.string()
                .length(18),

        email:
            z.email(),

        password:
            z.string()
                .min(6),

        phone:
            z.string()
                .min(10)
                .max(15),

        address:
            z.string()
                .min(5)

    });

export const loginSchema =
    z.object({

        email:
            z.email(),

        password:
            z.string()
                .min(6)

    });
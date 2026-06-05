import { z } from "zod";

export const transferSchema =
    z.object({

        toAccount:
            z.string()
                .length(10),

        amount:
            z.number()
                .positive(),

        description:
            z.string()
                .max(200)
                .optional(),

        branch:
            z.string()
                .optional()

    });
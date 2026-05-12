import { Schema, model, Document } from "mongoose";

export interface IAccount extends Document {
    accountNumber: string;
    clientName: string;
    balance: number;
}

const accountSchema = new Schema<IAccount>({
    accountNumber: {
        type: String,
        required: true
    },

    clientName: {
        type: String,
        required: true
    },

    balance: {
        type: Number,
        required: true
    }
});

export default model<IAccount>("Account", accountSchema);
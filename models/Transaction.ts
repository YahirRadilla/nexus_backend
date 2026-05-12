import { Schema, model, Document } from "mongoose";

export interface ITransaction extends Document {
    accountNumber: string;
    type: string;
    amount: number;
    date: Date;
}

const transactionSchema = new Schema<ITransaction>({
    accountNumber: {
        type: String,
        required: true
    },

    type: {
        type: String,
        required: true
    },

    amount: {
        type: Number,
        required: true
    },

    date: {
        type: Date,
        default: Date.now
    }
});

export default model<ITransaction>("Transaction", transactionSchema);
import mongoose, { Schema, Document } from "mongoose";

export interface IAccount extends Document {
    clientId: mongoose.Types.ObjectId;
    accountNumber: string;
    accountType: string;
    balance: number;
    currency: string;
    createdAt: Date;
    status: string;
}

const AccountSchema: Schema = new Schema({
    clientId: {
        type: Schema.Types.ObjectId,
        ref: "Client",
        required: true
    },
    accountNumber: {
        type: String,
        required: true,
        unique: true
    },
    accountType: {
        type: String,
        required: true
    },
    balance: {
        type: Number,
        required: true,
        default: 0
    },
    currency: {
        type: String,
        default: "MXN"
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        default: "Active"
    }
});

export default mongoose.model<IAccount>("Account", AccountSchema);
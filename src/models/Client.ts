import mongoose, { Schema, Document } from "mongoose";

export interface IClient extends Document {
    name: string;
    curp: string;
    email: string;
    password: string;
    phone: string;
    address: string;
    createdAt: Date;
    status: boolean;
}

const ClientSchema: Schema = new Schema({
    name: {
        type: String,
        required: true
    },
    curp: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    phone: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    status: {
        type: Boolean,
        default: true
    }
});

export default mongoose.model<IClient>("Client", ClientSchema);
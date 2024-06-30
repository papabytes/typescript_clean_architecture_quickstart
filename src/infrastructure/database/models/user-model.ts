import mongoose, { Schema, Document, mongo } from "mongoose";

export interface IUserModel extends Document {
    _id: mongoose.ObjectId;
    name: string;
    email: string;
    password_hash: string;
    created_at: Date;
    updated_at: Date;
    deleted_at: Date;
}

const UserSchema: Schema = new Schema({
    _id: { type: mongoose.Types.ObjectId, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    password_hash: { type: String, required: true },
    created_at: { type: Date, required: true },
    updated_at: { type: Date, required: false },
    deleted_at: { type: Date, required: false }
});

export const UserModel = mongoose.model<IUserModel>('User', UserSchema);
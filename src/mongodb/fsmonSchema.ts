import { Document, Schema } from "mongoose";

export interface IFsmon extends Document{
    _id: string;
    atime: string;
    ctime: number;
    mtime: number;
    fsize: number;
    name: string;
    hostname: string;
    pid: number
};

export const fsmonSchema = new Schema<IFsmon>({
    atime: { type: String, required: true },
    ctime: { type: Number, required: true },
    mtime: { type: Number, required: true },
    fsize: { type: Number, required: true },
    name: { type: String, required: true },
    hostname: { type: String, required: true },
    pid: { type: Number, required: true },
})
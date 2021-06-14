import { Document, Schema } from "mongoose";

export interface ISyslog extends Document {
    _id: string;
    timestamp: number;
    port: string;
    pname: string;
    pid: string;
};

export const syslogSchema = new Schema<ISyslog>({
    timestamp: { type: Number, required: true },
    port: { type: String, required: true },
    pname: { type: String, required: true },
    pid: { type: String, required: true },
});
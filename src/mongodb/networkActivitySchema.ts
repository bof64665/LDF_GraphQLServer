import { Document, ObjectId, Schema } from "mongoose";

export interface INetworkActivity extends Document{
    _id: string;
    timestamp: number;
    src_ip: string;
    dst_ip: string;
    src_port: string;
    dst_port: string;
    length: string;
    protocol: 'tcp' | 'udp';
}

export const networkActivitySchema = new Schema<INetworkActivity>({
    timestamp: { type: Number, required: true },
    src_ip: { type: String, required: true },
    dst_ip: { type: String, required: true },
    src_port: { type: String, required: true },
    dst_port: { type: String, required: true },
    length: { type: String, required: true },
    protocol: { type: String, required: true },
});
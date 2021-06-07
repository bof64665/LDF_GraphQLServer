import { Document, Schema } from "mongoose";

export interface Ps extends Document {
    _id: string,
    TS: string[];
    USER: string[];
    UID: string[];
    PID: string[];
    PPID: string[];
    F: string[];
    CPU: string[];
    MEM: string[];
    PRI: string[];
    NI: string[];
    VSZ: string[];
    RSS: string[];
    WCHAN: string[];
    TT: string[];
    STAT: string[];
    STARTED: string[];
    TIME: string[];
    COMMAND: string[];
};

export const psSchema = new Schema<Ps>({
    TS: { type: [String], required: true },
    USER: { type: [String], required: true },
    UID: { type: [String], required: true },
    PID: { type: [String], required: true },
    PPID: { type: [String], required: true },
    F: { type: [String], required: true },
    CPU: { type: [String], required: true },
    MEM: { type: [String], required: true },
    PRI: { type: [String], required: true },
    NI: { type: [String], required: true },
    VSZ: { type: [String], required: true },
    RSS: { type: [String], required: true },
    WCHAN: { type: [String], required: true },
    TT: { type: [String], required: true },
    STAT: { type: [String], required: true },
    STARTED: { type: [String], required: true },
    TIME: { type: [String], required: true },
    COMMAND: { type: [String], required: true },
})
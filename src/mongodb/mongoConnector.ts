import { Model, Mongoose } from "mongoose";
import { Service } from "typedi";
import { Process } from "../graphql/process";
import { fsmonSchema, IFsmon } from "./fsmonSchema";
import { INetworkActivity, networkActivitySchema } from "./networkActivitySchema";
import { Ps, psSchema } from "./psSchema";
import { ISyslog, syslogSchema } from "./syslogSchema";

@Service()
export class MongoConnector {
    private readonly connectionConfig = {
        usr: 'netClient',
        pw: 'Stromboli33!!',
        path: '85.25.195.221',
        port: '27017',
        db: 'CapturingDB',
    }

    private readonly dbConfig = {
        authSource: 'CapturingDB',
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
    };

    private mongoDbConnection: Mongoose = new Mongoose();
    private networkActivityModel: undefined | Model<INetworkActivity> = undefined;
    private fsmonModel: undefined | Model<IFsmon> = undefined;
    private psModel: undefined | Model<Ps> = undefined;
    private syslogModel: undefined | Model<ISyslog> = undefined;

    constructor() {
        this.mongoDbConnection.connect(
            `mongodb://${this.connectionConfig.usr}:${this.connectionConfig.pw}@${this.connectionConfig.path}:${this.connectionConfig.port}/${this.connectionConfig.db}`,
            this.dbConfig,
            (err) => err ? console.log(err) : console.log('Successfully connected to CapturingDB...')
        );
        this.networkActivityModel = 
            this.mongoDbConnection.model<INetworkActivity>('NetworkActivity', networkActivitySchema, 'NetworkActivity');
        this.fsmonModel =
            this.mongoDbConnection.model<IFsmon>('Fsmon', fsmonSchema, 'fsmon_pid_to_file');
        this.psModel =
            this.mongoDbConnection.model<Ps>('Ps', psSchema, 'ps_dec_neu');
        this.syslogModel =
            this.mongoDbConnection.model<ISyslog>('Syslog', syslogSchema, 'Syslog');
    }


    public async getNetworkActivities(startTime?: number, endTime?: number): Promise<INetworkActivity[]> {
        let searchParams = {};
        if(startTime && endTime) {
            searchParams = { $and: [
                { timestamp: { $gte: startTime } }, 
                { timestamp: {$lte: endTime } }
            ]};
        }
        const activities: INetworkActivity[] = this.networkActivityModel ? await this.networkActivityModel.find(searchParams) : [];
        console.log(`Retrieved ${activities.length} network activities!`);
        return activities;
    }

    public async getFsmon(startTime: number, endTime: number): Promise<IFsmon[]> {
        const searchParams = {
            $and: [
                { mtime: { $gte: Math.floor(startTime / 1000) } }, 
                { mtime: { $lte: Math.floor(endTime / 1000) } }
            ]
        };
        /* const fsmon: IFsmon[] = this.fsmonModel ? await this.fsmonModel.find(searchParams) : []; */
        const fsmon: IFsmon[] = this.fsmonModel ? await this.fsmonModel.find() : [];
        console.log(`Retrieved ${fsmon.length} fsmon data!`);
        return fsmon;
    }

    // TODO: Search parameters
    public async getPs(): Promise<Map<string, Process>> {
        const psMap: Map<string, Process> = new Map<string, Process>();
        const ps: Ps[] = this.psModel ? await this.psModel.find() : [];
        ps.forEach((ps: Ps) => {
            ps.PID.forEach((pid: string, index: number) => {
                psMap.set(pid, new Process(pid, ps.COMMAND[index].substr(0, ps.COMMAND[index].length - 1)));
            })
        })
        return psMap;
    }

    // TODO: Search parameters
    public async getSyslog(): Promise<ISyslog[]> {
        const syslog: ISyslog[] = this.syslogModel ? await this.syslogModel.find() : [];
        console.log(`Retrieved ${syslog.length} syslog data!`);
        return syslog;
    }
}
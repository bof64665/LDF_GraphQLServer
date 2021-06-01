import { Model, Mongoose } from "mongoose";
import { Service } from "typedi";
import { INetworkActivity, networkActivitySchema } from "./networkActivitySchema";

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

    constructor() {
        this.mongoDbConnection.connect(
            `mongodb://${this.connectionConfig.usr}:${this.connectionConfig.pw}@${this.connectionConfig.path}:${this.connectionConfig.port}/${this.connectionConfig.db}`,
            this.dbConfig,
            (err) => err ? console.log(err) : console.log('Successfully connected to CapturingDB...')
        );
        this.networkActivityModel = 
            this.mongoDbConnection.model<INetworkActivity>('NetworkActivity', networkActivitySchema, 'NetworkActivity');
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
        console.log(`Retreived ${activities.length} network activities!`);
        return activities;
    }
}
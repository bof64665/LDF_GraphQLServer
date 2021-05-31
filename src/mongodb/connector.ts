import { Mongoose } from "mongoose";
import { Service } from "typedi";
import { INetworkActivity, networkActivitySchema } from "./networkActivitySchema";

@Service()
export class MongoConnector {
    private readonly connectionConfig = {
        usr: 'mongoadmin',
        pw: 'MisterSmith117',
        path: '85.25.195.221',
        port: '27017',
        db: 'CapturingDB',
    }

    private readonly dbConfig = {
        authSource: 'admin',
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
    };

    private mongoDbConnection = new Mongoose();
    public networkActivityModel: any;

    async connect() {
        await this.mongoDbConnection.connect(
            `mongodb://${this.connectionConfig.usr}:${this.connectionConfig.pw}@${this.connectionConfig.path}:${this.connectionConfig.port}/${this.connectionConfig.db}`,
            this.dbConfig,
            (err) => err ? console.log(err) : console.log('Successful connection to MongoDb')
        )
        this.networkActivityModel = 
            this.mongoDbConnection.model<INetworkActivity>('NetworkActivity', networkActivitySchema, 'NetworkActivity');
    }

    closeConnection() {
        this.mongoDbConnection.connection.close();
    }
}
import { Mongoose, Schema } from "mongoose";
import { Service } from "typedi";

const NetworkActivitySchema = new Schema({

})

@Service()
export class MongoConnector {
    private readonly connectionConfig = {
        usr: 'mongoadmin',
        pw: 'MisterSmith117',
        path: '85.25.195.221',
        port: '27017',
    }

    private readonly dbConfig = {
        dbName: "DecisionSupportDB",
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
    };

    private mongoDbConnection = new Mongoose();

    constructor() {
        this.mongoDbConnection.connect(
            `mongodb://${this.connectionConfig.usr}:${this.connectionConfig.pw}@${this.connectionConfig.path}:${this.connectionConfig.port}`,
            this.dbConfig,
            (err) => err ? console.log(err) : console.log('Successful connection to MongoDb')
        )
    }

    closeConnection() {
        this.mongoDbConnection.connection.close();
    }
}
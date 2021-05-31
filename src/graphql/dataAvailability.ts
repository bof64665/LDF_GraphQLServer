import { ObjectType, Field, Query, Resolver } from "type-graphql";
import { MongoConnector } from "../mongodb/connector";

@ObjectType({description: ""})
class DataAvailability {
    @Field()
    startTime: number;

    @Field()
    endTime: number;

    constructor(startTime: number, endTime: number) {
        this.startTime = startTime;
        this.endTime = endTime;
    }
}

@Resolver(of => DataAvailability)
export class DataAvailabilityResolver {
    @Query(returns => DataAvailability)
    async dataAvailability() {
        const dbConnection = new MongoConnector();
        await dbConnection.connect();
        
        let networkActivities = await dbConnection.networkActivityModel.find({});
        networkActivities = networkActivities.map((networkActivity: any) => networkActivity.timestamp);
        const minTimestamp = Math.min(...networkActivities);
        const maxTimestamp = Math.max(...networkActivities);

        dbConnection.closeConnection();
        return new DataAvailability(minTimestamp, maxTimestamp);
    }
}
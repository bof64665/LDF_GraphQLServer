import { ObjectType, Field, Query, Resolver } from "type-graphql";
import Container from "typedi";
import { CdpApiConnector } from "../cdp_api/apiConnector";
import { MongoConnector } from "../mongodb/mongoConnector";
const axios = require('axios').default;

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
        const dbConnection = Container.get(MongoConnector);
        const apiConnection = Container.get(CdpApiConnector);

        let fileVersionTimestamps = (await apiConnection.getFileVersions(true)).timestamps;

        const networkActivityTimestamps = new Set<number>();
        let networkActivities = await dbConnection.getNetworkActivities();
        networkActivities.forEach((networkActivity: any) => networkActivityTimestamps.add(networkActivity.timestamp));

        const timestamps = [...fileVersionTimestamps, ...Array.from(networkActivityTimestamps)];
        
        const minTimestamp = Math.min(...timestamps);
        const maxTimestamp = Math.max(...timestamps);

        return new DataAvailability(minTimestamp, maxTimestamp);
    }
}
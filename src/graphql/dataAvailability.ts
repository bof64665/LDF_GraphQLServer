import { DateTime } from "luxon";
import { ObjectType, Field, Query, Resolver } from "type-graphql";
import Container from "typedi";
import { CdpApiConnector } from "../cdp_api/apiConnector";
import { MongoConnector } from "../mongodb/mongoConnector";
import { FileVersion } from "./fileVersion";
import { mockFileVersions } from "./mockData";
import { mockNetworkActivities } from "./networkActivity";
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

        //let fileVersionTimestamps = (await apiConnection.getFileVersions(true)).timestamps;
        let fileVersionTimestamps = mockFileVersions.map((version: FileVersion) => version.timestamp);

        const networkActivityTimestamps = new Set<number>();
        //let networkActivities = await dbConnection.getNetworkActivities();
        mockNetworkActivities.forEach((networkActivity: any) => networkActivityTimestamps.add(networkActivity.timestamp));

        const timestamps = [...fileVersionTimestamps, ...Array.from(networkActivityTimestamps)];
        
        const minTimestamp = Math.min(...timestamps);
        const maxTimestamp = Math.max(...timestamps);

        return new DataAvailability(DateTime.now().minus({seconds: 1200}).toMillis(), DateTime.now().toMillis());
    }
}
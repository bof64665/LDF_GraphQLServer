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
        return new DataAvailability(Date.now() - 360000, Date.now());
    }
}
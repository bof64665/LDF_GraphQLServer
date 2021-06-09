import { ObjectType, Field, ID } from "type-graphql";
import { FileVersion } from "./fileVersion";
import { NetworkActivity } from "./networkActivity";

@ObjectType({description: ""})
export class DataBucket {
    @Field(type => ID)
    id: number;

    @Field(type => Number)
    timestamp: number;

    @Field(type => Number)
    count: number = 0;

    @Field(type => [FileVersion])
    fileVersion: FileVersion[] = [];

    @Field(type => [NetworkActivity])
    networkActivity: NetworkActivity[] = [];

    constructor(id: number, timestamp: number) {
        this.id = id;
        this.timestamp = timestamp;
    }
}
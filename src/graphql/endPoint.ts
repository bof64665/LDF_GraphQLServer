import { ObjectType, Field, ID } from "type-graphql";

@ObjectType({description: ""})
export class EndPoint {
    @Field(type => ID)
    id: string = '-1';

    @Field(type => String)
    hostIp: string;

    @Field(type => String)
    hostName: string;

    constructor(hostIp: string, hostName: string) {
        this.hostIp = hostIp;
        this.hostName = hostName;
    }
}

export const mockEndpoints: EndPoint[] = [
    {id: 'endpoint1', hostName: 'test', hostIp: '132.199.123.1'}
];
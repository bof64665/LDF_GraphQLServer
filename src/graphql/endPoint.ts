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
    {id: '10.0.0.12', hostName: '10.0.0.12', hostIp: '10.0.0.12'},
    {id: '132.199.123.1', hostName: '132.199.123.1', hostIp: '132.199.123.1'},
    {id: '255.10.13.132', hostName: '278.10.13.132', hostIp: '278.10.13.132'},
    {id: '92.99.231.23', hostName: '92.99.231.23', hostIp: '92.99.231.23'},
];
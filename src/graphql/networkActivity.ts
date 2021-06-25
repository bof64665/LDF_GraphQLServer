import { DateTime } from "luxon";
import { ObjectType, Field, ID } from "type-graphql";

@ObjectType({description: ""})
export class NetworkActivity {
    @Field(type => ID)
    id: string = '-1';

    @Field(type => Number)
    timestamp: number;

    @Field(type => String)
    target: string;

    @Field(type => String)
    source: string;

    @Field(type => String)
    protocol: string;

    @Field(type => Number)
    length: number;

    @Field(type => String)
    process?: string;

    constructor(timestamp: number, target: string, source:string, protocol: string, length: number, process: string) {
        this.timestamp = timestamp;
        this.source = source;
        this.target = target;
        this.process = process;
        this.protocol = protocol;
        this.length = length;
    }
}

@ObjectType({description: ""})
export class NetworkActivityLink {
    @Field(type => ID)
    id: string;

    @Field(type => String)
    source: string;

    @Field(type => String)
    target: string;

    @Field(type => Number)
    overallLinkBytes: number;

    @Field(type => Number)
    byteProportion: number;

    @Field(ttype => [NetworkActivity])
    activities: NetworkActivity[];

    constructor(id: string, source: string, target: string, overallLinkBytes: number, byteProportion: number, activities: NetworkActivity[]) {
        this.id = id;
        this.source = source;
        this.target = target;
        this.overallLinkBytes = overallLinkBytes;
        this.byteProportion = byteProportion;
        this.activities = activities;
    }
}

export const mockNetworkActivities: NetworkActivity[] = [
    {id: 'network01', timestamp: DateTime.now().minus({seconds: 64}).toMillis(), target: '10.0.0.12:447', source: '132.199.123.1:8080', protocol: 'tcp', length: 321},
    {id: 'network02', timestamp: DateTime.now().minus({seconds: 987}).toMillis(), target: '10.0.0.12:447', source: '132.199.123.1:8080', protocol: 'tcp', length: 321},
    {id: 'network03', timestamp: DateTime.now().minus({seconds: 564}).toMillis(), target: '10.0.0.12:447', source: '132.199.123.1:8080', protocol: 'tcp', length: 321},
    {id: 'network04', timestamp: DateTime.now().minus({seconds: 64}).toMillis(), target: '132.199.123.1:8080', source: '10.0.0.12:447', protocol: 'tcp', length: 321},
    {id: 'network05', timestamp: DateTime.now().minus({seconds: 431}).toMillis(), target: '10.0.0.12:80', source: '132.199.123.1:557', protocol: 'udp', length: 321},
    {id: 'network06', timestamp: DateTime.now().minus({seconds: 24}).toMillis(), target: '132.199.123.1:557', source: '10.0.0.12:80', protocol: 'udp', length: 321},
    {id: 'network07', timestamp: DateTime.now().minus({seconds: 468}).toMillis(), target: '10.0.0.12:447', source: '10.0.0.12:81', protocol: 'tcp', length: 321},
    {id: 'network08', timestamp: DateTime.now().minus({seconds: 335}).toMillis(), target: '10.0.0.12:81', source: '10.0.0.12:447', protocol: 'tcp', length: 321},
    {id: 'network09', timestamp: DateTime.now().minus({seconds: 231}).toMillis(), target: '10.0.0.12:447', source: '10.0.0.12:81', protocol: 'tcp', length: 321},
    {id: 'network10', timestamp: DateTime.now().minus({seconds: 178}).toMillis(), target: '10.0.0.12:81', source: '10.0.0.12:447', protocol: 'tcp', length: 321},
    {id: 'network11', timestamp: DateTime.now().minus({seconds: 45}).toMillis(), target: '132.199.123.1:8080', source: '10.0.0.12:447', protocol: 'tcp', length: 321},
    {id: 'network12', timestamp: DateTime.now().minus({seconds: 30}).toMillis(), target: '132.199.123.1:8080', source: '10.0.0.12:447', protocol: 'tcp', length: 321},
];
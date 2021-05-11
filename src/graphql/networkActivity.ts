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

export const mockNetworkActivities: NetworkActivity[] = [
    {id: 'network01', timestamp: DateTime.now().minus({minutes: 3}).toMillis(), target: 'port1', source: 'port5', protocol: 'tcp', length: 321},
    {id: 'network02', timestamp: DateTime.now().minus({minutes: 3}).toMillis(), target: 'port1', source: 'port5', protocol: 'tcp', length: 321},
    {id: 'network03', timestamp: DateTime.now().minus({minutes: 2}).toMillis(), target: 'port1', source: 'port5', protocol: 'tcp', length: 321},
    {id: 'network04', timestamp: DateTime.now().minus({minutes: 1}).toMillis(), target: 'port5', source: 'port1', protocol: 'tcp', length: 321},
    {id: 'network05', timestamp: DateTime.now().minus({minutes: 4}).toMillis(), target: 'port2', source: 'port4', protocol: 'udp', length: 321},
    {id: 'network06', timestamp: DateTime.now().minus({minutes: 2}).toMillis(), target: 'port4', source: 'port2', protocol: 'udp', length: 321},
    {id: 'network07', timestamp: DateTime.now().minus({minutes: 4}).toMillis(), target: 'port1', source: 'port3', protocol: 'tcp', length: 321},
    {id: 'network08', timestamp: DateTime.now().minus({minutes: 3}).toMillis(), target: 'port3', source: 'port1', protocol: 'tcp', length: 321},
    {id: 'network09', timestamp: DateTime.now().minus({minutes: 2}).toMillis(), target: 'port1', source: 'port3', protocol: 'tcp', length: 321},
    {id: 'network10', timestamp: DateTime.now().minus({minutes: 1}).toMillis(), target: 'port3', source: 'port1', protocol: 'tcp', length: 321},
    {id: 'network11', timestamp: DateTime.now().minus({seconds: 45}).toMillis(), target: 'port5', source: 'port1', protocol: 'tcp', length: 321},
    {id: 'network12', timestamp: DateTime.now().minus({seconds: 30}).toMillis(), target: 'port5', source: 'port1', protocol: 'tcp', length: 321},
];
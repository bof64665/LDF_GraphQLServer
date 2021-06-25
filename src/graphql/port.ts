import { ObjectType, Field, ID } from "type-graphql";

@ObjectType ({description: ""})
export class Port {
    @Field(type => ID)
    id: string = "-1";

    @Field(type => Number)
    portNumber: number;

    @Field(type => String)
    hostName: string;

    @Field(type => [String])
    processes?: string[];

    constructor(hostName: string, portNumber: number, processes?: string[]) {
        this.hostName = hostName;
        this.portNumber = portNumber
        if(processes) this.processes = processes;
    }
}

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

export const mockPorts: Port[] = [
    {id: 'port1', portNumber: 447, hostName: 'localhost', processes: ['process1']},
    {id: 'port2', portNumber: 80, hostName: 'localhost', processes: ['process1', 'process4']},
    {id: 'port6', portNumber: 81, hostName: 'localhost', processes: ['process2', 'process4']},
    {id: 'port3', portNumber: 557, hostName: 'test'},
    {id: 'port4', portNumber: 8080, hostName: 'test'},
    {id: 'port5', portNumber: 447, hostName: 'test'},
];

import { ObjectType, Field, ID } from "type-graphql";

@ObjectType({description: ""})
export class Process {
    @Field(type => ID)
    id: string = '-1';

    @Field(type => String)
    name: string;

    @Field(type => String)
    hostName: string = 'localhost';

    constructor(name: string) {
        this.name = name;
    }
}

export const mockProcesses: Process[] = [
    {id: 'process1', name: 'process 1', hostName: 'localhost'},
    {id: 'process2', name: 'process 2', hostName: 'localhost'},
    {id: 'process3', name: 'process 3', hostName: 'localhost'},
    {id: 'process4', name: 'process 4', hostName: 'localhost'},
];
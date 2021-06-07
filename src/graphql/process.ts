import { ObjectType, Field, ID } from "type-graphql";

@ObjectType({description: ""})
export class Process {
    @Field(type => ID)
    id: string = '-1';

    @Field(type => String)
    name: string;

    @Field(type => String)
    hostName: string = '10.0.0.3';

    constructor(id: string, name: string) {
        this.name = name;
        this.id = id;
    }
}

export const mockProcesses: Process[] = [
    {id: '43526', name: 'process 1', hostName: '10.0.0.3'},
    {id: '60', name: 'process 2', hostName: '10.0.0.3'},
    {id: '225', name: 'process 3', hostName: '10.0.0.3'},
    {id: '42401', name: 'process 4', hostName: '10.0.0.3'},
    {id: '45', name: 'process 5', hostName: '10.0.0.3'},
    {id: '30', name: 'process 6', hostName: '10.0.0.3'},
    {id: '43530', name: 'process 7', hostName: '10.0.0.3'},
];
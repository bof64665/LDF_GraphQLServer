import { ObjectType, Field, ID } from "type-graphql";

@ObjectType({description: ""})
export class Process {
    @Field(type => ID)
    id: string = '-1';

    @Field(type => String)
    name: string;

    @Field(type => String)
    hostName: string = '10.0.0.12';

    constructor(id: string, name: string) {
        this.name = name;
        this.id = id;
    }
}

export const mockProcesses: Process[] = [
    {id: '43526', name: 'apple.mail.com', hostName: '10.0.0.12'},
    {id: '60', name: 'apple.safari.com', hostName: '10.0.0.12'},
    {id: '225', name: 'nrlusession', hostName: '10.0.0.12'},
    {id: '42401', name: 'process 4', hostName: '10.0.0.12'},
    {id: '45', name: 'process 5', hostName: '10.0.0.12'},
    {id: '30', name: 'process 6', hostName: '10.0.0.12'},
    {id: '43530', name: 'process 7', hostName: '10.0.0.12'},
];
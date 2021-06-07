import { ObjectType, Field, ID } from "type-graphql";

@ObjectType({description: ""})
export class File {
    @Field(type => ID)
    id: string = "-1";

    @Field(type => String)
    path: string;

    @Field(type => String)
    name: string;

    @Field(type => String)
    type: string;

    @Field(type => String)
    hostName: string = '10.0.0.3'

    constructor(path: string, name: string, type: string) {
        this.path = path;
        this.name = name;
        this.type = type;
    }
}

export const mockFiles: File[] = [
    {id: 'file1', path: '/var/test/foo', name: 'bar.txt', type: 'txt', hostName: 'localhost'},
    {id: 'file2', path: '/var/bar', name: 'foo.doc', type: 'doc', hostName: 'localhost'},
];
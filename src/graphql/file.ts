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
    hostName: string = '10.0.0.12'

    constructor(path: string, name: string, type: string) {
        this.path = path;
        this.name = name;
        this.type = type;
    }
}

/* export const mockFiles: File[] = [
    {id: '/var/test/foo', path: '/var/test/foo/bar.txt', name: 'bar.txt', type: '.txt', hostName: '10.0.0.12'},
    {id: '/var/bar', path: '/var/bar/foo.doc', name: 'foo.doc', type: '.doc', hostName: '10.0.0.12'},
    {id: '/var/bar/foo', path: '/var/bar/foobar_split1.zip', name: 'foobar_split1.zip', type: '.zip', hostName: '10.0.0.12'},
    {id: '/var/bar', path: '/bar/foo/test/foobar_splt2.zip', name: 'foobar_split1.zip', type: '.zip', hostName: '10.0.0.12'},
]; */
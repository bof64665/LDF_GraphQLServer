import { ObjectType, Field, ID } from "type-graphql";
import { DateTime } from 'luxon';

@ObjectType({description: "Describing a new version of an existing file or a new file."})
export class FileVersion {
    @Field(type => ID)
    id: string = "-1";
    
    @Field({description: "Timestamp in ms from Epoch."})
    timestamp: number;

    @Field(type => String)
    target: string;

    @Field(type => String)
    source: string;

    @Field(type => Number)
    fileSize: number;

    @Field(type => String)
    action: string;

/*     @Field(type => Process, {description: "Process which is responsible for the action which lead to the new version of the file."})
    process: Process;
 */
    constructor(timestamp: number, target: string, source: string, fileSize: number, action: string) {
        this.timestamp = timestamp;
        this.target = target;
        this.source = source;
        this.fileSize = fileSize;
        this.action = action;
    }
}

@ObjectType({description: ""})
export class FileVersionLink {
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

    @Field(ttype => [FileVersion])
    versions: FileVersion[];

    constructor(id: string, source: string, target: string, overallLinkBytes: number, byteProportion: number, versions: FileVersion[]) {
        this.id = id;
        this.source = source;
        this.target = target;
        this.overallLinkBytes = overallLinkBytes;
        this.byteProportion = byteProportion;
        this.versions = versions;
    }
}
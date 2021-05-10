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

export const mockFileVersions: FileVersion[] = [
    {id: 'version1', timestamp: DateTime.now().minus({minutes: 2}).toMillis(), target: 'file1', source: 'process2', fileSize: 123, action: 'FSE_CREATE_FILE'},
    {id: 'version2', timestamp: DateTime.now().minus({minutes: 3}).toMillis(), target: 'file2', source: 'process2', fileSize: 2, action: 'FSE_CREATE_FILE'},
    {id: 'version3', timestamp: DateTime.now().minus({minutes: 2}).toMillis(), target: 'file1', source: 'process2', fileSize: 123, action: 'FSE_CONTENT_MODIFIED'},
    {id: 'version4', timestamp: DateTime.now().minus({minutes: 4}).toMillis(), target: 'file1', source: 'process2', fileSize: 123, action: 'FSE_FSE_STAT_CHANGED'},
    {id: 'version5', timestamp: DateTime.now().minus({minutes: 1}).toMillis(), target: 'file1', source: 'process3', fileSize: 123, action: 'FSE_CONTENT_MODIFIED'},
];
import { Args, ArgsType, Field, Int, ObjectType, Query, Resolver } from "type-graphql";
import { MongoConnector } from "../mongodb/connector";
import { EndPoint, mockEndpoints } from "./endPoint";
import { File, mockFiles } from "./file";
import { FileVersion, mockFileVersions } from "./fileVersion";
import { mockNetworkActivities, NetworkActivity } from "./networkActivity";
import { mockPorts, Port } from "./port";
import { mockProcesses, Process } from "./process";

@ObjectType({description: ""})
export class AnalysisData {
    @Field()
    startTime: number;

    @Field()
    endTime: number;

    @Field(type => [EndPoint])
    endpoints: EndPoint[] = [];

    @Field(type => [Port])
    ports: Port[] = [];

    @Field(type => [Process])
    processes: Process[] = [];

    @Field(type => [File])
    files: File[] = [];

    @Field(type => [FileVersion])
    fileVersions: FileVersion[] = [];

    @Field(type => [NetworkActivity])
    networkActivities: NetworkActivity[] = [];

    constructor(startTime: number, endTime: number) {
        this.startTime = startTime;
        this.endTime = endTime;
    }
}

@ArgsType()
class GetAnalysisDataArgs {
    @Field()
    startTime: number = Date.now() - 60000;

    @Field()
    endTime: number = Date.now();;
}

@Resolver(of => AnalysisData)
export class AnalysisDataResolver {
    @Query( returns => AnalysisData)
    async analysisData(@Args() {startTime, endTime}: GetAnalysisDataArgs) {
        const analysisData: AnalysisData = new AnalysisData(startTime, endTime);
        const dbConnection = new MongoConnector();

        // TODO: fill data arrays with real data from DB
        analysisData.endpoints = mockEndpoints;
        analysisData.ports = mockPorts;
        analysisData.processes = mockProcesses;
        analysisData.files = mockFiles;
        analysisData.fileVersions = mockFileVersions;
        analysisData.networkActivities = mockNetworkActivities;

        dbConnection.closeConnection();
        return analysisData;
    }
}
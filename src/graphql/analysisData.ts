import { Args, ArgsType, Field, Int, ObjectType, Query, Resolver } from "type-graphql";
import { MongoConnector } from "../mongodb/connector";
import { INetworkActivity } from "../mongodb/networkActivitySchema";
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
        await dbConnection.connect();

        const tmpEndPoints = new Map<string, EndPoint>();
        const tmpPorts = new Map<string, Port>();
        const tmpNetworkActivity = new Map<string, NetworkActivity>();

        const localhost: string = '10.0.0.3';
        tmpEndPoints.set('localhost', {id: 'localhost', hostIp: localhost, hostName: 'localhost'});

        const networkActivities: INetworkActivity[] = await dbConnection.networkActivityModel.find({}); //TODO: Add timestamp filter to find()-Method
        networkActivities.forEach((na: INetworkActivity) => {
            const srcPortId = `${na.src_ip}:${na.src_port}`;
            const dstPortId = `${na.dst_ip}:${na.dst_port}`;

            tmpNetworkActivity.set(na._id, {id: na._id, timestamp: na.timestamp, source: srcPortId, target: dstPortId, protocol: na.protocol, length: parseInt(na.length)});

            const out: boolean = na.src_ip === localhost;
            const externalIp: string = out ? na.dst_ip : na.src_ip;
            if(!tmpEndPoints.has(externalIp)) tmpEndPoints.set(externalIp, {id: externalIp, hostIp: externalIp, hostName: externalIp});

            if(!tmpPorts.has(srcPortId)) tmpPorts.set(srcPortId, {id: srcPortId, portNumber: parseInt(na.src_port), hostName: na.src_ip});
            if(!tmpPorts.has(dstPortId)) tmpPorts.set(dstPortId, {id: dstPortId, portNumber: parseInt(na.dst_port), hostName: na.dst_ip});
        });

        // TODO: fill data arrays with real data from DB
        analysisData.endpoints = Array.from(tmpEndPoints.values());
        analysisData.ports = Array.from(tmpPorts.values());
        analysisData.networkActivities = Array.from(tmpNetworkActivity.values());
        analysisData.processes = mockProcesses;
        analysisData.files = mockFiles;
        analysisData.fileVersions = mockFileVersions;

        dbConnection.closeConnection();
        return analysisData;
    }
}
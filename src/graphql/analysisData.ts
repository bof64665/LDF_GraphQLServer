import { DateTime } from "luxon";
import { Args, ArgsType, Field, Int, ObjectType, Query, Resolver } from "type-graphql";
import Container from "typedi";
import { CdpApiConnector } from "../cdp_api/apiConnector";
import { MongoConnector } from "../mongodb/mongoConnector";
import { INetworkActivity } from "../mongodb/networkActivitySchema";
import { DataBucket } from "./dataBucket";
import { EndPoint } from "./endPoint";
import { File } from "./file";
import { FileVersion, FileVersionLink } from "./fileVersion";
import { LookUpElement } from "./lookUpElement";
import { NetworkActivity, NetworkActivityLink } from "./networkActivity";
import { Port } from "./port";
import { mockProcesses, Process } from "./process";

const localhost: string = '10.0.0.3';

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

    @Field(type => [DataBucket])
    dataBuckets: DataBucket[] = [];

    @Field(type => [LookUpElement])
    networkActivityLookUp: LookUpElement[] = [];

    @Field(type => [NetworkActivityLink])
    networkActivityLinks: NetworkActivityLink[] = [];

    @Field(type => [LookUpElement])
    fileVersionLookUp: LookUpElement[] = [];

    @Field(type => [FileVersionLink])
    fileVersionLinks: FileVersionLink[] = [];

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

    @Field()
    aggregationGranularity: number = 86400000;
}

@Resolver(of => AnalysisData)
export class AnalysisDataResolver {
    @Query( returns => AnalysisData)
    async analysisData(@Args() {startTime, endTime, aggregationGranularity}: GetAnalysisDataArgs) {
        const analysisData: AnalysisData = new AnalysisData(startTime, endTime);
        const dbConnection = Container.get(MongoConnector);
        const apiConnection = Container.get(CdpApiConnector);

        const tmpEndPoints = new Map<string, EndPoint>();
        const tmpPorts = new Map<string, Port>();
        const tmpNetworkActivity = new Map<string, NetworkActivity>();

        const dbNetworkActivities: INetworkActivity[] = await dbConnection.getNetworkActivities(startTime, endTime);
        dbNetworkActivities.forEach((na: INetworkActivity) => {
            const srcPortId = `${na.src_ip}:${na.src_port}`;
            const dstPortId = `${na.dst_ip}:${na.dst_port}`;

            tmpNetworkActivity.set(na._id, {id: na._id, timestamp: na.timestamp, source: srcPortId, target: dstPortId, protocol: na.protocol, length: parseInt(na.length)});

            const out: boolean = na.src_ip === localhost;
            const externalIp: string = out ? na.dst_ip : na.src_ip;
            tmpEndPoints.set(localhost, {id: localhost, hostIp: localhost, hostName: localhost})
            if(!tmpEndPoints.has(externalIp)) tmpEndPoints.set(externalIp, {id: externalIp, hostIp: externalIp, hostName: externalIp});

            if(!tmpPorts.has(srcPortId)) tmpPorts.set(srcPortId, {id: srcPortId, portNumber: parseInt(na.src_port), hostName: na.src_ip});
            if(!tmpPorts.has(dstPortId)) tmpPorts.set(dstPortId, {id: dstPortId, portNumber: parseInt(na.dst_port), hostName: na.dst_ip});

        });

        const {timestamps, files, fileVersions: tmpFileVersions} = await apiConnection.getFileVersions(false, startTime, endTime);

        const ps: Map<string, Process> = await dbConnection.getPs();
        const processes: Set<Process> = new Set<Process>();

        const emptyProcess: Process = new Process('0', 'n/a')
        tmpFileVersions.forEach((version: FileVersion) => {
            const process: Process | undefined = ps.get(version.source);
            if(process) {
                processes.add(process)
            } else {
                processes.add(emptyProcess)
                version.source = '0';
            }
        });

        analysisData.endpoints = Array.from(tmpEndPoints.values());
        analysisData.ports = Array.from(tmpPorts.values());
        analysisData.networkActivities = Array.from(tmpNetworkActivity.values());
        analysisData.files = files;
        analysisData.fileVersions = tmpFileVersions;
        // TODO: fill remaining data arrays with real data from DB
        analysisData.processes = Array.from(processes);




        const dataBuckets: Map<number, DataBucket> = new Map<number, DataBucket>();
        let bucketStartDateTime = startTime;

        while(bucketStartDateTime < endTime) {
            const bucketHash: number = Math.floor(bucketStartDateTime / aggregationGranularity);
            const bucket = new DataBucket(bucketHash, bucketStartDateTime);
            dataBuckets.set(bucketHash, bucket);
            bucketStartDateTime += aggregationGranularity;
        }

        const networkActivityLinksData = new Map<string, any>()
        const networkActivityLinksLookUp = new Map<string, Set<number>>();

        let overallNetworkBytes: number = 0;
        tmpNetworkActivity.forEach((activity: NetworkActivity, key: string) => {
            const activityBucketHash: number = Math.floor(activity.timestamp / aggregationGranularity);
            const bucket = dataBuckets.get(activityBucketHash);
            if(!bucket) return;
            bucket.count++;
            bucket.networkActivity.push(activity);
            dataBuckets.set(activityBucketHash, bucket);

            const linkId = `${activity.source}->${activity.target}`;
            overallNetworkBytes += activity.length;
            let linkData = networkActivityLinksData.get(linkId);
            if(!linkData) {
                networkActivityLinksData.set(linkId, {
                    id: linkId,
                    target: activity.target,
                    source: activity.source,
                    overallLinkBytes: activity.length,
                    activities: [activity],
                });         
            } else {
                linkData.activities.push(activity);
                linkData.overallLinkBytes += activity.length;
                networkActivityLinksData.set(linkId, linkData);
            }

            let linkLookUp = networkActivityLinksLookUp.get(linkId);
            if(!linkLookUp) {
                networkActivityLinksLookUp.set(linkId, new Set<number>().add(activityBucketHash));
            } else {
                networkActivityLinksLookUp.set(linkId, linkLookUp.add(activityBucketHash));
            }
        });

        networkActivityLinksData.forEach((value: NetworkActivityLink) => {
            value.byteProportion = overallNetworkBytes === 0 ? 0 : value.overallLinkBytes/overallNetworkBytes;
            analysisData.networkActivityLinks.push(value);
        });

        networkActivityLinksLookUp.forEach((value: Set<number>, key: string) => {
            analysisData.networkActivityLookUp.push({key, value: Array.from(value)});
        });




        const fileVersionLinksData = new Map<string, any>()
        const fileVersionLinksLookUp = new Map<string, Set<number>>();

        let overallFileVersionBytes: number = 0;
        tmpFileVersions.forEach((version: FileVersion) => {
            const versionBucketHash = Math.floor(version.timestamp / aggregationGranularity);
            const bucket = dataBuckets.get(versionBucketHash);
            if(!bucket) return;
            bucket.count++;
            bucket.fileVersion.push(version);
            dataBuckets.set(versionBucketHash, bucket);

            const linkId = `${version.source}->${version.target}`;
            overallFileVersionBytes += version.fileSize;
            let linkData = fileVersionLinksData.get(linkId);
            if(!linkData) {
                fileVersionLinksData.set(linkId, {
                    id: linkId,
                    target: version.target,
                    source: version.source,
                    overallLinkBytes: version.fileSize,
                    versions: [version]
                });
            } else {
                linkData.versions.push(version);
                linkData.overallFileVersionBytes += version.fileSize;
                fileVersionLinksData.set(linkId, linkData);
            }

            let linkLookUp = fileVersionLinksLookUp.get(linkId);
            if(!linkLookUp) {
                fileVersionLinksLookUp.set(linkId, new Set<number>().add(versionBucketHash));
            } else {
                fileVersionLinksLookUp.set(linkId, linkLookUp.add(versionBucketHash));
            }
        });

        fileVersionLinksData.forEach((value: FileVersionLink) => {
            value.byteProportion = overallFileVersionBytes === 0 ? 0 : value.overallLinkBytes / overallFileVersionBytes;
            analysisData.fileVersionLinks.push(value);
        });

        fileVersionLinksLookUp.forEach((value: Set<number>, key: string) => {
            analysisData.fileVersionLookUp.push({key, value: Array.from(value)});
        });

        analysisData.dataBuckets = Array.from(dataBuckets.values());

        return analysisData;
    }
}
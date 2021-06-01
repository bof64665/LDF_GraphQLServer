import { Service } from "typedi";
import { FileVersion } from "../graphql/fileVersion";
import { File } from "../graphql/file";
import axios from 'axios';

@Service()
export class CdpApiConnector {
    private fileVersions: Map<string, FileVersion> = new Map<string, FileVersion>();
    private files: Map<string, File> = new Map<string, File>();
    private timestamps: Set<number> = new Set<number>();

    /**
     * 
     * @param onlyTimestamps true if you only want to receive a list of unique timestamps, false for the full dataset
     * @param startTime Epoch timestamp [ms] marking start of time window
     * @param endTime Epoch timestamp [ms] marking end of time window
     * @returns 
     */
    public async getFileVersions(onlyTimestamps: boolean, startTime?: number, endTime?: number): Promise<{timestamps: number[], files: File[], fileVersions: FileVersion[]}> {
        const searchParams: {regex: string, startDate?: number, endDate?: number} = {regex: ''};
        if(startTime && endTime) {
            searchParams.startDate = Math.floor(startTime / 1000);
            searchParams.endDate = Math.floor(endTime / 1000);
        }
        const apiResponse = await axios.get('http://85.25.195.221:8080/restoreList/iPhone11_iOS_14.5_dji-fly_1.3.1(440)', {
            params: searchParams
        });
        this.parseItemList(apiResponse.data, onlyTimestamps);
        return {
            timestamps: Array.from(this.timestamps),
            files: Array.from(this.files.values()),
            fileVersions: Array.from(this.fileVersions.values()),
        };
    }

    private parseItemList(itemList: any[], timestamps: boolean) {
        itemList.forEach((item: any) => {
            if(!item.versions) {
                this.parseItemList(item.items, timestamps);
                this.timestamps.add(item.mtime * 1000);
            } else {
                let file: File | undefined = undefined;
                if (!timestamps) file = this.parseFile(item);
                this.parseFileVersionList(item.versions, file);
            }
        })
    }

    private parseFileVersionList(fileVersionList: any[], file?: File) {
        fileVersionList.forEach((fileVersion: any) => {
            if(file) {
                this.parseFileVersion(fileVersion, file);
            }
            this.timestamps.add(fileVersion.mtime * 1000);
        })
    }

    private parseFile(item: any): File {
        const file = new File(item.path, item.name, item.type);
        file.id = item.path;
        this.files.set(file.id, file);
        return file;
    }

    private parseFileVersion(item: any, file: File): void {
        const fileVersion: FileVersion = new FileVersion(
            item.mtime * 1000,
            file.id,
            'dummyProcess',
            item.fsize,
            'tbd'
        );
        fileVersion.id = `${fileVersion.timestamp}.${fileVersion.source}.${fileVersion.target}`;
        this.fileVersions.set(fileVersion.id, fileVersion);
    }
}

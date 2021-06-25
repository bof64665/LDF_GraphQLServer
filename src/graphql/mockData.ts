import { DateTime } from 'luxon';
import { EndPoint } from './endPoint';
import { File } from './file';
import { FileVersion } from './fileVersion';
import { NetworkActivity } from './networkActivity';
import { Port } from './port';
import { Process } from './process';

const fileVersionCount = 0;
const networkActivityCount = 10;
const localhost = '10.0.0.12';
const localPortsCount = 10;
const externalPortsCount = 10;

export const mockEndpoints: EndPoint[] = [
    {id: '10.0.0.12', hostName: '10.0.0.12', hostIp: '10.0.0.12'},
    {id: '172.217.16.206', hostName: '172.217.16.206', hostIp: '172.217.16.206'},
    {id: '8.8.8.8', hostName: '8.8.8.8', hostIp: '8.8.8.8'},
    {id: '172.217.22.4', hostName: '172.217.22.4', hostIp: '172.217.22.4'},
    {id: '10.0.0.3', hostName: '10.0.0.3', hostIp: '10.0.0.3'},
    {id: '178.32.117.56', hostName: '178.32.117.56', hostIp: '178.32.117.56'},
    {id: '52.35.0.252', hostName: '52.35.0.252', hostIp: '52.35.0.252'},
    {id: '216.58.206.2', hostName: '216.58.206.2', hostIp: '216.58.206.2'},
    {id: '83.169.145.67', hostName: '83.169.145.67', hostIp: '83.169.145.67'},
    {id: '216.58.207.67', hostName: '216.58.207.67', hostIp: '216.58.207.67'},
    {id: '172.217.16.142', hostName: '172.217.16.142', hostIp: '172.217.16.142'},
    {id: '216.58.210.14', hostName: '216.58.210.14', hostIp: '216.58.210.14'},
];

export const mockFiles: File[] = [
    {id: '/var/test/foo/bar.txt', path: '/var/test/foo/bar.txt', name: 'bar.txt', type: '.txt', hostName: '10.0.0.12'},
    {id: '/var/bar/foo.doc', path: '/var/bar/foo.doc', name: 'foo.doc', type: '.doc', hostName: '10.0.0.12'},
    {id: '/var/bar/foo/foobar_split1.zip', path: '/var/bar/foo/foobar_split1.zip', name: 'foobar_split1.zip', type: '.zip', hostName: '10.0.0.12'},
    {id: '/bar/foo/test/foobar_split2.zip', path: '/bar/foo/test/foobar_split2.zip', name: 'foobar_split2.zip', type: '.zip', hostName: '10.0.0.12'},
    {id: '/bar/foo/test/foobar_split3.zip', path: '/bar/foo/test/foobar_split3.zip', name: 'foobar_split3.zip', type: '.jpg', hostName: '10.0.0.12'},
    {id: '/bar/foo/test/foobar_split4.zip', path: '/bar/foo/test/foobar_split4.zip', name: 'foobar_split4.zip', type: '.jpg', hostName: '10.0.0.12'},
    {id: '/bar/foo/test/foobar_split5.zip', path: '/bar/foo/test/foobar_split5.zip', name: 'foobar_split5.zip', type: '.pdf', hostName: '10.0.0.12'},
    {id: '/bar/foo/test/foobar_split6.zip', path: '/bar/foo/test/foobar_split6.zip', name: 'foobar_split6.zip', type: '.txt', hostName: '10.0.0.12'},
    {id: '/bar/foo/test/foobar_split7.zip', path: '/bar/foo/test/foobar_split7.zip', name: 'foobar_split7.zip', type: '.txt', hostName: '10.0.0.12'},
];

export const mockProcesses: Process[] = [
    {id: '43526', name: 'com.apple.mail', hostName: '10.0.0.12'},
    {id: '60', name: 'com.apple.mobilesafari', hostName: '10.0.0.12'},
    {id: '225', name: 'nrlusession', hostName: '10.0.0.12'},
    {id: '42401', name: 'logd', hostName: '10.0.0.12'},
    {id: '45', name: 'ktd', hostName: '10.0.0.12'},
    {id: '30', name: 'locationd', hostName: '10.0.0.12'},
    {id: '43530', name: 'analyticsd', hostName: '10.0.0.12'},
];

export const mockFileVersions: FileVersion[] = [
    {id: 'version01', timestamp: DateTime.now().minus({seconds: Math.floor(Math.random() * 1200)}).toMillis(), target: mockFiles[0].id, source: '42401', fileSize: Math.floor(Math.random() * 1200), action: 'FSE_CREATE_FILE'},
    {id: 'version02', timestamp: DateTime.now().minus({seconds: Math.floor(Math.random() * 1200)}).toMillis(), target: mockFiles[1].id, source: '42401', fileSize: Math.floor(Math.random() * 1200), action: 'FSE_CREATE_FILE'},
    {id: 'version03', timestamp: DateTime.now().minus({seconds: Math.floor(Math.random() * 1200)}).toMillis(), target: mockFiles[2].id, source: '42401', fileSize: Math.floor(Math.random() * 1200), action: 'FSE_CONTENT_MODIFIED'},
    {id: 'version04', timestamp: DateTime.now().minus({seconds: Math.floor(Math.random() * 1200)}).toMillis(), target: mockFiles[2].id, source: '42401', fileSize: Math.floor(Math.random() * 1200), action: 'FSE_FSE_STAT_CHANGED'},
    {id: 'version05', timestamp: DateTime.now().minus({seconds: Math.floor(Math.random() * 1200)}).toMillis(), target: mockFiles[1].id, source: '43526', fileSize: Math.floor(Math.random() * 1200), action: 'FSE_CONTENT_MODIFIED'},
    {id: 'version06', timestamp: DateTime.now().minus({seconds: Math.floor(Math.random() * 1200)}).toMillis(), target: mockFiles[1].id, source: '42401', fileSize: Math.floor(Math.random() * 1200), action: 'FSE_CONTENT_MODIFIED'},
    {id: 'version07', timestamp: DateTime.now().minus({seconds: Math.floor(Math.random() * 1200)}).toMillis(), target: mockFiles[2].id, source: '45', fileSize: Math.floor(Math.random() * 1200), action: 'FSE_CONTENT_MODIFIED'},
    {id: 'version08', timestamp: DateTime.now().minus({seconds: Math.floor(Math.random() * 1200)}).toMillis(), target: mockFiles[0].id, source: '60', fileSize: Math.floor(Math.random() * 1200), action: 'FSE_CONTENT_MODIFIED'},
    {id: 'version09', timestamp: DateTime.now().minus({seconds: Math.floor(Math.random() * 1200)}).toMillis(), target: mockFiles[0].id, source: '30', fileSize: Math.floor(Math.random() * 1200), action: 'FSE_CONTENT_MODIFIED'},
    {id: 'version10', timestamp: DateTime.now().minus({seconds: Math.floor(Math.random() * 1200)}).toMillis(), target: mockFiles[1].id, source: '30', fileSize: Math.floor(Math.random() * 1200), action: 'FSE_CONTENT_MODIFIED'},
    {id: 'version11', timestamp: DateTime.now().minus({seconds: Math.floor(Math.random() * 1200)}).toMillis(), target: mockFiles[3].id, source: '45', fileSize: Math.floor(Math.random() * 1200), action: 'FSE_CONTENT_MODIFIED'},
    {id: 'version12', timestamp: DateTime.now().minus({seconds: Math.floor(Math.random() * 1200)}).toMillis(), target: mockFiles[4].id, source: '60', fileSize: Math.floor(Math.random() * 1200), action: 'FSE_CONTENT_MODIFIED'},
    {id: 'version13', timestamp: DateTime.now().minus({seconds: Math.floor(Math.random() * 1200)}).toMillis(), target: mockFiles[5].id, source: '60', fileSize: Math.floor(Math.random() * 1200), action: 'FSE_CONTENT_MODIFIED'},
    {id: 'version14', timestamp: DateTime.now().minus({seconds: Math.floor(Math.random() * 1200)}).toMillis(), target: mockFiles[6].id, source: '60', fileSize: Math.floor(Math.random() * 1200), action: 'FSE_CONTENT_MODIFIED'},
    {id: 'version15', timestamp: DateTime.now().minus({seconds: Math.floor(Math.random() * 1200)}).toMillis(), target: mockFiles[7].id, source: '60', fileSize: Math.floor(Math.random() * 1200), action: 'FSE_CONTENT_MODIFIED'},
    {id: 'version16', timestamp: DateTime.now().minus({seconds: Math.floor(Math.random() * 1200)}).toMillis(), target: mockFiles[8].id, source: '60', fileSize: Math.floor(Math.random() * 1200), action: 'FSE_CONTENT_MODIFIED'},
    {id: 'version17', timestamp: DateTime.now().minus({seconds: Math.floor(Math.random() * 1200)}).toMillis(), target: mockFiles[8].id, source: '43526', fileSize: Math.floor(Math.random() * 1200), action: 'FSE_CONTENT_MODIFIED'},
];

export const mockPorts: Port[] = [
    {id: '10.0.0.12:58830', portNumber: 0, hostName: '10.0.0.12', processes: []},
    {id: '10.0.0.12:35160', portNumber: 0, hostName: '10.0.0.12', processes: []},
    {id: '10.0.0.12:35731', portNumber: 0, hostName: '10.0.0.12', processes: []},
    {id: '10.0.0.12:35100', portNumber: 0, hostName: '10.0.0.12', processes: []},
    {id: '10.0.0.12:40007', portNumber: 0, hostName: '10.0.0.12', processes: []},
    {id: '10.0.0.12:14567', portNumber: 0, hostName: '10.0.0.12', processes: []},
    {id: '10.0.0.12:17391', portNumber: 0, hostName: '10.0.0.12', processes: []},
    {id: '10.0.0.12:50312', portNumber: 0, hostName: '10.0.0.12', processes: []},
    {id: '10.0.0.12:53885', portNumber: 0, hostName: '10.0.0.12', processes: []},
    {id: '10.0.0.12:47508', portNumber: 0, hostName: '10.0.0.12', processes: []},
    {id: '10.0.0.12:19002', portNumber: 0, hostName: '10.0.0.12', processes: []},
    {id: '10.0.0.12:23554', portNumber: 0, hostName: '10.0.0.12', processes: []},
    {id: '10.0.0.12:23056', portNumber: 0, hostName: '10.0.0.12', processes: []},
    {id: '10.0.0.12:38883', portNumber: 0, hostName: '10.0.0.12', processes: []},
    {id: '10.0.0.12:1026', portNumber: 0, hostName: '10.0.0.12', processes: []},
    {id: '10.0.0.12:5673', portNumber: 0, hostName: '10.0.0.12', processes: []},
    {id: '10.0.0.12:50006', portNumber: 0, hostName: '10.0.0.12', processes: []},
    {id: '10.0.0.12:19478', portNumber: 0, hostName: '10.0.0.12', processes: []},
    {id: '10.0.0.12:53347', portNumber: 0, hostName: '10.0.0.12', processes: []},
    {id: '10.0.0.12:53346', portNumber: 0, hostName: '10.0.0.12', processes: []},
    {id: '10.0.0.12:47157', portNumber: 0, hostName: '10.0.0.12', processes: []},
    {id: '10.0.0.12:47151', portNumber: 0, hostName: '10.0.0.12', processes: []},
    {id: '10.0.0.12:52082', portNumber: 0, hostName: '10.0.0.12', processes: []},
    {id: '10.0.0.12:53078', portNumber: 0, hostName: '10.0.0.12', processes: []},
    {id: '10.0.0.12:41624', portNumber: 0, hostName: '10.0.0.12', processes: []},
    {id: '10.0.0.12:58733', portNumber: 0, hostName: '10.0.0.12', processes: []},
    {id: '10.0.0.12:47425', portNumber: 0, hostName: '10.0.0.12', processes: []},
    {id: '10.0.0.12:54700', portNumber: 0, hostName: '10.0.0.12', processes: []},
    {id: '10.0.0.12:54770', portNumber: 0, hostName: '10.0.0.12', processes: ['60']},
    {id: '10.0.0.12:54771', portNumber: 0, hostName: '10.0.0.12', processes: ['60']},
    {id: '10.0.0.12:54772', portNumber: 0, hostName: '10.0.0.12', processes: ['60']},
    {id: '10.0.0.12:54773', portNumber: 0, hostName: '10.0.0.12', processes: ['60']},
    {id: '10.0.0.12:54775', portNumber: 0, hostName: '10.0.0.12', processes: ['60']},
    {id: '10.0.0.12:54776', portNumber: 0, hostName: '10.0.0.12', processes: []},
    {id: '10.0.0.12:54778', portNumber: 0, hostName: '10.0.0.12', processes: []},
    {id: '10.0.0.12:52211', portNumber: 0, hostName: '10.0.0.12', processes: []},
    {id: '10.0.0.12:35135', portNumber: 0, hostName: '10.0.0.12', processes: []},
    {id: '10.0.0.12:54065', portNumber: 0, hostName: '10.0.0.12', processes: []},
    {id: '10.0.0.12:50030', portNumber: 0, hostName: '10.0.0.12', processes: []},
    {id: '10.0.0.12:51101', portNumber: 0, hostName: '10.0.0.12', processes: []},
    {id: '10.0.0.12:48438', portNumber: 0, hostName: '10.0.0.12', processes: []},
    {id: '10.0.0.12:39978', portNumber: 0, hostName: '10.0.0.12', processes: []},
    {id: '10.0.0.12:42827', portNumber: 0, hostName: '10.0.0.12', processes: []},
    {id: '10.0.0.12:42527', portNumber: 0, hostName: '10.0.0.12', processes: []},
    {id: '10.0.0.12:42528', portNumber: 0, hostName: '10.0.0.12', processes: []},

    {id: '178.32.117.56:443', portNumber: 443, hostName: '178.32.117.56'},
    {id: '216.58.207.67:443', portNumber: 443, hostName: '216.58.207.67'},
    {id: '216.58.206.2:443', portNumber: 443, hostName: '216.58.206.2'},
    {id: '8.8.8.8:53', portNumber: 53, hostName: '8.8.8.8'},
    {id: '172.217.16.206:443', portNumber: 443, hostName: '172.217.16.206'},
    {id: '216.58.210.14:443', portNumber: 443, hostName: '216.58.210.14'},
    {id: '172.217.16.142:80', portNumber: 80, hostName: '172.217.16.142'},
    {id: '172.217.22.4:443', portNumber: 443, hostName: '172.217.22.4'},
    {id: '52.35.0.252:80', portNumber: 80, hostName: '52.35.0.252'},
    {id: '83.169.145.67:443', portNumber: 443, hostName: '83.169.145.67'},
    {id: '10.0.0.3:80', portNumber: 80, hostName: '10.0.0.3'},
];

const mockLocalPorts: Map<string, Port> = new Map<string, Port>();
const mockExternalPorts: Map<string, Port> = new Map<string, Port>();
export const getMockPorts = (): Port[] => {
    mockPorts.forEach((port: Port) => port.portNumber = parseInt(port.id.split(':')[1]))
    return mockPorts;
    mockEndpoints.forEach((endpoint: EndPoint) => {
        
        const local: boolean = endpoint.id === localhost;
        const portCount: number = local ?
            Math.floor((Math.random() * localPortsCount) + 1) :
            Math.floor((Math.random() * externalPortsCount) + 1);

        for(let i = 1; i <= portCount; i++) {
            const portNumber = Math.floor((Math.random() * 5000) + 1);
            const portId = `${endpoint.id}:${portNumber}`;
            const port = local ? mockLocalPorts.get(portId) : mockExternalPorts.get(portId);
            if (port) {
                return
            } else {
                if (local) {
                    mockLocalPorts.set(portId, {
                        id: `${endpoint.id}:${portNumber}`,
                        portNumber: portNumber,
                        hostName: endpoint.id,
                        processes: endpoint.id === localhost ? [] : undefined
                    });
                } else {
                    mockExternalPorts.set(portId, {
                        id: `${endpoint.id}:${portNumber}`,
                        portNumber: portNumber,
                        hostName: endpoint.id,
                        processes: endpoint.id === localhost ? [] : undefined
                    });
                }
                
            }
        }
    })
    return [
        ...Array.from(mockLocalPorts).map((port: [string, Port]) => port[1]),
        ...Array.from(mockExternalPorts).map((port: [string, Port]) => port[1])
    ];
}

export const mockNetworkActivity: NetworkActivity[] = [
    {id: 'network01', timestamp:  DateTime.now().minus({seconds: Math.floor(Math.random() * 1200)}).toMillis(), target: '178.32.117.56:443', source: '10.0.0.12:58830', protocol: 'tcp', length: Math.floor(Math.random() * 1200)},
    {id: 'network01', timestamp:  DateTime.now().minus({seconds: Math.floor(Math.random() * 1200)}).toMillis(), target: '10.0.0.12:58830', source: '178.32.117.56:443', protocol: 'tcp', length: Math.floor(Math.random() * 1200)},
    {id: 'network01', timestamp:  DateTime.now().minus({seconds: Math.floor(Math.random() * 1200)}).toMillis(), target: '216.58.207.67:443', source: '10.0.0.12:35160', protocol: 'tcp', length: Math.floor(Math.random() * 1200)},
    {id: 'network01', timestamp:  DateTime.now().minus({seconds: Math.floor(Math.random() * 1200)}).toMillis(), target: '10.0.0.12:35160', source: '216.58.207.67:443', protocol: 'tcp', length: Math.floor(Math.random() * 1200)},
    {id: 'network01', timestamp:  DateTime.now().minus({seconds: Math.floor(Math.random() * 1200)}).toMillis(), target: '10.0.0.12:35731', source: '216.58.206.2:443', protocol: 'tcp', length: Math.floor(Math.random() * 1200)},
    {id: 'network01', timestamp:  DateTime.now().minus({seconds: Math.floor(Math.random() * 1200)}).toMillis(), target: '216.58.206.2:443', source: '10.0.0.12:35731', protocol: 'tcp', length: Math.floor(Math.random() * 1200)},
    {id: 'network01', timestamp:  DateTime.now().minus({seconds: Math.floor(Math.random() * 1200)}).toMillis(), target: '8.8.8.8:53', source: '10.0.0.12:35100', protocol: 'tcp', length: Math.floor(Math.random() * 1200)},
    {id: 'network01', timestamp:  DateTime.now().minus({seconds: Math.floor(Math.random() * 1200)}).toMillis(), target: '10.0.0.12:35100', source: '8.8.8.8:53', protocol: 'tcp', length: Math.floor(Math.random() * 1200)},
    {id: 'network01', timestamp:  DateTime.now().minus({seconds: Math.floor(Math.random() * 1200)}).toMillis(), target: '8.8.8.8:53', source: '10.0.0.12:40007', protocol: 'tcp', length: Math.floor(Math.random() * 1200)},
    {id: 'network01', timestamp:  DateTime.now().minus({seconds: Math.floor(Math.random() * 1200)}).toMillis(), target: '10.0.0.12:40007', source: '8.8.8.8:53', protocol: 'tcp', length: Math.floor(Math.random() * 1200)},
    {id: 'network01', timestamp:  DateTime.now().minus({seconds: Math.floor(Math.random() * 1200)}).toMillis(), target: '8.8.8.8:53', source: '10.0.0.12:14567', protocol: 'tcp', length: Math.floor(Math.random() * 1200)},
    {id: 'network01', timestamp:  DateTime.now().minus({seconds: Math.floor(Math.random() * 1200)}).toMillis(), target: '10.0.0.12:14567', source: '8.8.8.8:53', protocol: 'tcp', length: Math.floor(Math.random() * 1200)},
    {id: 'network01', timestamp:  DateTime.now().minus({seconds: Math.floor(Math.random() * 1200)}).toMillis(), target: '8.8.8.8:53', source: '10.0.0.12:17391', protocol: 'tcp', length: Math.floor(Math.random() * 1200)},
    {id: 'network01', timestamp:  DateTime.now().minus({seconds: Math.floor(Math.random() * 1200)}).toMillis(), target: '10.0.0.12:17391', source: '8.8.8.8:53', protocol: 'tcp', length: Math.floor(Math.random() * 1200)},
    {id: 'network01', timestamp:  DateTime.now().minus({seconds: Math.floor(Math.random() * 1200)}).toMillis(), target: '8.8.8.8:53', source: '10.0.0.12:50312', protocol: 'tcp', length: Math.floor(Math.random() * 1200)},
    {id: 'network01', timestamp:  DateTime.now().minus({seconds: Math.floor(Math.random() * 1200)}).toMillis(), target: '10.0.0.12:50312', source: '8.8.8.8:53', protocol: 'tcp', length: Math.floor(Math.random() * 1200)},
    {id: 'network01', timestamp:  DateTime.now().minus({seconds: Math.floor(Math.random() * 1200)}).toMillis(), target: '8.8.8.8:53', source: '10.0.0.12:53885', protocol: 'tcp', length: Math.floor(Math.random() * 1200)},
    {id: 'network01', timestamp:  DateTime.now().minus({seconds: Math.floor(Math.random() * 1200)}).toMillis(), target: '10.0.0.12:53885', source: '8.8.8.8:53', protocol: 'tcp', length: Math.floor(Math.random() * 1200)},
    {id: 'network01', timestamp:  DateTime.now().minus({seconds: Math.floor(Math.random() * 1200)}).toMillis(), target: '8.8.8.8:53', source: '10.0.0.12:47508', protocol: 'tcp', length: Math.floor(Math.random() * 1200)},
    {id: 'network01', timestamp:  DateTime.now().minus({seconds: Math.floor(Math.random() * 1200)}).toMillis(), target: '10.0.0.12:47508', source: '8.8.8.8:53', protocol: 'tcp', length: Math.floor(Math.random() * 1200)},
    {id: 'network01', timestamp:  DateTime.now().minus({seconds: Math.floor(Math.random() * 1200)}).toMillis(), target: '8.8.8.8:53', source: '10.0.0.12:19002', protocol: 'tcp', length: Math.floor(Math.random() * 1200)},
    {id: 'network01', timestamp:  DateTime.now().minus({seconds: Math.floor(Math.random() * 1200)}).toMillis(), target: '10.0.0.12:19002', source: '8.8.8.8:53', protocol: 'tcp', length: Math.floor(Math.random() * 1200)},
    {id: 'network01', timestamp:  DateTime.now().minus({seconds: Math.floor(Math.random() * 1200)}).toMillis(), target: '8.8.8.8:53', source: '10.0.0.12:23554', protocol: 'tcp', length: Math.floor(Math.random() * 1200)},
    {id: 'network01', timestamp:  DateTime.now().minus({seconds: Math.floor(Math.random() * 1200)}).toMillis(), target: '10.0.0.12:23554', source: '8.8.8.8:53', protocol: 'tcp', length: Math.floor(Math.random() * 1200)},
    {id: 'network01', timestamp:  DateTime.now().minus({seconds: Math.floor(Math.random() * 1200)}).toMillis(), target: '8.8.8.8:53', source: '10.0.0.12:23056', protocol: 'tcp', length: Math.floor(Math.random() * 1200)},
    {id: 'network01', timestamp:  DateTime.now().minus({seconds: Math.floor(Math.random() * 1200)}).toMillis(), target: '10.0.0.12:23056', source: '8.8.8.8:53', protocol: 'tcp', length: Math.floor(Math.random() * 1200)},
    {id: 'network01', timestamp:  DateTime.now().minus({seconds: Math.floor(Math.random() * 1200)}).toMillis(), target: '8.8.8.8:53', source: '10.0.0.12:38883', protocol: 'tcp', length: Math.floor(Math.random() * 1200)},
    {id: 'network01', timestamp:  DateTime.now().minus({seconds: Math.floor(Math.random() * 1200)}).toMillis(), target: '10.0.0.12:38883', source: '8.8.8.8:53', protocol: 'tcp', length: Math.floor(Math.random() * 1200)},
    {id: 'network01', timestamp:  DateTime.now().minus({seconds: Math.floor(Math.random() * 1200)}).toMillis(), target: '8.8.8.8:53', source: '10.0.0.12:1026', protocol: 'tcp', length: Math.floor(Math.random() * 1200)},
    {id: 'network01', timestamp:  DateTime.now().minus({seconds: Math.floor(Math.random() * 1200)}).toMillis(), target: '10.0.0.12:1026', source: '8.8.8.8:53', protocol: 'tcp', length: Math.floor(Math.random() * 1200)},
    {id: 'network01', timestamp:  DateTime.now().minus({seconds: Math.floor(Math.random() * 1200)}).toMillis(), target: '8.8.8.8:53', source: '10.0.0.12:5673', protocol: 'tcp', length: Math.floor(Math.random() * 1200)},
    {id: 'network01', timestamp:  DateTime.now().minus({seconds: Math.floor(Math.random() * 1200)}).toMillis(), target: '10.0.0.12:5673', source: '8.8.8.8:53', protocol: 'tcp', length: Math.floor(Math.random() * 1200)},
    {id: 'network01', timestamp:  DateTime.now().minus({seconds: Math.floor(Math.random() * 1200)}).toMillis(), target: '8.8.8.8:53', source: '10.0.0.12:50006', protocol: 'tcp', length: Math.floor(Math.random() * 1200)},
    {id: 'network01', timestamp:  DateTime.now().minus({seconds: Math.floor(Math.random() * 1200)}).toMillis(), target: '10.0.0.12:50006', source: '8.8.8.8:53', protocol: 'tcp', length: Math.floor(Math.random() * 1200)},
    {id: 'network01', timestamp:  DateTime.now().minus({seconds: Math.floor(Math.random() * 1200)}).toMillis(), target: '8.8.8.8:53', source: '10.0.0.12:19478', protocol: 'tcp', length: Math.floor(Math.random() * 1200)},
    {id: 'network01', timestamp:  DateTime.now().minus({seconds: Math.floor(Math.random() * 1200)}).toMillis(), target: '10.0.0.12:19478', source: '8.8.8.8:53', protocol: 'tcp', length: Math.floor(Math.random() * 1200)},
    {id: 'network01', timestamp:  DateTime.now().minus({seconds: Math.floor(Math.random() * 1200)}).toMillis(), target: '10.0.0.12:53347', source: '172.217.16.206:443', protocol: 'tcp', length: Math.floor(Math.random() * 1200)},
    {id: 'network01', timestamp:  DateTime.now().minus({seconds: Math.floor(Math.random() * 1200)}).toMillis(), target: '172.217.16.206:443', source: '10.0.0.12:53347', protocol: 'tcp', length: Math.floor(Math.random() * 1200)},
    {id: 'network01', timestamp:  DateTime.now().minus({seconds: Math.floor(Math.random() * 1200)}).toMillis(), target: '10.0.0.12:53346', source: '172.217.16.206:443', protocol: 'tcp', length: Math.floor(Math.random() * 1200)},
    {id: 'network01', timestamp:  DateTime.now().minus({seconds: Math.floor(Math.random() * 1200)}).toMillis(), target: '172.217.16.206:443', source: '10.0.0.12:53346', protocol: 'tcp', length: Math.floor(Math.random() * 1200)},
    {id: 'network01', timestamp:  DateTime.now().minus({seconds: Math.floor(Math.random() * 1200)}).toMillis(), target: '216.58.210.14:443', source: '10.0.0.12:47157', protocol: 'tcp', length: Math.floor(Math.random() * 1200)},
    {id: 'network01', timestamp:  DateTime.now().minus({seconds: Math.floor(Math.random() * 1200)}).toMillis(), target: '10.0.0.12:47157', source: '216.58.210.14:443', protocol: 'tcp', length: Math.floor(Math.random() * 1200)},
    {id: 'network01', timestamp:  DateTime.now().minus({seconds: Math.floor(Math.random() * 1200)}).toMillis(), target: '216.58.210.14:443', source: '10.0.0.12:47151', protocol: 'tcp', length: Math.floor(Math.random() * 1200)},
    {id: 'network01', timestamp:  DateTime.now().minus({seconds: Math.floor(Math.random() * 1200)}).toMillis(), target: '10.0.0.12:47151', source: '216.58.210.14:443', protocol: 'tcp', length: Math.floor(Math.random() * 1200)},
    {id: 'network01', timestamp:  DateTime.now().minus({seconds: Math.floor(Math.random() * 1200)}).toMillis(), target: '172.217.16.142:80', source: '10.0.0.12:52082', protocol: 'tcp', length: Math.floor(Math.random() * 1200)},
    {id: 'network01', timestamp:  DateTime.now().minus({seconds: Math.floor(Math.random() * 1200)}).toMillis(), target: '10.0.0.12:52082', source: '172.217.16.142:80', protocol: 'tcp', length: Math.floor(Math.random() * 1200)},
    {id: 'network01', timestamp:  DateTime.now().minus({seconds: Math.floor(Math.random() * 1200)}).toMillis(), target: '172.217.16.142:80', source: '10.0.0.12:53078', protocol: 'tcp', length: Math.floor(Math.random() * 1200)},
    {id: 'network01', timestamp:  DateTime.now().minus({seconds: Math.floor(Math.random() * 1200)}).toMillis(), target: '10.0.0.12:53078', source: '172.217.16.142:80', protocol: 'tcp', length: Math.floor(Math.random() * 1200)},
    {id: 'network01', timestamp:  DateTime.now().minus({seconds: Math.floor(Math.random() * 1200)}).toMillis(), target: '172.217.16.142:80', source: '10.0.0.12:41624', protocol: 'tcp', length: Math.floor(Math.random() * 1200)},
    {id: 'network01', timestamp:  DateTime.now().minus({seconds: Math.floor(Math.random() * 1200)}).toMillis(), target: '10.0.0.12:41624', source: '172.217.16.142:80', protocol: 'tcp', length: Math.floor(Math.random() * 1200)},
    {id: 'network01', timestamp:  DateTime.now().minus({seconds: Math.floor(Math.random() * 1200)}).toMillis(), target: '172.217.16.142:80', source: '10.0.0.12:58733', protocol: 'tcp', length: Math.floor(Math.random() * 1200)},
    {id: 'network01', timestamp:  DateTime.now().minus({seconds: Math.floor(Math.random() * 1200)}).toMillis(), target: '10.0.0.12:58733', source: '172.217.16.142:80', protocol: 'tcp', length: Math.floor(Math.random() * 1200)},
    {id: 'network01', timestamp:  DateTime.now().minus({seconds: Math.floor(Math.random() * 1200)}).toMillis(), target: '172.217.16.142:80', source: '10.0.0.12:47425', protocol: 'tcp', length: Math.floor(Math.random() * 1200)},
    {id: 'network01', timestamp:  DateTime.now().minus({seconds: Math.floor(Math.random() * 1200)}).toMillis(), target: '10.0.0.12:47425', source: '172.217.16.142:80', protocol: 'tcp', length: Math.floor(Math.random() * 1200)},
    {id: 'network01', timestamp:  DateTime.now().minus({seconds: Math.floor(Math.random() * 1200)}).toMillis(), target: '172.217.22.4:443', source: '10.0.0.12:54700', protocol: 'tcp', length: Math.floor(Math.random() * 1200)},
    {id: 'network01', timestamp:  DateTime.now().minus({seconds: Math.floor(Math.random() * 1200)}).toMillis(), target: '10.0.0.12:54700', source: '172.217.22.4:443', protocol: 'tcp', length: Math.floor(Math.random() * 1200)},
    {id: 'network01', timestamp:  DateTime.now().minus({seconds: Math.floor(Math.random() * 1200)}).toMillis(), target: '172.217.22.4:443', source: '10.0.0.12:54770', protocol: 'tcp', length: Math.floor(Math.random() * 1200)},
    {id: 'network01', timestamp:  DateTime.now().minus({seconds: Math.floor(Math.random() * 1200)}).toMillis(), target: '10.0.0.12:54770', source: '172.217.22.4:443', protocol: 'tcp', length: Math.floor(Math.random() * 1200)},
    {id: 'network01', timestamp:  DateTime.now().minus({seconds: Math.floor(Math.random() * 1200)}).toMillis(), target: '172.217.22.4:443', source: '10.0.0.12:54771', protocol: 'tcp', length: Math.floor(Math.random() * 1200)},
    {id: 'network01', timestamp:  DateTime.now().minus({seconds: Math.floor(Math.random() * 1200)}).toMillis(), target: '10.0.0.12:54771', source: '172.217.22.4:443', protocol: 'tcp', length: Math.floor(Math.random() * 1200)},
    {id: 'network01', timestamp:  DateTime.now().minus({seconds: Math.floor(Math.random() * 1200)}).toMillis(), target: '172.217.22.4:443', source: '10.0.0.12:54772', protocol: 'tcp', length: Math.floor(Math.random() * 1200)},
    {id: 'network01', timestamp:  DateTime.now().minus({seconds: Math.floor(Math.random() * 1200)}).toMillis(), target: '172.217.22.4:443', source: '10.0.0.12:54772', protocol: 'tcp', length: Math.floor(Math.random() * 12000)},
    {id: 'network01', timestamp:  DateTime.now().minus({seconds: Math.floor(Math.random() * 1200)}).toMillis(), target: '172.217.22.4:443', source: '10.0.0.12:54772', protocol: 'tcp', length: Math.floor(Math.random() * 12000)},
    {id: 'network01', timestamp:  DateTime.now().minus({seconds: Math.floor(Math.random() * 1200)}).toMillis(), target: '172.217.22.4:443', source: '10.0.0.12:54772', protocol: 'tcp', length: Math.floor(Math.random() * 12000)},
    {id: 'network01', timestamp:  DateTime.now().minus({seconds: Math.floor(Math.random() * 1200)}).toMillis(), target: '172.217.22.4:443', source: '10.0.0.12:54772', protocol: 'tcp', length: Math.floor(Math.random() * 12000)},
    {id: 'network01', timestamp:  DateTime.now().minus({seconds: Math.floor(Math.random() * 1200)}).toMillis(), target: '172.217.22.4:443', source: '10.0.0.12:54772', protocol: 'tcp', length: Math.floor(Math.random() * 12000)},
    {id: 'network01', timestamp:  DateTime.now().minus({seconds: Math.floor(Math.random() * 1200)}).toMillis(), target: '10.0.0.12:54772', source: '172.217.22.4:443', protocol: 'tcp', length: Math.floor(Math.random() * 1200)},
    {id: 'network01', timestamp:  DateTime.now().minus({seconds: Math.floor(Math.random() * 1200)}).toMillis(), target: '172.217.22.4:443', source: '10.0.0.12:54773', protocol: 'tcp', length: Math.floor(Math.random() * 1200)},
    {id: 'network01', timestamp:  DateTime.now().minus({seconds: Math.floor(Math.random() * 1200)}).toMillis(), target: '10.0.0.12:54773', source: '172.217.22.4:443', protocol: 'tcp', length: Math.floor(Math.random() * 1200)},
    {id: 'network01', timestamp:  DateTime.now().minus({seconds: Math.floor(Math.random() * 1200)}).toMillis(), target: '172.217.22.4:443', source: '10.0.0.12:54775', protocol: 'tcp', length: Math.floor(Math.random() * 1200)},
    {id: 'network01', timestamp:  DateTime.now().minus({seconds: Math.floor(Math.random() * 1200)}).toMillis(), target: '10.0.0.12:54775', source: '172.217.22.4:443', protocol: 'tcp', length: Math.floor(Math.random() * 1200)},
    {id: 'network01', timestamp:  DateTime.now().minus({seconds: Math.floor(Math.random() * 1200)}).toMillis(), target: '172.217.22.4:443', source: '10.0.0.12:54776', protocol: 'tcp', length: Math.floor(Math.random() * 1200)},
    {id: 'network01', timestamp:  DateTime.now().minus({seconds: Math.floor(Math.random() * 1200)}).toMillis(), target: '10.0.0.12:54776', source: '172.217.22.4:443', protocol: 'tcp', length: Math.floor(Math.random() * 1200)},
    {id: 'network01', timestamp:  DateTime.now().minus({seconds: Math.floor(Math.random() * 1200)}).toMillis(), target: '172.217.22.4:443', source: '10.0.0.12:54778', protocol: 'tcp', length: Math.floor(Math.random() * 1200)},
    {id: 'network01', timestamp:  DateTime.now().minus({seconds: Math.floor(Math.random() * 1200)}).toMillis(), target: '10.0.0.12:54778', source: '172.217.22.4:443', protocol: 'tcp', length: Math.floor(Math.random() * 1200)},
    {id: 'network01', timestamp:  DateTime.now().minus({seconds: Math.floor(Math.random() * 1200)}).toMillis(), target: '52.35.0.252:80', source: '10.0.0.12:52211', protocol: 'tcp', length: Math.floor(Math.random() * 1200)},
    {id: 'network01', timestamp:  DateTime.now().minus({seconds: Math.floor(Math.random() * 1200)}).toMillis(), target: '10.0.0.12:52211', source: '52.35.0.252:80', protocol: 'tcp', length: Math.floor(Math.random() * 1200)},
    {id: 'network01', timestamp:  DateTime.now().minus({seconds: Math.floor(Math.random() * 1200)}).toMillis(), target: '52.35.0.252:80', source: '10.0.0.12:35135', protocol: 'tcp', length: Math.floor(Math.random() * 1200)},
    {id: 'network01', timestamp:  DateTime.now().minus({seconds: Math.floor(Math.random() * 1200)}).toMillis(), target: '10.0.0.12:35135', source: '52.35.0.252:80', protocol: 'tcp', length: Math.floor(Math.random() * 1200)},
    {id: 'network01', timestamp:  DateTime.now().minus({seconds: Math.floor(Math.random() * 1200)}).toMillis(), target: '52.35.0.252:80', source: '10.0.0.12:54065', protocol: 'tcp', length: Math.floor(Math.random() * 1200)},
    {id: 'network01', timestamp:  DateTime.now().minus({seconds: Math.floor(Math.random() * 1200)}).toMillis(), target: '10.0.0.12:54065', source: '52.35.0.252:80', protocol: 'tcp', length: Math.floor(Math.random() * 1200)},
    {id: 'network01', timestamp:  DateTime.now().minus({seconds: Math.floor(Math.random() * 1200)}).toMillis(), target: '52.35.0.252:80', source: '10.0.0.12:50030', protocol: 'tcp', length: Math.floor(Math.random() * 1200)},
    {id: 'network01', timestamp:  DateTime.now().minus({seconds: Math.floor(Math.random() * 1200)}).toMillis(), target: '10.0.0.12:50030', source: '52.35.0.252:80', protocol: 'tcp', length: Math.floor(Math.random() * 1200)},
    {id: 'network01', timestamp:  DateTime.now().minus({seconds: Math.floor(Math.random() * 1200)}).toMillis(), target: '52.35.0.252:80', source: '10.0.0.12:51101', protocol: 'tcp', length: Math.floor(Math.random() * 1200)},
    {id: 'network01', timestamp:  DateTime.now().minus({seconds: Math.floor(Math.random() * 1200)}).toMillis(), target: '10.0.0.12:51101', source: '52.35.0.252:80', protocol: 'tcp', length: Math.floor(Math.random() * 1200)},
    {id: 'network01', timestamp:  DateTime.now().minus({seconds: Math.floor(Math.random() * 1200)}).toMillis(), target: '83.169.145.67:443', source: '10.0.0.12:42527', protocol: 'tcp', length: Math.floor(Math.random() * 1200)},
    {id: 'network01', timestamp:  DateTime.now().minus({seconds: Math.floor(Math.random() * 1200)}).toMillis(), target: '10.0.0.12:42527', source: '83.169.145.67:443', protocol: 'tcp', length: Math.floor(Math.random() * 1200)},
    {id: 'network01', timestamp:  DateTime.now().minus({seconds: Math.floor(Math.random() * 1200)}).toMillis(), target: '83.169.145.67:443', source: '10.0.0.12:42528', protocol: 'tcp', length: Math.floor(Math.random() * 1200)},
    {id: 'network01', timestamp:  DateTime.now().minus({seconds: Math.floor(Math.random() * 1200)}).toMillis(), target: '10.0.0.12:42528', source: '83.169.145.67:443', protocol: 'tcp', length: Math.floor(Math.random() * 1200)},
    {id: 'network01', timestamp:  DateTime.now().minus({seconds: Math.floor(Math.random() * 1200)}).toMillis(), target: '10.0.0.3:80', source: '10.0.0.12:48438', protocol: 'tcp', length: Math.floor(Math.random() * 1200)},
    {id: 'network01', timestamp:  DateTime.now().minus({seconds: Math.floor(Math.random() * 1200)}).toMillis(), target: '10.0.0.12:48438', source: '10.0.0.3:80', protocol: 'tcp', length: Math.floor(Math.random() * 1200)},
    {id: 'network01', timestamp:  DateTime.now().minus({seconds: Math.floor(Math.random() * 1200)}).toMillis(), target: '10.0.0.3:80', source: '10.0.0.12:39978', protocol: 'tcp', length: Math.floor(Math.random() * 1200)},
    {id: 'network01', timestamp:  DateTime.now().minus({seconds: Math.floor(Math.random() * 1200)}).toMillis(), target: '10.0.0.12:39978', source: '10.0.0.3:80', protocol: 'tcp', length: Math.floor(Math.random() * 1200)},
    {id: 'network01', timestamp:  DateTime.now().minus({seconds: Math.floor(Math.random() * 1200)}).toMillis(), target: '10.0.0.3:80', source: '10.0.0.12:42827', protocol: 'tcp', length: Math.floor(Math.random() * 1200)},
    {id: 'network01', timestamp:  DateTime.now().minus({seconds: Math.floor(Math.random() * 1200)}).toMillis(), target: '10.0.0.12:42827', source: '10.0.0.3:80', protocol: 'tcp', length: Math.floor(Math.random() * 1200)},
    
];
export const getNetworkActivity = (): NetworkActivity[] => {
    mockNetworkActivity.forEach((value: NetworkActivity, index: number) => value.id = `network-${index}`)
    return mockNetworkActivity;
    const localPorts = Array.from(mockLocalPorts).map((port: [string, Port]) => port[1]);
    const externalPorts = Array.from(mockExternalPorts).map((port: [string, Port]) => port[1]);

    for(let i = 0; i < networkActivityCount; i++) {
        const outgoing: boolean = Math.floor(Math.random() * 2) === 0 ? false : true;
        const localPortId = Math.floor(Math.random() * localPorts.length)
        const externalPortId = Math.floor(Math.random() * externalPorts.length);

        const dstPortId: string = outgoing ? externalPorts[externalPortId].id : localPorts[localPortId].id;
        const srcPortId: string = outgoing ? localPorts[localPortId].id : externalPorts[externalPortId].id;

        mockNetworkActivity.push({
            id: `network${i}`,
            timestamp: DateTime.now().minus({seconds: Math.floor(Math.random() * 1200)}).toMillis(),
            target: dstPortId,
            source: srcPortId,
            protocol: 'tcp',
            length: Math.floor((Math.random() * 10000) + 1)
        });
    }

    return mockNetworkActivity;
}

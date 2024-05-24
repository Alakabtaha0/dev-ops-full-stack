export interface NavBarProps {
    currentRegion: string;
    setCurrentRegion: React.Dispatch<React.SetStateAction<string>>;
};

// Worker types
export type BlockedKeys = {
    id: string;
    numberOfTimesBlocked: number;
    date: string;
};

export type TopKeys = {
    id: string;
    floatNumber: number;
};

export type WorkerInfo = {
    idle: string;
    recenetlyBlockedKeys: BlockedKeys[];
    timeToReturn: number;
    topKeys: TopKeys[];
    waitTime: number;
    waiting: number;
    workers: number;
};

export interface Worker {
    name: string;
    worker: WorkerInfo;
};


// Service types
export type Services = {
    activeConnections: number;
    cpuLoad: number;
    database: boolean;
    online: number;
    redis: boolean;
    region: string;
    serverCount: number;
    serverIssue: any | null;
    session: number;
    status: string;
    strict: boolean;
    timers: number;
    waitTime: number;
}
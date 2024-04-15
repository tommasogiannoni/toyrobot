export interface Robot {
    x: number,
    y: number,
    direction: string
}

export enum COMMAND {
    PLACE= "PLACE",
    MOVE= "MOVE",
    LEFT= "LEFT",
    RIGHT= "RIGHT",
    REPORT= "REPORT",
}

export enum ALERT_MSG {
    not_started = "You need to place robot before."
}
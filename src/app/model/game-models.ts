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
    INVALID= "INVALID"
}

export enum ALERT_MSG {
    not_started = "You need to place robot before.",
    invalid_input = "Input not valid!",
    out = "This command place robot out of the table! Retry"
}

//NORTH, SOUTH, EAST or WEST
export const directions = ["EAST", "SOUTH", "WEST", "NORTH"];
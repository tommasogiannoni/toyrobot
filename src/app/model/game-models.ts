export interface Robot {
    x: number,
    y: number,
    direction: string
}
export interface Alien {
    x: number,
    y: number,
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
    not_started = "You need to place the robot before.",
    invalid_input = "Input not valid!",
    out = "This command place robot out of the table! Retry",
    win = "Defeated all the aliens!",
    win_desc = "Use the command 'PLACE'  to restart the game."
}

//NORTH, SOUTH, EAST or WEST
export const directions = ["EAST", "SOUTH", "WEST", "NORTH"];
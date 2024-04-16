import { directions } from "../model/game-models";

/**
 * parse the keywords of the commad. return INVALID command if not recognized.
 * @param rawCommand 
 * @returns 
 */
export function commandParser(rawCommand: string) {
    rawCommand.trim();
    const command = rawCommand.split(" ")[0].toUpperCase();

    if( command == "MOVE" || command == "LEFT" || command == "RIGHT" || command == "REPORT")
            return command;
    else if(command == "PLACE") {
        if(!rawCommand.split(" ")[1]) 
            return "INVALID";
        return command;
    }
    
    return "INVALID"
}

/**
 * Parse the second part of the place command. return invalid commad if not parsed
 * @param rawPlace 
 * @returns 
 */
export function commandExtractPlace(rawPlace: string) {
    const values = rawPlace.split(" ")[1].split(",");

    // not typed command param
    if(values.length < 3)
        return [-1, -1, "INVALID"];

    // empty command param
    if(values.find(elem => elem == "" || elem == " ") != undefined)
        return [-1, -1, "INVALID"];

    // typed char as x or y value
    if( isNaN(Number(values[0])) || isNaN(Number(values[1])) )
        return [-1, -1, "INVALID"];

    // typed invalid direction
    if(values[2].toUpperCase() != directions[0] && values[2].toUpperCase() != directions[1] 
        && values[2].toUpperCase() != directions[2] && values[2].toUpperCase() != directions[3])
            return [-1, -1, "INVALID"];

    return [Number(values[0].trim()), Number(values[1].trim()), values[2].trim()];
}

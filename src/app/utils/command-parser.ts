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

export function commandExtractPlace(rawPlace: string) {
    const values = rawPlace.split(" ")[1].split(",");

    if(values.length < 3)
        return [-1, -1, "INVALID"];

    for(const val of values) {
        if(val == "" || val == " ")
            return [-1, -1, "INVALID"];
    }

    return [values[0].trim(), values[1].trim(), values[2].trim()];
}
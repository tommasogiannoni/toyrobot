# Toy Robot Simulator
<br/>
<img src="https://github.com/tommasogiannoni/toy-robot-app/blob/master/src/assets/img/example-image.png"></h2>
<br/>

Small toy robot game where you can move a robot inside a 5x5 matrix with interactive feedback and arcade-style graphics. 
The goal is to defeat as many aliens as you can. Each alien defeated scores 1 point.

## How to Play
To play the Toy Robot Simulator, follow these commands:

- **PLACE X,Y,DIRECTION**: Place the robot on the grid at coordinates X and Y, facing the specified direction (NORTH, WEST, EAST, SOUTH).
- **MOVE**: Move the robot one unit forward in the direction it is facing.
- **LEFT**: Rotate the robot 90 degrees to the left without changing its position.
- **RIGHT**: Rotate the robot 90 degrees to the right without changing its position.
- **REPORT**: Display the current position and direction of the robot.

Defeat aliens to score points:

- Each time you use the PLACE command, new aliens could appear on the grid.
- Defeating an alien earns you 1 point.
- Refresh the page to restart the game.

Have fun playing and see how many aliens you can defeat!

## Prerequisites
Version: [Angular CLI](https://github.com/angular/angular-cli) version 17.3.4.
Install angular: `npm install -g @angular/cli`

- node version: `v18.13.0`
- npm version: `8.19.3`

## Run Application

- git clone the project.
- go to the project root and run `npm install` to install the node_modules.
- Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`.

## Authors
Tommaso Giannoni

- [My Site](https://www.tommasogiannoni.com)
- [Linkedin](https://www.linkedin.com/in/tommasogiannoni)
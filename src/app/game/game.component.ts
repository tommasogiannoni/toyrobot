import { Component, OnInit } from '@angular/core';
import { ALERT_MSG, COMMAND, Robot, directions } from '../model/game-models';
import { commandExtractPlace, commandParser } from '../utils/command-parser';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss'
})
export class GameComponent implements OnInit{
    board!: any;
    started: boolean = false;
    robot!: Robot;
    alertMsg!: string;
    alertVisible: boolean = false;

    constructor() { }

    ngOnInit(): void {
        this.board = Array.from({ length: 5 }, () => Array.from({ length: 5 }).fill(0));;
        this.robot = {x: -1, y: -1, direction: ""};
    }

    submitCommand(input: string) {
      const commad = commandParser(input);

      switch(commad) {
        case COMMAND.PLACE:
          // if already placed reset
          if(this.robot.x != -1 && this.robot.y != -1) 
            this.board[this.robot.x][this.robot.y] = "0";
          //
          const [x, y, dir] = commandExtractPlace(input);
          
          if( dir == "INVALID" ) {
            this.showAlert(ALERT_MSG.invalid_input);
            return;
          }
          
          this.started = true; // start the game
          this.place(Number(x), Number(y), String(dir));

          break;
        case COMMAND.LEFT:
          if(!this.started) {
            this.showAlert(ALERT_MSG.not_started);
            return;
          }
          //
          this.left();
          break;
        case COMMAND.RIGHT:
          if(!this.started) {
            this.showAlert(ALERT_MSG.not_started);
            return;
          }
          //
          this.right();
          break;
        case COMMAND.MOVE:
          if(!this.started) {
            this.showAlert(ALERT_MSG.not_started);
            return;
          }
          //
          this.move();
          break;
        case COMMAND.REPORT:
          if(!this.started) {
            this.showAlert(ALERT_MSG.not_started);
            return;
          }
          //
          this.report();
          break;
        case COMMAND.INVALID: 
          this.showAlert(ALERT_MSG.invalid_input);
          break;
      }
    }

    place(x: number, y: number, direction: string) {
      if( !this.isValid(x, y) ) {
        this.showAlert(ALERT_MSG.out);
        return false;
      }

      // update the robot
      this.robot.x = Number(x), 
      this.robot.y = Number(y), 
      this.robot.direction = direction.toUpperCase();
      // place the robot
      this.board[this.robot.x][this.robot.y] = "&#129302;";
      return true;
    }

    /**
     * NORTH, SOUTH, EAST or WEST
     */
    move() {
      let placed = true;
      const direction = this.robot.direction;
      this.board[this.robot.x][this.robot.y] = "0"; // reset current position

      switch(direction) {
        case "NORTH":
          placed = this.place(this.robot.x-1, this.robot.y, this.robot.direction);
          break;
        case "SOUTH":
          placed = this.place(this.robot.x+1, this.robot.y, this.robot.direction);
          break;
        case "EAST":
          placed = this.place(this.robot.x, this.robot.y+1, this.robot.direction);
          break;
        case "WEST":
          placed =this.place(this.robot.x, this.robot.y-1, this.robot.direction);
          break;
      }

      if(!placed) // re-set previous position
        this.place(this.robot.x, this.robot.y, this.robot.direction);
    }

    left() {
      const direction = this.robot.direction;

      // change by 90 degree to the left;
      let position = directions.indexOf( direction );
      position = (position - 1 + directions.length) % directions.length;

      this.robot.direction = directions[position];
    }

    right() {
      console.log(this.robot.direction);
      const direction = this.robot.direction;

      // change by 90 degree to the right;
      let position = directions.indexOf( direction );
      position = (position + 1 + directions.length) % directions.length;

      this.robot.direction = directions[position];
    }

    report() {
      this.showAlert(`Position: ${this.robot.x},${this.robot.y} - ${this.robot.direction}`);
    }

    isValid(x: number, y: number) { 
      if( x <= this.board.length-1 && x >= 0 && y <= this.board[x].length-1 && y >= 0 )
        return true;
      return false;
    }

    showAlert(msg: string) {
      this.alertMsg = msg;
      this.alertVisible = true;
      setTimeout(() => {
        this.alertVisible = false;
      }, 3000); 
    }
}

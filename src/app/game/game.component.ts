import { Component, OnInit } from '@angular/core';
import { ALERT_MSG, COMMAND, Robot } from '../model/game-models';

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
      input.trim();
      const commad = input.split(" ")[0];

      switch(commad) {
        case COMMAND.PLACE:
          //
          this.started = true;
          const values = input.split(" ")[1].split(",");
          this.place(Number(values[0].trim()), Number(values[1].trim()), values[2].trim());

          break;
        case COMMAND.LEFT:
          if(!this.started) {
            this.alertMsg =  ALERT_MSG.not_started;
            this.showAlert();
            return;
          }
          break;
        case COMMAND.RIGHT:
          if(!this.started) {
            this.alertMsg =  ALERT_MSG.not_started;
            this.showAlert();
            return;
          }
          break;
        case COMMAND.MOVE:
          if(!this.started) {
            this.alertMsg = ALERT_MSG.not_started;
            this.showAlert();
            return;
          }

          this.move();
          break;
        case COMMAND.REPORT:
          if(!this.started) {
            this.alertMsg =  ALERT_MSG.not_started;
            this.showAlert();
            return;
          }
          break;
      }
    }

    place(x: number, y: number, direction: string) {
      if(!this.isValid(x, y)) {
        this.alertMsg = "This command place robot out of the table! Retry";
        this.showAlert();
        return;
      }
      // place the robot
      this.robot = {x: Number(x), y: Number(y), direction: direction};
      this.board[this.robot.x][this.robot.y] = "*";
    }

    /**
     * NORTH, SOUTH, EAST or WEST
     */
    move() {
      const direction = this.robot.direction;

      switch(direction) {
        case "NORTH":
          this.place(this.robot.x-1, this.robot.y, this.robot.direction);
          break;
        case "SOUTH":
          this.place(this.robot.x+1, this.robot.y, this.robot.direction);
          break;
        case "EAST":
          this.place(this.robot.x, this.robot.y+1, this.robot.direction);
          break;
        case "WEST":
          this.place(this.robot.x, this.robot.y-1, this.robot.direction);
          break;
      }
    }

    left() {

    }

    right() {

    }

    report() {

    }

    isValid(x: number, y: number) { 
      if( x > this.board.length || x < 0 ||
          y > this.board[0].length ||  y < 0)
          return false;
      return true;
    }

    showAlert() {
      this.alertVisible = true;
      setTimeout(() => {
        this.alertVisible = false;
      }, 2800); 
    }
}

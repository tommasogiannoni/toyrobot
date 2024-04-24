import { Component, OnInit } from '@angular/core';
import { ALERT_MSG, Alien, COMMAND, Robot, directions } from '../model/game-models';
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
    aliens!: Array<Alien>;
    alertMsg!: string;
    alertVisible: boolean = false;
    winAlertMsg!: string;
    winDesc!: string;
    winAlertVisible: boolean = false;
    points!: number;

    constructor() { }

    ngOnInit(): void {
        this.board = Array.from({ length: 5 }, () => Array.from({ length: 5 }).fill(0));;
        this.robot = {x: -1, y: -1, direction: ""};
        this.aliens = [];
        this.points = 0;
    }

    submitCommand(input: string) {
      const commad = commandParser(input);

      switch(commad) {
        case COMMAND.PLACE:
          // if already placed reset
          if(this.robot.x != -1 && this.robot.y != -1) 
            this.board[this.robot.x][this.robot.y] = "0";
          //
          const old_direction = this.robot.direction;
          const [x, y, dir] = commandExtractPlace(input);
          
          // if the new commad is invalid maintain old position.
          if( x==-1 || y==-1 || dir == COMMAND.INVALID ) {
            this.place(this.robot.x, this.robot.y, old_direction);
            this.showAlert(ALERT_MSG.invalid_input);
            return;
          }
          
          this.started = true; // start the game
          this.place(this.convertRow( Number(x) ), Number(y), String(dir));

          // place aliens
          this.placeAllAliens();

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

      if(this.board[x][y] == "&#128125;") { // alien encountered
        this.points += 1;
        const idx_of_aliens_to_remove = this.aliens.findIndex( elem => (elem.x == x && elem.y == y));
        this.aliens.splice(idx_of_aliens_to_remove, 1);

        if(this.aliens.length == 0) {
          this.showWinAlert();
        }
      }

      // update the robot
      this.robot.x = Number(x), 
      this.robot.y = Number(y), 
      this.robot.direction = direction.toUpperCase();
      // place the robot
      this.board[this.robot.x][this.robot.y] = "&#129302;";
      return true;
    }

    placeAllAliens() {
      const exclude_x = this.robot.x;
      const exclude_y = this.robot.y;
      const number_of_aliens = Math.floor(Math.random() * 4) + 1; 
          
      for (let i = 0; i < number_of_aliens; i++) {
        let x = -1;
        let y = -1;
      
        while (x === -1 || x === exclude_x) {
          x = Math.floor(Math.random() * 5);
        }
      
        while (y === -1 || y === exclude_y) {
          y = Math.floor(Math.random() * 5); 
        }
      
        this.aliens.push({ x: x, y: y });
        this.placeAlien(this.convertRow(Number(this.aliens[i].x)), Number(this.aliens[i].y));
      }
    }

    placeAlien(x: number, y: number) {
      console.log(x,y);
      if( !this.isValid(x, y) ) {
        this.showAlert(ALERT_MSG.out);
        return false;
      }

      // place the alien
      this.board[x][y] = "&#128125;";
      return true;
    }

    /**
     * used to invert x axis index in the matrix the first time
     * @param x 
     * @returns 
     */
    convertRow(x: number) {
      return this.board.length-1 - x;
    }

    /**
     * move the robot one unit to NORTH, SOUTH, EAST or WEST
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
    showWinAlert() {
      this.winAlertVisible = true;
      this.winAlertMsg = ALERT_MSG.win;
      this.winDesc = ALERT_MSG.win_desc;
      setTimeout(() => {
        this.winAlertVisible = false;
      }, 5000); 
    }
}

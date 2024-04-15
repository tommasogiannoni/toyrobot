import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GameComponent } from "./game/game.component";

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [RouterOutlet, GameComponent]
})
export class AppComponent {
  title = 'toy-robot-app';
}

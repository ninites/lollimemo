import { Component, OnInit } from '@angular/core';
import { GameService } from '../../../views/game/game-services/game.service';

@Component({
  selector: 'timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss'],
})
export class TimerComponent implements OnInit {
  constructor(public game: GameService) {}

  ngOnInit(): void {
   
  }
}

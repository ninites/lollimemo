import { Component, Input, OnInit } from '@angular/core';
import { Player } from 'src/app/interface/interface';
import { GameService } from '../game-services/game.service';

@Component({
  selector: 'player-info',
  templateUrl: './player-info.component.html',
  styleUrls: ['./player-info.component.scss'],
})
export class PlayerInfoComponent implements OnInit {
  @Input() player?: Player;
  @Input() index: number = 0;

  constructor(public game: GameService) {}

  ngOnInit(): void {}
}

import { Component, Input, OnInit } from '@angular/core';
import { GamePlayed } from '../played.interface';

@Component({
  selector: 'played-item',
  templateUrl: './played-item.component.html',
  styleUrls: ['./played-item.component.scss'],
})
export class PlayedItemComponent implements OnInit {
  @Input() game: GamePlayed = {} as GamePlayed;

  constructor() {}

  ngOnInit(): void {
    console.log(this.game);
    
  }
}

import { Component, OnInit } from '@angular/core';
import { GameParametersService } from 'src/app/core/services/game-parameters.service';
import { SetupService } from '../setup-service/setup.service';

@Component({
  selector: 'app-number-of-players',
  templateUrl: './number-of-players.component.html',
  styleUrls: ['./number-of-players.component.scss'],
})
export class NumberOfPlayersComponent implements OnInit {
  constructor(
    private gameParams: GameParametersService,
    private setupServ: SetupService
  ) {}

  numberChoice: number[] = [1, 2];
  usersChoice: boolean[] = [false, false];

  ngOnInit(): void {
    this.setPlayerNumber(this.gameParams.numberOfPlayer);
    this.setupServ.setIndexInChildren();
  }

  setPlayerNumber(choice: number): void {
    this.usersChoice.forEach((button, index) => {
      if (index === choice - 1) {
        this.usersChoice[index] = true;
      } else {
        this.usersChoice[index] = false;
      }
    });
  }

  selectNumberOfPlayer(choice: number): void {
    this.gameParams.setNumberOfPlayers(choice);
    this.setPlayerNumber(choice);
  }
}

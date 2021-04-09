import { Injectable } from '@angular/core';
import { Player } from '../../interface/interface';

@Injectable({
  providedIn: 'root',
})
export class GameParametersService {
  selectedDifficulty: number = 5;
  selectedDifficultyString: string = '';
  players: Player[] = [];
  numberOfPlayer: number = 1;

  constructor() {}

  setDifficulty(diff: string) {
    this.selectedDifficultyString = diff;
    if (diff === 'facile') {
      this.selectedDifficulty = 5;
      return;
    }
    if (diff === 'normal') {
      this.selectedDifficulty = 10;
      return;
    }
    this.selectedDifficulty = 0;
  }

  setNumberOfPlayers(number: number): void {
    this.numberOfPlayer = number;
  }

  modifyUserName(index: number, newName: string): void {
    this.players[index].username = newName;
  }

  postPlayerName(name: string): void {
    this.players = [...this.players, { username: name, totalPoints: 0 }];
  }

  addPointToPlayer(index: number) {
    this.players[index].totalPoints += 1;
  }

  gameParamsValidation(): { [key: string]: string } {
    const gameParameters = {
      diff: this.selectedDifficulty,
      players: this.players,
      numberOfplayer: this.numberOfPlayer,
    };

    const errors: { [key: string]: string } = {};

    for (const key in gameParameters) {
      const message = 'Merci de renseigner ';
      switch (key) {
        case 'diff':
          if (gameParameters[key] === 0)
            errors[key] = message + 'la difficulté';
          break;
        case 'players':
          if (gameParameters[key].length === 0)
            errors[key] = message + 'le nom du ou des joueurs';
          break;

        default:
          break;
      }
    }
    return errors;
  }

  resetParams(): void {
    this.players = [];
    this.selectedDifficulty = 0;
    this.selectedDifficultyString = '';
    this.numberOfPlayer = 1;
  }
}

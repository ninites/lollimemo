import { Injectable } from '@angular/core';
import { Player } from '../../interface/interface';

@Injectable({
  providedIn: 'root',
})
export class GameParametersService {
  selectedDifficulty: number = 0;
  selectedDifficultyString: string = '';
  players: Player[] = [];
  numberOfPlayer: number = 1;
  selectedTheme: { [key: string]: any } = {};
  constructor() {}

  setDifficulty(diff: string) {
    this.selectedDifficultyString = diff;
    if (diff === 'facile') {
      this.selectedDifficulty = 6;
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

  setTheme(theme: {}): void {    
    this.selectedTheme = {...theme};    
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
    this.players = this.players.slice(0, this.numberOfPlayer);
    
    const gameParameters = {
      difficulty: this.selectedDifficulty,
      names: this.players,
      players: this.numberOfPlayer,
      themes: this.selectedTheme,
    };
    
    const errors: { [key: string]: string } = {};
   
    for (const key in gameParameters) {
      const message = 'Merci de renseigner ';
      switch (key) {
        case 'difficulty':
          if (gameParameters[key] === 0)
            errors[key] = message + 'la difficulté';
          break;
        case 'names':
          if (gameParameters[key].length !== this.numberOfPlayer)
            errors[key] = message + 'le nom du ou des joueurs';
          break;
        case 'themes':
          if (Object.keys(gameParameters[key]).length === 0)
            errors[key] = message + 'un theme';
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

  resetScore(): void {
    this.players.forEach((player) => (player.totalPoints = 0));
  }
}

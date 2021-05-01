import { Injectable } from '@angular/core';
import { GameParametersService } from 'src/app/core/services/game-parameters.service';
import { AlertService } from 'src/app/shared/top/alert/alert.service';
import { TimerService } from 'src/app/shared/widget/timer/timer.service';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  constructor(
    private gameParams: GameParametersService,
    private alert: AlertService,
    private timer: TimerService
  ) {}

  onTurnTry: number = 0;
  turnTry: string[] = [];
  alreadyDiscovered: string[] = [];
  alreadyOpened: string[] = [];
  numberOftries: number = 0;
  playerIndexTurn: number = 0;

  addTurnTry(ids: { [key: string]: any }): string | undefined {
    const { unique, id } = ids;
    if (this.alreadyOpened.includes(unique)) return;
    this.alreadyOpened.push(unique);
    this.onTurnTry += 1;
    this.turnTry.push(id);
    if (this.onTurnTry < 2) return;
    this.numberOftries += 1;
    return this.checkCombinaison();
  }

  checkCombinaison(): string | undefined {
    const [a, b] = this.turnTry;
    const multiplayer = this.gameParams.players.length > 1;
    if (a === b) {
      this.alreadyDiscovered.push(a);

      if (multiplayer) this.gameParams.addPointToPlayer(this.playerIndexTurn);

      const winCondition =
        this.alreadyDiscovered.length === this.gameParams.selectedDifficulty;
      debugger
      if (winCondition) {
        this.timer.setTimer(true);
        return 'win';
      }

      this.reset();
      return;
    }
    if (multiplayer) this.changePlayerTurn();
    this.reset();
    return 'close';
  }

  messageToPlayer(): void {
    this.alert.message = `Au tour de ${
      this.gameParams.players[this.playerIndexTurn].username
    } de jouer`;
    this.alert.switchAlert();
  }

  changePlayerTurn(): void {
    if (this.playerIndexTurn < this.gameParams.players.length)
      this.playerIndexTurn++;

    if (this.playerIndexTurn === this.gameParams.players.length)
      this.playerIndexTurn = 0;

    this.messageToPlayer();
  }

  reset() {
    this.onTurnTry = 0;
    this.turnTry = [];
    this.alreadyOpened = [];
  }

  hardReset() {
    this.reset();
    this.alreadyDiscovered = [];
    this.numberOftries = 0;
    this.timer.resetTimer();

    this.gameParams.players.forEach((player) => {
      player.totalPoints = 0;
    });
  }

  getNumberOfTries(): number {
    return this.numberOftries;
  }
}

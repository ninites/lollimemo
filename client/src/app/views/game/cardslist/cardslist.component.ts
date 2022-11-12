import { Component, OnInit } from '@angular/core';
import { GameService } from '../game-services/game.service';
import { Picture, Player } from '../../../interface/interface';
import { RegPopService } from '../../../shared/widget/reg-pop/reg-pop.service';
import { GameParametersService } from 'src/app/core/services/game-parameters.service';
import { TimerService } from 'src/app/shared/widget/timer/timer.service';
import { RequestService } from 'src/app/core/services/request/request.service';
import { environment } from 'src/environments/environment';
import { BigSpinnerService } from 'src/app/shared/top/big-spinner/big-spinner.service';

@Component({
  selector: 'app-cardslist',
  templateUrl: './cardslist.component.html',
  styleUrls: ['./cardslist.component.scss'],
})
export class CardslistComponent implements OnInit {
  constructor(
    private request: RequestService,
    private game: GameService,
    private gameParams: GameParametersService,
    public regPopService: RegPopService,
    private timer: TimerService,
    private bigSpinner: BigSpinnerService
  ) { }

  cardsList: Picture[] = [];
  isFlipping: boolean = false;
  players: Player[] = [];
  multi: boolean = false;
  interval: any;
  themeName: string = '';
  cardBack: string = '';
  winner: { [key: string]: any } = {};
  draw: boolean = false;

  ngOnInit(): void {
    this.bigSpinner.show('cardsList');
    this.startGame();
    this.players = this.gameParams.players;
    this.multi = this.gameParams.players.length > 1;
    this.themeName = this.gameParams.selectedTheme.name;
  }

  startGame() {
    this.timer.setTimer(false);
    const selectedTheme = this.gameParams.selectedTheme._id;
    const diff = this.gameParams.selectedDifficulty;
    if (selectedTheme) {
      this.request.getThemePics(diff, selectedTheme).subscribe({
        next: (resp) => {
          this.cardsList = resp;
          this.bigSpinner.hide('cardsList');
        },
        error: (error) => {
          console.log(error);
          this.bigSpinner.hide('cardsList');
        }
      });

      const cardBack = this.gameParams.selectedTheme.images.filter(
        (img: any) => img.type === 'cardBack'
      );
      this.cardBack = cardBack[0].path;
    } else {
      this.request.getDefaultTheme(diff).subscribe({
        next: (resp): void => {
          this.cardsList = resp;
          this.bigSpinner.hide('cardsList');
        },
        error: (error) => {
          console.log(error);
          this.bigSpinner.hide('cardsList');
        }
      });
    }
  }

  reset() {
    this.game.hardReset();
    this.closeCards();
    this.startGame();
    this.winner = {};
    this.draw = false;
  }

  closeCards(): void {
    this.cardsList.forEach((card) => {
      if (this.game.alreadyDiscovered.includes(card.id)) {
        card.displayed = true;
      } else {
        card.displayed = false;
      }
    });
  }

  openCard(unique: number): void {
    this.cardsList.forEach((card) => {
      if (card.uniqueId === unique) {
        card.displayed = true;
      }
    });
  }

  async displayCard(ids: { [key: string]: any }) {
    if (this.isFlipping) return;
    this.openCard(ids.unique);
    const gameStatus = this.game.addTurnTry(ids);
    if (gameStatus === 'win') {
      this.saveGame();
      this.interval = setTimeout(() => {
        this.setWinner();
        this.regPopService.switchModal();
      }, 800);
    }
    if (gameStatus === 'close') {
      this.isFlipping = true;
      await new Promise((resolve, reject) => {
        this.interval = setTimeout(() => {
          resolve(this.closeCards());
        }, 1000);
      });
      this.isFlipping = false;
    }
  }

  setWinner() {
    const score = this.gameParams.players.map((player) => {
      const { totalPoints } = player;
      return totalPoints;
    });

    this.draw = score.every((value) => value === score[0]);
    const winner = this.gameParams.players.reduce((max: any, val: any) => {
      return max.totalPoints > val.totalPoints ? max : val;
    });
    this.winner = winner;
  }

  saveGame(): void {
    const { players, selectedDifficultyString } = this.gameParams;
    const type = players.length > 1 ? 'multi' : 'solo';
    const isMulti = type === 'multi';
    const { minutes, seconds } = this.timer;
    const gameTime = `${minutes}:${seconds}`;
    const savedGame = {
      type: type,
      try: this.game.numberOftries,
      userScore: players[0].totalPoints,
      opponent: isMulti ? players[1].username : '',
      opponentScore: isMulti ? players[1].totalPoints : 0,
      time: gameTime,
      difficulty: selectedDifficultyString,
      date: new Date(),
    };

    this.request.post('games', savedGame).subscribe();
  }

  ngOnDestroy() {
    clearTimeout(this.interval);
    this.timer.resetTimer();
    this.game.hardReset();
  }
}

import { Component, OnInit } from '@angular/core';
import { GameService } from '../game-services/game.service';
import { Picture, Player } from '../../../interface/interface';
import { ModalService } from '../../../shared/widget/modal/modal.service';
import { GameParametersService } from 'src/app/core/services/game-parameters.service';
import { TimerService } from 'src/app/shared/widget/timer/timer.service';
import { RequestService } from 'src/app/core/services/request/request.service';

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
    public modalSrv: ModalService,
    private timer: TimerService
  ) {}

  cardsList: Picture[] = [];
  isFlipping: boolean = false;
  players: Player[] = [];
  multi: boolean = false;
  interval: any;

  ngOnInit(): void {
    this.startGame();
    this.players = this.gameParams.players;
    this.multi = this.gameParams.players.length > 1;
  }

  startGame() {
    this.timer.setTimer(false);

    this.request.getPictures(this.gameParams.selectedDifficulty).subscribe({
      next: (resp): void => {
        this.cardsList = resp;
      },
    });
  }

  reset() {
    this.game.hardReset();
    this.closeCards();
    this.startGame();
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
    if (gameStatus === 'win')
      this.interval = setTimeout(() => this.modalSrv.switchModal(), 800);
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

  ngOnDestroy() {
    clearTimeout(this.interval);
    this.timer.resetTimer()
  }
}

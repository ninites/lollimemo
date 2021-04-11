import { Component, OnInit } from '@angular/core';
import { GameParametersService } from 'src/app/core/services/game-parameters.service';
import { AlertService } from 'src/app/shared/top/alert/alert.service';
import { SetupService } from '../setup-service/setup.service';

@Component({
  selector: 'app-difficulty',
  templateUrl: './difficulty.component.html',
  styleUrls: ['./difficulty.component.scss'],
})
export class DifficultyComponent implements OnInit {
  difficulty: string[] = ['facile', 'normal'];
  diffChoice: string = '';
  needConfirmation: boolean = false;

  constructor(
    private setupServ: SetupService,
    public gameParams: GameParametersService,
    private alert: AlertService
  ) {}

  ngOnInit(): void {
    this.setupServ.setIndexInChildren();
    this.diffChoice = this.gameParams.selectedDifficultyString;
  }

  onChange(value: string): void {
    if (value !== this.gameParams.selectedDifficultyString) {
      this.needConfirmation = true;
    } else {
      this.needConfirmation = false;
    }
  }

  setDifficulty(): void {
    this.needConfirmation = false;
    this.gameParams.setDifficulty(this.diffChoice);
    this.alert.message = `Difficulté selectionné : ${this.diffChoice}`;
    this.alert.switchAlert();
  }
}

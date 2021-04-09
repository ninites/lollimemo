import { Component, OnInit } from '@angular/core';
import { GameParametersService } from 'src/app/core/services/game-parameters.service';
import { SetupService } from '../setup-service/setup.service';

@Component({
  selector: 'app-difficulty',
  templateUrl: './difficulty.component.html',
  styleUrls: ['./difficulty.component.scss'],
})
export class DifficultyComponent implements OnInit {
  difficulty: string[] = ['facile', 'normal'];
  diffChoice: string = '';

  constructor(
    private setupServ: SetupService,
    private gameParams: GameParametersService
  ) {}

  ngOnInit(): void {
    this.setupServ.setIndexInChildren();

    this.diffChoice = this.gameParams.selectedDifficultyString;
  }

  setDifficulty(): void {
    this.gameParams.setDifficulty(this.diffChoice);
  }
}

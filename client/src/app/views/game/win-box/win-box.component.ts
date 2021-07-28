import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { GameService } from '../game-services/game.service';
import { GameParametersService } from 'src/app/core/services/game-parameters.service';
import { Router } from '@angular/router';
import { TimerService } from 'src/app/shared/widget/timer/timer.service';
import { popAnim } from 'src/app/animations/animations';
import { RegPopService } from 'src/app/shared/widget/reg-pop/reg-pop.service';

@Component({
  selector: 'win-box',
  templateUrl: './win-box.component.html',
  styleUrls: ['./win-box.component.scss'],
  animations: [popAnim],
})
export class WinBoxComponent implements OnInit {
  constructor(
    public game: GameService,
    private regPopService: RegPopService,
    private gameParams: GameParametersService,
    private router: Router,
    public timer: TimerService
  ) {}
  @Input() winner: { [key: string]: any } = {};
  @Input() draw: boolean = false;
  @Output() restartChange = new EventEmitter();
  multi: boolean = false;

  ngOnInit(): void {
    this.multi = this.gameParams.players.length > 1;
  }

  restart(): void {
    this.regPopService.switchModal();
    this.restartChange.emit();
  }

  restartAndChangeParams() {
    this.regPopService.switchModal();
    setTimeout(() => {
      this.gameParams.resetScore();
      this.router.navigate(['/setup']);
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { popAnim } from 'src/app/animations/animations';
import { GameParametersService } from 'src/app/core/services/game-parameters.service';

@Component({
  selector: 'nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
  animations:[popAnim]
})
export class NavBarComponent implements OnInit {
  constructor(
    private router: Router,
    private gameParams: GameParametersService
  ) {}

  isDisplayed: boolean = false;

  ngOnInit(): void {}

  goHome() {
    this.gameParams.resetScore();
    this.router.navigate(['/setup']);
  }
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GameParametersService } from 'src/app/core/services/game-parameters.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(
    private router: Router,
    private gameParams: GameParametersService
  ) {}

  ngOnInit(): void {}

  goHome() {
    this.gameParams.resetScore();
    this.router.navigate(['/setup']);
  }
}

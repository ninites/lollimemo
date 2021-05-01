import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { menuPop } from 'src/app/animations/animations';
import { AuthentificationService } from 'src/app/core/services/auth/authentification.service';
import { GameParametersService } from 'src/app/core/services/game-parameters.service';

@Component({
  selector: 'nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
  animations: [menuPop],
})
export class NavBarComponent implements OnInit {
  constructor(
    private router: Router,
    private gameParams: GameParametersService,
    private auth: AuthentificationService
  ) {}

  isDisplayed: boolean = false;
  isAuth = false;

  ngOnInit(): void {
    this.auth.isAuth$.subscribe((resp) => {
      this.isAuth = resp;
    });
  }

  goHome() {
    this.gameParams.resetScore();
    this.router.navigate(['/setup']);
  }

  logOut(): void {
    this.auth.clearToken();
    this.router.navigate(['/']);
  }
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { opacityAnim } from 'src/app/animations/animations';
import { AuthentificationService } from 'src/app/core/services/auth/authentification.service';
import { GameParametersService } from 'src/app/core/services/game-parameters.service';

@Component({
  selector: 'nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
  animations: [opacityAnim],
})
export class NavBarComponent implements OnInit {
  constructor(
    private router: Router,
    private gameParams: GameParametersService,
    private auth: AuthentificationService
  ) {}

  isDisplayed: boolean = false;
  isAuth = false;
  displayProfile: boolean = false;

  ngOnInit(): void {
    this.auth.isAuth$.subscribe((resp) => {
      this.isAuth = resp;
    });
  }

  logOut(): void {
    this.gameParams.resetParams();
    this.auth.clearToken();
    this.router.navigate(['/']);
  }
}

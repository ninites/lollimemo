import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { GameParametersService } from 'src/app/core/services/game-parameters.service';

@Injectable({
  providedIn: 'root',
})
export class GameParamsValidGuard implements CanActivate {
  constructor(
    private gameParams: GameParametersService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const status = this.gameParams.gameParamsValidation();
    if (Object.keys(status).length !== 0) {
      this.router.navigate(['/setup']);
      return false;
    }

    return true;
  }
}

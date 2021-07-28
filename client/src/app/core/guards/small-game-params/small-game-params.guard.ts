import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  UrlTree,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { GameParametersService } from '../../services/game-parameters.service';

@Injectable({
  providedIn: 'root',
})
export class SmallGameParamsGuard implements CanActivate {
  constructor(
    private gameParams: GameParametersService,
    private router: Router
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    routerSnap: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const { routeConfig } = route.data;
    const { url } = routerSnap;
    const actualRoute = url.split('/')[2];
    const gameParamsError = this.gameParams.gameParamsValidation();
    let previousRoad: string = '';
    routeConfig.forEach((road: any, index: number) => {
      if (road === actualRoute) {
        previousRoad = routeConfig[index - 1];
      }
    });

    if (previousRoad) {
      const routeMissingValues = gameParamsError.hasOwnProperty(previousRoad);
      if (routeMissingValues) {
        this.router.navigate([`/setup/${previousRoad}`]);
      }
    }

    return true;
  }
}

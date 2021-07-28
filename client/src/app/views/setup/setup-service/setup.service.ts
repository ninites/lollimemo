import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { GameParametersService } from 'src/app/core/services/game-parameters.service';

@Injectable({
  providedIn: 'root',
})
export class SetupService {
  constructor(
    private router: Router,
    private gameParams: GameParametersService
  ) {}

  displayStartButton: boolean = false;
  disableButtons: boolean[] = [false, false];
  disableDots: boolean[] = [];
  childIndex: number = 0;
  routeConfig = [];

  setRouteConfig(config: any): void {
    this.routeConfig = config;
  }

  setChildIndex(number: number): void {
    this.childIndex = number;
  }

  setDisableDots(): void {
    const disableList = this.gameParams.gameParamsValidation();
    let indexToDisableResult = 99;
    Object.keys(disableList).forEach((key, index) => {
      const indexToDisable = this.routeConfig.findIndex(
        (route: any) => route.path === key
      );
      if (indexToDisable < indexToDisableResult)
        indexToDisableResult = indexToDisable;
    });
    for (let index = 0; index < this.routeConfig.length; index++) {
      this.disableDots[index] = index > indexToDisableResult && true;
    }
  }

  setDots(): void {
    this.disableDots = [];
    for (let index = 0; index < this.routeConfig.length; index++) {
      this.disableDots = [...this.disableDots, index === 0 ? false : true];
    }
    this.setDisableDots();
  }

  setDisableButtons(array: boolean[]): void {
    this.disableButtons = array;
  }

  setIndexInChildren(): void {
    const actualPage = this.router.url.split('/')[2];
    this.routeConfig.forEach((routes: any, index: number) => {
      if (routes.path === actualPage) this.childIndex = index;
    });
    this.displayPathButton();
  }

  displayPathButton(): void {
    const isFirst = this.childIndex === 0;
    const isLast = this.childIndex === this.routeConfig.length - 1;
    if (isFirst) this.setDisableButtons([true, false]);
    if (isLast) {
      this.setDisableButtons([false, true]);
      this.displayStartButton = true;
      return;
    }
    if (!isFirst && !isLast) this.setDisableButtons([false, false]);
    this.displayStartButton = false;
  }
}

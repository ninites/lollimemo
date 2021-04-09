import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  constructor() {}

  isDisplayed: boolean = false;
  message: string = '';

  closeTimeout: any;

  closeOnTimeOut(): void {
    this.closeTimeout = setTimeout(() => {

      this.isDisplayed = false;
    }, 2000);
  }

  switchAlert() {
    this.isDisplayed = !this.isDisplayed;
    if (this.isDisplayed) this.closeOnTimeOut();
  }
}

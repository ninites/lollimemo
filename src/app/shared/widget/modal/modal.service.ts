import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  constructor() {}

  isDisplayed: boolean = false;

  switchModal(): void {
    this.isDisplayed = !this.isDisplayed;
  }
}

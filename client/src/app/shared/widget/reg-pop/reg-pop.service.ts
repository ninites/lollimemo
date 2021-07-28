import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RegPopService {
  constructor() {}

  private isDisplayed: BehaviorSubject<any> = new BehaviorSubject(null);

  switchModal(): void {
    this.isDisplayed.next(!this.isDisplayed.value);
  }

  getRegPopDisplay(): BehaviorSubject<boolean> {
    return this.isDisplayed;
  }
}

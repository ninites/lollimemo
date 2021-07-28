import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  constructor(@Inject(DOCUMENT) private document: Document) {}

  isDisplayed: boolean = false;
  message: string = '';
  topValue$: BehaviorSubject<number> = new BehaviorSubject(0)

  closeTimeout: any;

  closeOnTimeOut(): void {
    this.closeTimeout = setTimeout(() => {
      this.isDisplayed = false;
    }, 2000);
  }

  switchAlert() {
    this.isDisplayed = !this.isDisplayed;
    if (this.isDisplayed) {
      this.topValue$.next(this.document.body.scrollTop)
      this.closeOnTimeOut()
    }
  }
}

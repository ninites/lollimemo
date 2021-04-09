import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TimerService {
  constructor() {}
  minutes: string = '00';
  seconds: string = '00';
  interval: any;

  setTimer(stop: boolean): void {
    if (stop) {
      clearInterval(this.interval);
      return;
    }
    this.interval = setInterval(() => {
      this.seconds = this.incrTimer(this.seconds);
      if (parseInt(this.seconds) >= 59) {
        this.minutes = this.incrTimer(this.minutes);
        this.seconds = '00';
      }
    }, 1000);
  }

  incrTimer(value: string): string {
    const numSecond = parseInt(value) + 1;
    return numSecond < 10
      ? (value = '0' + numSecond)
      : (value = numSecond.toString());
  }

  resetTimer(): void {
    this.minutes = '00';
    this.seconds = '00';
    this.setTimer(true);
  }
}

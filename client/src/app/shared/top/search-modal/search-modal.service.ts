import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SearchModalService {
  constructor() {}

  isDisplayed$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  info$: BehaviorSubject<{ [key: string]: any }> = new BehaviorSubject({});

  switch(): void {
    this.isDisplayed$.next(!this.isDisplayed$.value);
  }

  setInfo(data: any): void {
    this.info$.next({
      ...data,
    });
    this.switch();
  }
}

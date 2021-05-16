import { Injectable } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CropModalService {
  constructor() {}

  isDisplayed$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  info$: BehaviorSubject<{ [key: string]: any }> = new BehaviorSubject({});
  results$: BehaviorSubject<any> = new BehaviorSubject('');

  private props: { [key: string]: any } = {
    opacity: 0.9,
    closeOnClick: true,
  };

  switch(): void {
    this.isDisplayed$.next(!this.isDisplayed$.value);
  }

  setInfo(data: any): void {
    const { parentForm, props } = data;
    this.info$.next({
      parentForm: { ...parentForm },
      props: { ...this.props, ...props },
    });
  }
}

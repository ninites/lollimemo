import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CropProps } from './interface';

@Injectable({
  providedIn: 'root',
})
export class CropModalService {
  constructor() {}

  isDisplayed$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  info$: BehaviorSubject<{ [key: string]: any }> = new BehaviorSubject({});

  private props: CropProps = {
    type: '',
    result: () => {
      return { type: '', payload: {} };
    },
    pictures: [],
    opacity: 0.9,
    closeOnClick: true,
  };

  switch(): void {
    this.isDisplayed$.next(!this.isDisplayed$.value);
  }

  setInfo(data: any): void {
    const { props } = data;
    this.info$.next({
      props: { ...this.props, ...props },
    });
    this.switch();
  }
}

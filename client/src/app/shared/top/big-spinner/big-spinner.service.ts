import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BigSpinnerService {
  constructor() {}

  private pending$: BehaviorSubject<any> = new BehaviorSubject([]);

  show(name: string): void {
    const actualList = this.pending$.value;
    this.pending$.next([...actualList, name]);
  }

  hide(name: string): void {
    const actualList = this.pending$.value;
    const result = actualList.filter(
      (pendingName: string) => pendingName !== name
    );
    this.pending$.next(result);
  }

  get listen(): BehaviorSubject<string[]> {
    return this.pending$;
  }
}

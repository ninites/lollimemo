import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { BigSpinnerService } from 'src/app/shared/top/big-spinner/big-spinner.service';
import { CoreModule } from '../../core.module';
import { RequestService } from '../request/request.service';

@Injectable({
  providedIn: 'root',
})
export class AuthentificationService {
  constructor(
    private requestAx: RequestService,
    private router: Router,
    private bigSpinner: BigSpinnerService
  ) {}

  isAuth$: BehaviorSubject<any> = new BehaviorSubject(null);

  clearToken(): void {
    localStorage.removeItem('accesToken');
    this.isAuth$.next(false);
  }

  resolveAuth(): Observable<any> {
    this.bigSpinner.show('authResolve');
    return this.requestAx.get('users/auth').pipe(
      catchError(() => {
        return of(false);
      }),
      map((resp) => {
        this.isAuth$.next(resp && true);
        this.bigSpinner.hide('authResolve');
        return resp && true;
      })
    );
  }

  checkAuth(): Observable<any> {
    this.bigSpinner.show('authCheck');
    return this.requestAx.get('users/auth').pipe(
      catchError((err) => {
        this.isAuth$.next(false);
        this.router.navigate(['/user/login']);
        return throwError(err);
      }),
      map((resp: any) => {
        this.isAuth$.next(resp);
        this.bigSpinner.hide('authCheck');
        return resp;
      })
    );
  }
}

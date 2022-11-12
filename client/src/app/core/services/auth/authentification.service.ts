import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { BigSpinnerService } from 'src/app/shared/top/big-spinner/big-spinner.service';
import { RequestService } from '../request/request.service';
import { UsersService } from '../users/users.service';

@Injectable({
  providedIn: 'root',
})
export class AuthentificationService {
  constructor(
    private requestAx: RequestService,
    private router: Router,
    private bigSpinner: BigSpinnerService,
    private readonly usersService: UsersService
  ) { }

  isAuth$: BehaviorSubject<any> = new BehaviorSubject(null);

  clearToken(): void {
    localStorage.removeItem('accesToken');
    this.isAuth$.next(false);
  }

  resolveAuth(): Observable<any> {
    this.bigSpinner.show('authResolve');
    return this.requestAx.get('users/auth').pipe(
      catchError(() => {
        this.bigSpinner.hide('authResolve');
        return of(false);
      }),
      switchMap((resp) => {
        this.isAuth$.next(resp && true);
        const result$ = resp && true ? this.usersService.getMainUser().pipe(
          map(() => true)
        ) : of(resp && true)
        this.bigSpinner.hide('authResolve');
        return result$;
      })
    );
  }

  checkAuth(): Observable<any> {
    this.bigSpinner.show('authCheck');
    return this.requestAx.get('users/auth').pipe(
      catchError((err) => {
        this.isAuth$.next(false);
        this.bigSpinner.hide('authCheck');
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

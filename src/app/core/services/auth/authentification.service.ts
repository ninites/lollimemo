import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { CoreModule } from '../../core.module';
import { RequestService } from '../request/request.service';

@Injectable({
  providedIn: CoreModule,
})
export class AuthentificationService {
  constructor(private requestAx: RequestService, private router: Router) {}

  isAuth$: BehaviorSubject<any> = new BehaviorSubject(null);

  clearToken(): void {
    localStorage.removeItem('accesToken');
    this.isAuth$.next(false);
  }

  resolveAuth(): Observable<any> {
    return this.requestAx.get('users/auth').pipe(
      catchError(() => {
        return of(false);
      }),
      map((resp) => {
        this.isAuth$.next(resp && true);
        return resp && true;
      })
    );
  }

  checkAuth(): Observable<any> {
    return this.requestAx.get('users/auth').pipe(
      catchError((err) => {
        this.isAuth$.next(false);
        this.router.navigate(['/user/login']);
        return throwError(err);
      }),
      map((resp: any) => {
        this.isAuth$.next(resp);
        return resp;
      })
    );
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, concatAll, map, mergeMap, toArray } from 'rxjs/operators';
import { Picture } from 'src/app/interface/interface';
import { AlertService } from 'src/app/shared/top/alert/alert.service';
import { environment } from 'src/environments/environment';
import { CoreModule } from '../../core.module';

export interface Token {
  accesToken: string;
}

@Injectable({
  providedIn: CoreModule,
})
export class RequestService {
  constructor(private alert: AlertService, private http: HttpClient) {}

  apiUrl: string = 'https://picsum.photos/v2/list';

  getPictures(picturesNumber: number): Observable<Picture[]> {
    const pages: number = Math.floor(Math.random() * 99);
    const picturesObs = this.http
      .get<Picture[]>(`${this.apiUrl}?page=${pages}&limit=${picturesNumber}`)
      .pipe(
        mergeMap((data) => data),
        map((pic: Picture) => {
          const picCopy = { ...pic };
          pic.displayed = false;
          return [pic, picCopy];
        }),
        concatAll(),
        map((pic: any, index: number) => {
          pic.uniqueId = index;
          return pic;
        }),
        toArray(),
        map((pics) => {
          pics.sort(() => Math.random() - 0.5);
          return pics;
        })
      );
    return picturesObs;
  }

  post(endpoint: string, payload: { [key: string]: any }): Observable<any> {
    const result = this.http.post(environment.proxy + endpoint, payload).pipe(
      catchError((err) => {
        this.errorHandler(err);
        return throwError(err);
      }),
      map((response: { [key: string]: string } | any) => {
        if (response.accesToken) {
          localStorage.setItem('accesToken', JSON.stringify(response));
        }
        return response;
      })
    );
    return result;
  }

  delete(endpoit: string): Observable<any> {
    const result = this.http.delete(environment.proxy + endpoit).pipe(
      catchError((err) => {
        this.errorHandler(err);
        return throwError(err);
      })
    );
    return result;
  }

  get(endpoint: string): Observable<any> {
    const result = this.http.get(environment.proxy + endpoint).pipe(
      catchError((err) => {
        this.errorHandler(err);
        return throwError(err);
      })
    );
    return result;
  }

  errorHandler(err: any): void {
    this.alert.message = 'Erreur au niveau de la requete';
    // this.alert.switchAlert();
  }
}

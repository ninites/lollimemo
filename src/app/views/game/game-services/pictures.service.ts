import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { concatAll, map, mergeMap, tap, toArray } from 'rxjs/operators';
import { Picture } from '../../../interface/interface';

@Injectable({
  providedIn: 'root',
})
export class PicturesService {
  constructor(private http: HttpClient) {}

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
}

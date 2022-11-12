import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { UserInfo } from 'src/app/views/user/user.interface';
import { AuthentificationService } from '../auth/authentification.service';
import { RequestService } from '../request/request.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(
    private readonly requestService: RequestService,
  ) { }

  private readonly otherUserSubject$: BehaviorSubject<UserInfo> = new BehaviorSubject({} as UserInfo)
  private readonly mainUserSubject$: BehaviorSubject<UserInfo> = new BehaviorSubject({} as UserInfo)
  private readonly usersSubject$: BehaviorSubject<{ mainUser: UserInfo, otherUser: UserInfo }> = new BehaviorSubject({} as { mainUser: UserInfo, otherUser: UserInfo })

  get otherUser$(): Observable<UserInfo> {
    return this.otherUserSubject$.asObservable()
  }

  get otherUserValue(): UserInfo {
    return this.otherUserSubject$.value
  }

  set otherUser(user: UserInfo) {
    this.otherUserSubject$.next(user)
  }

  get mainUser$(): Observable<UserInfo> {
    return this.mainUserSubject$.asObservable()
  }

  get mainUserValue(): UserInfo {
    return this.mainUserSubject$.value
  }

  set mainUser(user: UserInfo) {
    this.mainUserSubject$.next(user)
  }

  get users() {
    return this.usersSubject$.value
  }

  getUsers(): Observable<{ mainUser: UserInfo, otherUser: UserInfo }> {
    return this.mainUser$.pipe(
      switchMap((mainUser: UserInfo) => {
        const gotOtherUser = Object.keys(this.otherUserValue).length > 0
        if (!gotOtherUser) {
          return of({ mainUser, otherUser: {} as UserInfo })
        }
        return this.otherUser$.pipe(
          map((otherUser: UserInfo) => {
            const result = { mainUser, otherUser }
            this.usersSubject$.next(result)
            return result
          })
        )
      })
    )
  }

  getMainUser() {
    return this.requestService.get('users/info').pipe(
      tap((userInfo: UserInfo) => {
        this.mainUser = userInfo
      })
    )
  }

  getUsersThemes() {
    return this.requestService.get('themes/all').pipe(
      switchMap((mainUserThemes) => {
        const gotOtherUserLoggged = Object.keys(this.otherUserValue).length > 0
        if (!gotOtherUserLoggged) {
          return of({ mainUserThemes, otherUserThemes: [] })
        }

        return this.requestService.get(`themes/user/${this.otherUserValue._id}/all`).pipe(
          map((otherUserThemes) => {
            return { mainUserThemes, otherUserThemes }
          })
        )
      })
    )
  }

}

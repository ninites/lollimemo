import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { alertLeft, popAnim } from 'src/app/animations/animations';
import { RequestService } from 'src/app/core/services/request/request.service';
import { UserInfo } from '../../../user.interface';
import { GamePlayed } from '../played.interface';

@Component({
  selector: 'app-played-main',
  templateUrl: './played-main.component.html',
  styleUrls: ['./played-main.component.scss'],
  animations: [alertLeft],
})
export class PlayedMainComponent implements OnInit {
  constructor(
    private request: RequestService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  queryParams: { [key: string]: any } = {};
  gamesPlayed: GamePlayed[] = [];
  userInfo: UserInfo = {} as UserInfo;
  displayBar: boolean = true;

  ngOnInit(): void {
    this.getPlayedGames();
    this.getUserInfo();
  }

  getUserInfo(): void {
    this.request.get('users/info').subscribe((response: UserInfo) => {
      this.userInfo = { ...response };
    });
  }

  getPlayedGames(): void {
    this.route.queryParams.subscribe((query) => {
      this.queryParams = query;
      let queryStrings = '?';
      for (const key in query) {
        queryStrings += key + '=' + query[key] + '&';
      }
      this.request
        .get('games/' + queryStrings)
        .subscribe((response: GamePlayed[]) => {
          this.gamesPlayed = [...response];
        });
    });
  }

  searchFilter(filters: { [key: string]: any }): void {
    this.router.navigate(['/user/profile/played'], { queryParams: filters });
  }
}

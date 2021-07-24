import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RequestService } from 'src/app/core/services/request/request.service';
import { GamePlayed } from '../played.interface';


@Component({
  selector: 'app-played-main',
  templateUrl: './played-main.component.html',
  styleUrls: ['./played-main.component.scss'],
})
export class PlayedMainComponent implements OnInit {
  constructor(
    private request: RequestService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  queryParams: { [key: string]: any } = {};
  gamesPlayed: GamePlayed[] = [];

  ngOnInit(): void {
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

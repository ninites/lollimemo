import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { routeMain } from 'src/app/animations/animations';

import SwiperCore, { Pagination } from 'swiper/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  animations: [routeMain],
})
export class ProfileComponent implements OnInit {
  constructor() {}

  userOptions: { [key: string]: any }[] = [
    { value: 'Mes dernieres parties', link: ['/user/profile/games'] },
    { value: 'Mon profile', link: ['/user/profile/modify'] },
    { value: 'Mes themes', link: ['/user/profile/themes'] },
  ];

  ngOnInit(): void {
    SwiperCore.use([Pagination]);
  }

  prepareRoute(outlet: RouterOutlet) {
    return (
      outlet && outlet.activatedRouteData && outlet.activatedRouteData.animation
    );
  }
}

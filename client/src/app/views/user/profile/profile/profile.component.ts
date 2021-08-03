import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { routeMain } from 'src/app/animations/animations';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  animations: [routeMain],
})
export class ProfileComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  prepareRoute(outlet: RouterOutlet) {
    return (
      outlet && outlet.activatedRouteData && outlet.activatedRouteData.animation
    );
  }
}

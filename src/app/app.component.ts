import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { routeMain } from './animations/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [routeMain],
})
export class AppComponent {
  constructor() {}

  prepareRoute(outlet: RouterOutlet) {
    return (
      outlet && outlet.activatedRouteData && outlet.activatedRouteData.animation
    );
  }
}

import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { routeMain } from './animations/animations';
import { RouteHistoryService } from './core/services/route-history/route-history.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [routeMain],
})
export class AppComponent {
  constructor(private routeHistory: RouteHistoryService) {}

  ngOnInit(): void {
    this.routeHistory.follow();
  }
  prepareRoute(outlet: RouterOutlet) {
    return (
      outlet && outlet.activatedRouteData && outlet.activatedRouteData.animation
    );
  }
}

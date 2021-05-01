import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class RouteHistoryService {
  constructor(private router: Router) {}
  private previousUrl: string = '';
  private currentUrl: string = '';

  follow() {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        this.previousUrl = this.currentUrl;
        this.currentUrl = event.url;
      });
  }

  getPrevious(): string {
    return this.previousUrl;
  }
}

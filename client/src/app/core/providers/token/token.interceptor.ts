import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const token = this.getToken();
    const noTokensUrl = [environment.googleSearchUrl];
    console.log(request);
    
    if (!noTokensUrl.includes(request.url)) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
    }

    return next.handle(request);
  }

  getToken(): string {
    const storageToken = localStorage.getItem('accesToken');
    if (storageToken) {
      const token = JSON.parse(storageToken);
      return token.accesToken;
    }
    return '';
  }
}

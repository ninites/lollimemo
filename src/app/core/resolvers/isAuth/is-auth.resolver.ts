import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthentificationService } from '../../services/auth/authentification.service';

@Injectable({
  providedIn: 'root',
})
export class IsAuthResolver implements Resolve<boolean> {
  constructor(private auth: AuthentificationService) {}

  resolve(): Observable<boolean> {
    return this.auth.resolveAuth();
  }
}

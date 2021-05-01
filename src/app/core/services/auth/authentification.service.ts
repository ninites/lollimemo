import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthentificationService {
  constructor() {}

  getToken(): string {
    const storageToken = localStorage.getItem('accesToken');
    if (storageToken) {
      const token = JSON.parse(storageToken);
      return token.accesToken;
    }
    return '';
  }
}

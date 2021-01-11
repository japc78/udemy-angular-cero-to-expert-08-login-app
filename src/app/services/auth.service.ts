import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserModel } from '../models/user.models';
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private url = 'https://identitytoolkit.googleapis.com/v1/accounts:';
  private API_KEY = 'AIzaSyC69n4HlD2vVvBOtmSD-ad8-Ul6PUg7S04';
  userToken: string;

  // Crear nuevos usuarios
  // https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API_KEY]


  // Login de usuarios
  // https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[API_KEY]

  constructor( private http: HttpClient) {
    this.userToken = this.getToken();
   }

  logout(): void {
    localStorage.removeItem('token');
  }

  login(user: UserModel) {
    const authData = {
      ...user,
      returnSecureToken: true
    };

    return this.http.post(
      `${this.url}signInWithPassword?key=${this.API_KEY}`,
       authData )
          .pipe( map( (resp: any) => {
            this.saveToken(resp.idToken);
            return resp;
          }));

  }

  newUser(user: UserModel) {
    const authData = {
      ...user,
      returnSecureToken: true
    };

    return this.http.post(
      `${this.url}signUp?key=${this.API_KEY}`,
       authData )
        .pipe( map( (resp: any) => {
          this.saveToken(resp.idToken);
          return resp;
        }));
  }

  private saveToken(idToken: string): void {
    this.userToken = idToken;
    localStorage.setItem('token', this.userToken);

    let today = new Date(3600);

    localStorage.setItem('expiredToken', today.getTime().toString());
  }

  getToken(): string {
    if (localStorage.getItem('token')) {
      this.userToken = localStorage.getItem('token') ;
    } else {
      this.userToken = '';
    }
    return this.userToken;
  }

  isAuthenticated(): boolean {
    if ( this.userToken.length < 2) {
      return false;
    }

    const expiredToken = Number(localStorage.getItem('expiredToken'));

    if ( expiredToken > new Date().getTime()) {
      return true;
    } else {
      return false;
    }
  }
}

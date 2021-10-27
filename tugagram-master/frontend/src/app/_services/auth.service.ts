import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

const AUTH_URL = 'http://appserver.alunos.di.fc.ul.pt:3064/auth/';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {
  }

  /**
   * Sends user login info to backend.
   *
   * @param username username.
   * @param password password.
   */
  login(username: string, password: string): Observable<any> {
    return this.http.post(AUTH_URL + 'signin', {username, password}, httpOptions);
  }

  /**
   * Sends user register info to backend.
   *
   * @param username username.
   * @param password password.
   */
  register(username: string, password: string): Observable<any> {
    return this.http.post(AUTH_URL + 'signup', {username, password}, httpOptions);
  }
}

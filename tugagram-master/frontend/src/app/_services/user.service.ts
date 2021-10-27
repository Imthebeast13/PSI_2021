import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

// @ts-ignore
import {User} from '../interfaces/user';

const USER_URL = 'http://appserver.alunos.di.fc.ul.pt:3064/user/';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor( private http: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  /**
   * Get all public users information from backend.
   */
  getPublicContent(): Observable<any> {
    return this.http.get(USER_URL + 'all', {responseType: 'text'});
  }

  /**
   * Get specific user information from backend.
   */
  getUserByUsername(username: string): Observable<any> {
    const url = `${USER_URL}${username}`;
    return this.http.get(url, this.httpOptions);
  }

  updateUser(user: User): Observable<any> {
    const url = `${USER_URL}`;
    return this.http.put(url, user, this.httpOptions);
  }
}

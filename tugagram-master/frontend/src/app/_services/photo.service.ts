import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import {Photo} from '../interfaces/photo';
import {Observable} from 'rxjs';

import { catchError, map, tap } from 'rxjs/operators';

const HOME_URL = 'http://appserver.alunos.di.fc.ul.pt:3064/home';
const PHOTO_URL = 'http://appserver.alunos.di.fc.ul.pt:3064/photo';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  constructor(private http: HttpClient) {
  }

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  /**
   * Add new photo to the server.
   *
   * @param photo Photo to add.
   */
  addPhoto(photo: Photo): Observable<any> {
    return this.http.post(PHOTO_URL, photo, this.httpOptions);
  }

  getPhotos(): Observable<Photo[]> {
    const url = `${HOME_URL}/all`;
    return this.http.get<Photo[]>(url);
  }

  getPhoto(id: string): Observable<Photo> {
    const url = `${PHOTO_URL}/${id}`;
    return this.http.get<Photo>(url);
  }
}

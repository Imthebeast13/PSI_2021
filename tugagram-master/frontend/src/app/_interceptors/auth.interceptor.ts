import { Injectable } from '@angular/core';
import {HTTP_INTERCEPTORS, HttpErrorResponse, HttpEvent} from '@angular/common/http';
import { HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';

import { TokenStorageService } from '../_services/token-storage.service';
import { Observable } from 'rxjs';

const TOKEN_HEADER_KEY = 'x-access-token';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private tokenService: TokenStorageService ) { }

  /**
   * Intercepts HTTP request and converts to JSON
   *
   * @param req HTTP request intercepted
   * @param next handler that uses HTTP request
   */
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.tokenService.getToken();
    let authReq = req;

    // if current user has tokenService
    if (token != null) {
      // converts HTTP request to json
      authReq = req.clone({ headers: req.headers.set(TOKEN_HEADER_KEY, token) });
    }

    // sends request to server to authenticate
    return next.handle(authReq);
  }
}

export const AuthInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
];

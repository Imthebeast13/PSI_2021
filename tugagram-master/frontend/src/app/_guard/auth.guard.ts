import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import { Observable } from 'rxjs';

import {TokenStorageService} from '../_services/token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor( private tokenStorageService: TokenStorageService, private router: Router) {
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if ( !this.tokenStorageService.getToken() )
    {
      window.alert('Access Denied, Login is Required to Access This Page!');
      this.router.navigate(['/home']);
    }

    return true;
  }

}

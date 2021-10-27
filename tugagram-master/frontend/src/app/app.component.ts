import {Component, OnInit} from '@angular/core';
import {TokenStorageService} from './_services/token-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  isLoggedIn = false;
  username ?: string;

  constructor(private tokenStorageService: TokenStorageService) {
  }

  /**
   * Checks if user is logged in, and get his token.
   */
  ngOnInit(): void {
    // if user logged in, get user token
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.username = user.username;
    }
  }

  /**
   * Logouts user in current session.
   */
  logout(): void {
    this.tokenStorageService.signOut();
    window.location.reload();
  }
}

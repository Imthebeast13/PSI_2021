import {Component, OnInit} from '@angular/core';
import {TokenStorageService} from '../_services/token-storage.service';
import {UserService} from '../_services/user.service';
import {PhotoService} from '../_services/photo.service';
import {Photo} from '../interfaces/photo';

const MAX_PHOTOS = 10;

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  currentUser: any;
  photos: Photo [] = [];
  errorMsg?: string;

  constructor(private token: TokenStorageService, private userService: UserService, private photoService: PhotoService) {
  }

  ngOnInit(): void {
    this.currentUser = this.token.getUser();
    this.getCurrentUserPhotos();
  }

  getCurrentUserPhotos(): void {
    this.userService.getUserByUsername( this.currentUser.username ).subscribe( data => {
      for ( let i = data.photoList.length - 1; i >= 0 && i >= data.photoList.length - MAX_PHOTOS; i-- )
      {
        this.photoService.getPhoto(data.photoList[i]).subscribe(phooto => this.photos.push(phooto));
      }
    },
      err1 => this.errorMsg = err1.error );
  }

}

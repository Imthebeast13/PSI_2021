import { Component, OnInit } from '@angular/core';
import { Photo } from '../interfaces/photo';
import { PhotoService} from '../_services/photo.service';
import {TokenStorageService} from '../_services/token-storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  photos: Photo [] = [];
  isLoggedIn = false;
  isFullyLoaded = false;

  constructor(private tokenStorageService: TokenStorageService, private photoService: PhotoService) { }

  ngOnInit(): void {
    this.getPhotos();
    this.isLoggedIn = this.tokenStorageService.getToken() !== null;
  }

  getPhotos(): void {
    this.photoService.getPhotos()
    .subscribe(photos => {
      this.photos = photos;
      this.isFullyLoaded = true;
    });
  }


}

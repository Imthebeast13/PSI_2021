import { Component, OnInit } from '@angular/core';

import {Photo} from '../interfaces/photo';
import {PhotoService} from '../_services/photo.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-photo-detail',
  templateUrl: './photo-detail.component.html',
  styleUrls: ['./photo-detail.component.css']
})
export class PhotoDetailComponent implements OnInit {

  photo?: Photo;
  errorMessage ?: string;

  constructor( private route: ActivatedRoute, private photoService: PhotoService) { }

  ngOnInit(): void {
    this.getPhoto();
  }

  getPhoto(): void {
    const id = String(this.route.snapshot.paramMap.get('id'));
    this.photoService.getPhoto(id).subscribe( photo => this.photo = photo, err => this.errorMessage = err.error );
  }
}

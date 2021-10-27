import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {User} from '../interfaces/user';
import {Photo} from '../interfaces/photo';
import {UserService} from '../_services/user.service';
import {PhotoService} from '../_services/photo.service';
import {TokenStorageService} from '../_services/token-storage.service';

@Component({
  selector: 'app-board-user',
  templateUrl: './board-user.component.html',
  styleUrls: ['./board-user.component.css']
})

export class BoardUserComponent implements OnInit {


  constructor(private route: ActivatedRoute,
              private userService: UserService,
              private photoService: PhotoService,
              private tokenStorageService: TokenStorageService) {
  }

  user?: User;
  photo?: Photo;

  photoBase64?: string;
  photoError ?: string;

  photoFileName = '';
  photoName = '';
  photoDescription = '';

  successMsg ?: string;

  ngOnInit(): void {
    this.getUser();
  }

  getUser(): void {
    this.userService.getUserByUsername(this.tokenStorageService.getUser().username).subscribe(
      data => {
        this.user = data;
      },
      err => {
        this.user = JSON.parse(err.error).message;
      }
    );
  }

  onPhotoInput(photoInput: any): void {
    this.photoError = undefined;

    // convert photo to Base64
    if (photoInput.target.files && photoInput.target.files[0]) {

      const maxSizeBits = Math.pow(2, 26);

      const fileSize = photoInput.target.files[0].size;

      if (fileSize > maxSizeBits) {
        this.photoError = 'File size above limit: ' + fileSize / 1000000 + 'Mb.';
        return;
      }

      const reader = new FileReader();

      reader.onload = (e: any) => {
        const image = new Image();
        image.src = e.target.result;

        image.onload = rs => {
          this.photoBase64 = e.target.result;
          this.photoFileName = photoInput.target.files[0].name.split('\.')[0];
        };
      };

      reader.readAsDataURL(photoInput.target.files[0]);
    }
  }

  save(): void {
    if (this.user && this.photoBase64) {

      if (this.photoDescription.length === 0) {
        if (!confirm('Do you want to add image without description?')) {
          return;
        }

        alert(':(');
      }

      // if theres no name given by the user, use file name instead
      const photoName = (this.photoName.length === 0) ? this.photoFileName : this.photoName;

      // creates new photo
      const newPhoto = {
        _id: '',
        base64: this.photoBase64,
        name: photoName,
        description: this.photoDescription,
        likes: 0
      };

      // creates photo on server
      this.photoService.addPhoto(newPhoto).subscribe( data => {
        this.photo = data;

        // add photo to current user
        if ( this.user )
        {
          this.user.photoList.push(data._id);

          // update user
          this.userService.updateUser(this.user).subscribe(user => this.user = user);
        }
      } );

      this.successMsg = 'Uploaded with success!';
      this.photoBase64 = undefined;
      this.photoError = undefined;
    }
  }

  modifyPhotoName(photoName: string): void {
    this.photoName = photoName;
  }

  modifyPhotoDescription(photoDescription: string): void {
    this.photoDescription = photoDescription;
  }
}

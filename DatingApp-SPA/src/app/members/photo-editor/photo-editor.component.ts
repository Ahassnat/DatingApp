import { Component, OnInit, Input } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { Photo } from 'src/app/_models/Photo';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/_services/auth.service';
import { UserService } from 'src/app/_services/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-photo-editor',
  templateUrl: './photo-editor.component.html',
  styleUrls: ['./photo-editor.component.css']
})
export class PhotoEditorComponent implements OnInit {
  @Input() photos: Photo[];
  uploader: FileUploader;
  hasBaseDropZoneOver = false;
  baseUrl = environment.apiUrl;
  currentMain: Photo;

  constructor(private authService: AuthService, private userService: UserService, private toastrService: ToastrService) { }

  ngOnInit() {
    this.initializeUploder();
  }

 fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }
 initializeUploder() {
  this.uploader = new FileUploader({
    url: this.baseUrl + 'users/' + this.authService.decodedToken.nameid + '/photos',
    authToken: 'Bearer ' + localStorage.getItem('token'),
    isHTML5: true,
    allowedFileType: ['image'],
    removeAfterUpload: true,
    autoUpload: false,
    maxFileSize: 10 * 1024 * 1024
  });
  // onAfterAddingFile this function to make the authToken Secure
  this.uploader.onAfterAddingFile = (file) => {file.withCredentials = false; };

  // onSuccessItem this fucction to show the result of uploading the photo immedately without refreshing the page
  this.uploader.onSuccessItem = (item, response, status, headers) => {
    if (response) {
      const res: Photo = JSON.parse(response); // convetr the string to json file
      const photo = {
        id: res.id,
        url: res.url,
        dateAdded: res.dateAdded,
        description: res.description,
        isMain: res.isMain
      };
      this.photos.push(photo);
    }
  };
 }

 setMainPhoto(photo: Photo) {
  this.userService.setMainPhoto(this.authService.decodedToken.nameid, photo.id).subscribe(() => {
    this.currentMain = this.photos.filter(p => p.isMain === true)[0];
    this.currentMain.isMain = false;
    photo.isMain = true;
    // console.log('success set the main photo');
  }, error => {
    this.toastrService.error(' Error', 'Photo Setting ERROR');
  });
 }
}

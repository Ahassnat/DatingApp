import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from 'src/app/_models/user';
import { UserService } from 'src/app/_services/user.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from 'ngx-gallery';
import { TabsetComponent } from 'ngx-bootstrap';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css']
})
export class MemberDetailComponent implements OnInit {
  @ViewChild('membersTab') membersTab: TabsetComponent;
  user: User;
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];

  constructor(private userService: UserService, private toastr: ToastrService,
            private route: ActivatedRoute) { }

  ngOnInit() {
    // retravig data from resolver
    this.route.data.subscribe(data => {
      this.user = data['user'];
    });

    this.route.queryParams.subscribe(params => {
      const selctedTab = params['tab'];
      this.membersTab.tabs[selctedTab > 0 ? selctedTab : 0].active = true;
    });

    this.galleryOptions = [
      {
      width: '500px',
      height: '500px',
      imagePercent: 100,
      thumbnailsColumns: 4,
      imageAnimation: NgxGalleryAnimation.Slide,
      preview: false
    }
  ];
  this.galleryImages = this.getImages();
    // this.loadUser();
  }


  getImages() {
    const imageUrls = [];
    for (let i = 0; i < this.user.photos.length; i++) {
      imageUrls.push({
        small: this.user.photos[i].url,
        medium: this.user.photos[i].url,
        big: this.user.photos[i].url,
        description: this.user.photos[i].description
      });
    }
    return imageUrls;
  }

  selectTab(tabId: number) {
    this.membersTab.tabs[tabId].active = true;
  }

// the route => member/3
// loadUser() {// added + to change the type of data from string to int
//   this.userService.getUser(+this.route.snapshot.params['id'])
//       .subscribe((user: User) => {
//         this.user = user;
//       }, error => {
//         error.toastr.error('', 'Error');
//       });
// }
}

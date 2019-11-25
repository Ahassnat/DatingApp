import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { User } from 'src/app/_models/user';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';
import { UserService } from 'src/app/_services/user.service';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css']
})
export class MemberEditComponent implements OnInit {
@ViewChild('editForm') editForm: NgForm;
user: User;
// its for to show message when we close the Browser page without making save to our Changes after Editing
@HostListener('window:beforeunload', ['$event'])
unloadNotification($event: any) {
  if (this.editForm.dirty) {
    $event.returnValue = true;
  }
}
  constructor(private router: ActivatedRoute, private toaster: ToastrService,
    private userService: UserService, private authService: AuthService) { }

  ngOnInit() {
    this.router.data.subscribe(data => {
      this.user = data['user'];
    });
  }

  updateUser() {
    this.userService.updateUser(this.authService.decodedToken.nameid,  this.user).subscribe(next => {
      this.toaster.success('Profile Updated Successfully', 'Success');
    this.editForm.reset(this.user); // reset the user data afte make changes
    }, error => {
      this.toaster.error('Something Error', 'ERROR');
    });
    console.log(this.user);
  }
  updateMainPhoto(photoUrl) {
    this.user.photoUrl = photoUrl;
  }
}

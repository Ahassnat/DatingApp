import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/_models/user';
import { UserService } from 'src/app/_services/user.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css']
})
export class MemberDetailComponent implements OnInit {
  user: User;
  constructor(private userService: UserService, private toastr: ToastrService,
            private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.user = data['user'];
    });
    // this.loadUser();
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

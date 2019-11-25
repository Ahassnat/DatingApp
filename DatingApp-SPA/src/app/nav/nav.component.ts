import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
model: any = {};

  constructor(public authService: AuthService, private alertify: AlertifyService,
              private toastr: ToastrService, private router: Router) { }

  ngOnInit() {
  }

  login() {
    this.authService.login(this.model).subscribe(next => {
      this.toastr.success('ALERT:login sucssfully', 'Success');
      // this.alertify.success(':ALERT:login sucssfully');
      // console.log('login sucssfully');
    }, error => {
      this.toastr.warning('Login Failed', 'Faulier');
      // this.alertify.error(error);
      // console.log(error);
      // console.log('Faulier');
    }, () => {
      this.router.navigate(['/members']);
    });
  }

  loggedIn() {
    return this.authService.loggedIn();
    // const token = localStorage.getItem('token');
    // return !!token;
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.authService.decodedToken = null;
    this.authService.currentUser = null;
    this.toastr.info('LogOut', '');
    // this.alertify.message(':ALRET: Logout');
    this.router.navigate(['/home']);
    // console.log('logout');
  }
}

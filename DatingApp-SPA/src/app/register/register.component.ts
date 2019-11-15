import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
@Output() cancelRegister = new EventEmitter();
model: any = {};
  constructor( private authService: AuthService, private alertify: AlertifyService, private toastr: ToastrService) { }

  ngOnInit() {
  }

  register() {
    this.authService.register(this.model).subscribe(() => {
    this.toastr.success('ALERT: Registeration Sucsseffly', 'success');
      // this.alertify.success(':ALERT: Registeration Sucsseffly');
      // console.log('Registeration Sucsseffly');
    }, error => {
      this.toastr.error('password or user Name have problem', 'Error');
      // this.alertify.error(error);
      // console.log(error);
    }
    );

    console.log(this.model);
  }

  cancel() {
    this.cancelRegister.emit(false);
    // console.log('Canceld');
  }
}

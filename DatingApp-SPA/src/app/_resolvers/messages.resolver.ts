import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { UserService } from '../_services/user.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { Message } from '../_models/message';
import { AuthService } from '../_services/auth.service';


@Injectable()
export class MessagesResolver implements Resolve<Message[]> {
    pageNumber = 1;
    pageSize = 5;
    messageContainer = 'Unread';
    constructor( private userService: UserService,
                 private authService: AuthService,
                 private router: Router,
                 private toastrService: ToastrService) {}

    resolve(route: ActivatedRouteSnapshot): Observable<Message[]> {
        return this.userService.getMessages(this.authService.decodedToken.nameid,
             this.pageNumber, this.pageSize, this.messageContainer).pipe(
            catchError(error => {
                this.toastrService.error('problem retrieving messages', 'Retreiveng ERROR');
                this.router.navigate(['/home']);
                return of(null);
            })
        );
    }
}

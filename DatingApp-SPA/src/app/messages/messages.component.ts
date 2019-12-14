import { Component, OnInit } from '@angular/core';
import { Message } from '../_models/message';
import { Pagination, PaginatedResult } from '../_models/pagination';
import { AuthService } from '../_services/auth.service';
import { UserService } from '../_services/user.service';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {
  messages: Message[];
  pagination: Pagination;
  messageContainer = 'Unread';

  constructor(private authService: AuthService,
              private userService: UserService,
              private route: ActivatedRoute,
              private toastr: ToastrService ) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.messages = data['messages'].result;
      this.pagination = data['messages'].pagination;
    });
  }

  loadMessages() {
    this.userService.getMessages(this.authService.decodedToken.nameid, this.pagination.currentPage,
       this.pagination.itemsPerPage, this.messageContainer)
       .subscribe((res: PaginatedResult<Message[]>) => {
         this.messages = res.result;
         this.pagination = res.pagination;
       }, error => {
         this.toastr.error(error);
       });
  }

  deleteMessage(id: number) {
    this.userService.deleteMessage(id, this.authService.decodedToken.nameid)
      .subscribe(() => {
        this.messages.splice(this.messages.findIndex(m => m.id === id), 1);
        this.toastr.success('Message has been deleted', 'Deleting Message');
      }, error => {
        this.toastr.error('Message Failed to Delete', 'Failed Deleting');
      });
  }

  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.loadMessages();
  }
}

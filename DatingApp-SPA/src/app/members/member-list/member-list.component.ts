import { Component, OnInit } from '@angular/core';
import { User } from '../../_models/user';
import { UserService } from '../../_services/user.service';
import {  ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { Pagination, PaginatedResult } from 'src/app/_models/pagination';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {
 users: User[];
 pagination: Pagination;
  constructor(private userService: UserService, private toastr: ToastrService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.users = data['users'].result;
      this.pagination = data['users'].pagination;
    });
    // this.loadUsers();
  }

  pageChanged(event: any): void {
    this.pagination.currenPage = event.page;
    this.loadUsers();
    // console.log(this.pagination.currenPage);
  }
  loadUsers() {
    this.userService.getUsers(this.pagination.currenPage, this.pagination.itemsPerPage)
    .subscribe((res: PaginatedResult<User[]>) => {
      this.users = res.result;
      this.pagination = res.pagination;
    }, error => {
      this.toastr.error('Error', error);
    });
  }

}

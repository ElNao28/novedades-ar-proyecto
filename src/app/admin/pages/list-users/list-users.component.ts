import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin-service.service';
import { GetUsers } from '../../interfaces/GetUsers.interface';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrl: './list-users.component.css'
})
export class ListUsersComponent implements OnInit {
  constructor(private adminService:AdminService){}
  gender:string = 'T'
  users: GetUsers[] = [];
  usersFilter: GetUsers[] = [];
  ngOnInit(): void {
    this.adminService.getAllUsers().subscribe(users =>{
      this.users = users;
      this.usersFilter = users;
    })
  }
  changeFilter(){
    if(this.gender === 'T')
      this.usersFilter = this.users;
    else
      this.usersFilter = this.users.filter(user => user.gender === this.gender);
  }
}

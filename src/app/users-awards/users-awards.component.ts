import { Component, OnInit } from '@angular/core';
import { UsersAwardsService } from './users-awards.service';
import { User } from '../shared/models/user.model';
import { Award } from '../shared/models/awards.model';

@Component({
  selector: 'app-users-awards',
  templateUrl: './users-awards.component.html',
  styleUrls: ['./users-awards.component.scss']
})
export class UsersAwardsComponent implements OnInit {

  isAuthorized: boolean;
  user: User;
  award: Award;
  usersAwards: any[];
  errors: any[];
  isErrorConnection: boolean;
  username: String;

  constructor(
    private service: UsersAwardsService
  ) { }

  ngOnInit() {
    this.isAuthorized = false;
    this.user = {};
    this.award = {};
    this.errors = [];
    this.usersAwards = [];
    this.username = '';
    this.isErrorConnection = false;

    if (localStorage.getItem('id_user')) {
      this.isAuthorized = true;
      this.username = localStorage.getItem('username');
      this.getData();
    }
  }

  private getData() {
    this.service.getUsersAwards().subscribe(
      (response) => {
        this.isErrorConnection = false;
        this.usersAwards = response;
        console.log('data', this.usersAwards);
      },
      err => {
        console.log(err);
        this.isErrorConnection = true;
        this.errors.push('Ha ocurrido un error en la conexión, contactese con el Admin.');
      });
  }
}

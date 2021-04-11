import { Component, OnInit } from '@angular/core';
import { RegisterUsersService } from './register-users.service';
import { User } from '../shared/models/user.model';

@Component({
  selector: 'app-register-users',
  templateUrl: './register-users.component.html',
  styleUrls: ['./register-users.component.scss']
})
export class RegisterUsersComponent implements OnInit {

  constructor(
    private regUserService: RegisterUsersService
  ) { }
  title = 'Hero Admin';
  username: string;
  isAuthorized: boolean;
  isAdmin: boolean;
  isUserExist: boolean;
  isErrorConnection: boolean;
  isUserCreated: boolean;
  errors: any[];
  user: User;
  targetForm: any;

  ngOnInit() {
    this.isAuthorized = false;
    this.isUserExist = false;
    this.isErrorConnection = false;
    this.isUserCreated = false;
    this.isAdmin = false;
    this.errors = [];
    this.user = {};
    if (localStorage.getItem('id_user')) {
      this.isAuthorized = true;
      this.username = localStorage.getItem('username');
    }
  }

  register(event) {
    event.preventDefault();
    this.targetForm = event.target;
    this.user.email = this.targetForm.querySelector('#email').value;
    this.user.password = !this.isAdmin ? '' : this.targetForm.querySelector('#password').value;
    this.user.username = this.targetForm.querySelector('#username').value;
    this.user.phone = this.targetForm.querySelector('#phone').value;
    this.user.city = this.targetForm.querySelector('#city').value;
    this.user.profile = 'user';
    const currentDate = new Date();
    const currentDay = currentDate.getDay().toString();
    const currentMonth = currentDate.getMonth().toString();
    const currentYear = currentDate.getFullYear().toString();
    const currentHour = currentDate.getHours().toString();
    const currentMinutes = currentDate.getMinutes().toString();
    this.user.created_at = `${currentDay}/${currentMonth}/${currentYear} ${currentHour}:${currentMinutes}`;

    this.errors = [];
    this.regUserService.newUser(this.user).subscribe(
      (response) => {
        if (response === 'ERROR_EXIST') {
          this.isUserExist = true;
          this.isErrorConnection = false;
          this.errors.push('El Usuario que intenta crear ya existe en su Base de Datos.');
        } else {
          this.isUserExist = false;
          this.isErrorConnection = false;
          this.isUserCreated = true;
          this.errors = [];
        }
      },
      err => {
        this.isUserExist = false;
        this.isErrorConnection = true;
        this.errors.push('Ha ocurrido un error en la conexión, contactese con el Admin.');
      });
  }

  newUser() {
    location.reload();
  }
}

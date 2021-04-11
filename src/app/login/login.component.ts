import { Component, OnInit } from '@angular/core';
import { LoginService } from './login.service';
import { User } from '../shared/models/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  User: User;
  isLogged: boolean;
  isErrorConnection: boolean;
  isUserInvalid: boolean;
  errors: any[];
  constructor(
    private loginService: LoginService,
    private router: Router
  ) {
    if (localStorage.getItem('id_user')) {
      this.router.navigateByUrl('#');
    }
   }

  ngOnInit() {
    this.isUserInvalid = false;
    this.isLogged = false;
    this.isErrorConnection = false;
    this.User = {email: '', password: '', id: '', username: '', profile: ''};
    this.errors = [];
  }

  login(event) {
    event.preventDefault();
    const target = event.target;
    const email = target.querySelector('#email').value;
    const password = target.querySelector('#password').value;
    this.errors = [];
    this.loginService.getLoginUser(email, password).subscribe(
      (response) => {
        if (response === 'USER_INVALID') {

          this.isUserInvalid = true;
          this.isErrorConnection = false;
          this.isLogged = false;
          this.errors.push('Usuario y/o Contraseña son incorrectos.');

        } else if (response === 'ERROR_CONNECTION') {

          this.isUserInvalid = false;
          this.isErrorConnection = true;
          this.isLogged = false;
          this.errors.push('Ha ocurrido un error en la conexión, intente nuevamente.');

        } else {
          this.isUserInvalid = false;
          this.isErrorConnection = false;
          this.isLogged = true;
          this.errors = [];

          this.User.email = response.email;
          this.User.password = response.password;
          this.User.id = response._id;
          this.User.username = response.username;
          this.User.profile = response.profile;

          localStorage.setItem('id_user', this.User.id);
          localStorage.setItem('username', this.User.username);
          this.router.navigateByUrl('/');
        }
    },
    err => {
      this.errors.push('Ha ocurrido un error en la conexión, contactese con el Admin.');
      this.isUserInvalid = false;
      this.isErrorConnection = true;
      this.isLogged = false;
    });

  }
}

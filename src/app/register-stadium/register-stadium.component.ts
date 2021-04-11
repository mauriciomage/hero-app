import { Component, OnInit } from '@angular/core';
import { RegisterStadiumService } from './register-stadium.service';
import { Stadium } from '../shared/models/stadium-model';
import * as moment from 'moment';

@Component({
  selector: 'app-register-stadium',
  templateUrl: './register-stadium.component.html',
  styleUrls: ['./register-stadium.component.scss']
})
export class RegisterStadiumComponent implements OnInit {

  username: string;
  isAuthorized: boolean;
  isStadiumExist: boolean;
  isErrorConnection: boolean;
  isStadiumCreated: boolean;
  errors: any[];
  stadium: Stadium;
  constructor(
    private service: RegisterStadiumService
  ) { }

  ngOnInit() {
    this.username = '';
    this.isAuthorized = false;
    this.isStadiumExist = false;
    this.isErrorConnection = false;
    this.isStadiumCreated = false;
    this.errors = [];
    this.stadium = {};
    if (localStorage.getItem('id_user')) {
      this.isAuthorized = true;
      this.username = localStorage.getItem('username');
    }
  }

  save(event) {
    event.preventDefault();
    const target = event.target;
    this.stadium.name = target.querySelector('#name').value;
    this.stadium.city = target.querySelector('#city').value;
    this.stadium.sport = target.querySelector('#sport').value;
    this.stadium.created_at = moment().format('DD/MM/YY');

    this.errors = [];
    this.service.newStadium(this.stadium).subscribe(
      (response) => {
        if (response === 'ERROR_EXIST') {
          this.isStadiumExist = true;
          this.isErrorConnection = false;
          this.isStadiumCreated = false;
          this.errors.push('La cancha que intenta crear ya existe en su Base de Datos.');
        } else {
          this.isStadiumExist = false;
          this.isErrorConnection = false;
          this.isStadiumCreated = true;
          this.errors = [];
        }
      },
      err => {
        this.isStadiumExist = false;
        this.isErrorConnection = true;
        this.isStadiumCreated = false;
        this.errors.push('Ha ocurrido un error en la conexión, contactese con el Admin.');
      });
  }

  newStadium() {
    location.reload();
  }
}

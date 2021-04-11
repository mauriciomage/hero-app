import { Component, OnInit } from '@angular/core';
import { Award } from '../shared/models/awards.model';
import { RegisterAwardService } from './register-award.service';
import * as moment from 'moment';

@Component({
  selector: 'app-register-awards',
  templateUrl: './register-awards.component.html',
  styleUrls: ['./register-awards.component.scss']
})
export class RegisterAwardsComponent implements OnInit {

  username: string;
  isAuthorized: boolean;
  isErrorConnection: boolean;
  isAwardCreated: boolean;
  errors: any[];
  award: Award;

  constructor(
    private serviceAward: RegisterAwardService
  ) { }

  ngOnInit() {
    this.isAuthorized = false;
    this.isErrorConnection = false;
    this.errors = [];
    this.award = {};
    if (localStorage.getItem('id_user')) {
      this.isAuthorized = true;
      this.username = localStorage.getItem('username');
    }
  }

  save(event) {
    event.preventDefault();
    const target = event.target;
    this.award.name =target.querySelector('#name').value;;
    this.award.description = target.querySelector('#description').value;;
    this.award.created_at = moment().format('DD/MM/YY');
    this.errors = [];
    this.serviceAward.newAward(this.award).subscribe(
      () => {
        this.isErrorConnection = false;
        this.isAwardCreated = true;
        this.errors = [];
      },
      err => {
        this.isErrorConnection = true;
        this.isAwardCreated = false;
        this.errors.push('Ha ocurrido un error en la conexión, contactese con el Admin.');
      });
  }

  newAward() {
    location.reload();
  }
}

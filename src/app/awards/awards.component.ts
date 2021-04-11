import { Component, OnInit } from '@angular/core';
import { AwardsService } from './awards.service';
import { Award } from '../shared/models/awards.model';

@Component({
  selector: 'app-awards',
  templateUrl: './awards.component.html',
  styleUrls: ['./awards.component.scss']
})
export class AwardsComponent implements OnInit {

  isAuthorized: boolean;
  username: string;
  awards: Award[];
  errors: any[];
  isErrorConnection: boolean;

  constructor(
    private awardsService: AwardsService
  ) { }

  ngOnInit() {
    this.isAuthorized = false;
    this.username = '';
    this.awards = [];
    this.errors = [];
    this.isErrorConnection = false;

    if (localStorage.getItem('id_user')) {
      this.isAuthorized = true;
      this.username = localStorage.getItem('username');
      this.getAwards();
    }
  }

  private getAwards() {
    this.awardsService.getAwards().subscribe(
      (awards) => {
        this.isErrorConnection = false;
        this.awards = awards;
      },
      err => {
        console.log(err);
        this.isErrorConnection = true;
        this.errors.push('Ha ocurrido un error en la conexión, contactese con el Admin.');
      });
  }
}

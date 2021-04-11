import { Component, OnInit } from '@angular/core';
import { Stadium } from '../shared/models/stadium-model';
import { StadiumsService } from './stadiums.service';

@Component({
  selector: 'app-stadiums',
  templateUrl: './stadiums.component.html',
  styleUrls: ['./stadiums.component.scss']
})
export class StadiumsComponent implements OnInit {

  isAuthorized: boolean;
  username: string;
  stadiums: Stadium[];
  errors: any[];
  isErrorConnection: boolean;

  constructor(
    private stadium: StadiumsService
  ) { }

  ngOnInit() {
    this.isAuthorized = false;
    this.username = '';
    this.stadiums = [];
    this.errors = [];
    this.isErrorConnection = false;

    if (localStorage.getItem('id_user')) {
      this.isAuthorized = true;
      this.username = localStorage.getItem('username');
      this.getStadiums();
    }
  }

  private getStadiums() {
    this.stadium.getAllStadiums().subscribe(
      (stadiums) => {
        this.isErrorConnection = false;
        this.stadiums = stadiums;
      },
      err => {
        console.log(err);
        this.isErrorConnection = true;
        this.errors.push('Ha ocurrido un error en la conexión, contactese con el Admin.');
      });
  }
}

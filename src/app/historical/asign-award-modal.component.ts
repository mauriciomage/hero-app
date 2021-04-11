import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AwardsService } from '../awards/awards.service';
import { Award } from '../shared/models/awards.model';
import { HistoricalService } from './historical.service';
import * as moment from 'moment';

@Component({
  selector: 'app-asign-award-modal',
  templateUrl: './asign-award-modal.component.html',
  styleUrls: ['./asign-award-modal.component.scss']
})
export class AsignAwardModalComponent implements OnInit {

  awards: Award[];
  isErrorConnection: boolean;
  isUserNotFound: boolean;
  isAwardAsigned: boolean;
  isNotAwardSelected: boolean;
  errors: any[];
  award: Award;

  constructor(
   public modalReference: NgbActiveModal,
   private awardService: AwardsService,
   private historicalService: HistoricalService
  ) { }

  ngOnInit() {
    this.isErrorConnection = false;
    this.isUserNotFound = false;
    this.isAwardAsigned = false;
    this.isNotAwardSelected = false;
    this.errors = [];
    this.awards = [{}];
    this.getAwards();
  }

  private getAwards() {
    this.awardService.getAwards().subscribe(
      (awards) => {
        this.isErrorConnection = false;
        this.awards = awards;
      },
      err => {
        this.isErrorConnection = true;
        this.errors.push('Ha ocurrido un error en la conexión, contactese con el Admin.');
      });
  }

  selectAward(award) {
    this.award = award;
  }

  asign() {
    let user= localStorage.getItem('userId');
    let created_at = moment().format('DD/MM/YY');
    if(this.award != null) {
      this.isNotAwardSelected = false;
      this.historicalService.asign(this.award, user, created_at).subscribe(
        (response) => {
          if (response === 'ERROR_CONNECTION') {
            this.isErrorConnection = true;
            this.isUserNotFound = false;
            this.isAwardAsigned = false;
            this.errors.push('Ha ocurrido un error en la conexión, contactese con el Admin.');
          } else if (response === 'USER_NOT_FOUND') {
            this.isErrorConnection = false;
            this.isUserNotFound = true;
            this.isAwardAsigned = false;
            this.errors.push('El Usuario seleccionado NO existe en la Base de Datos.');
           
          } else {
            this.isErrorConnection = false;
            this.isUserNotFound = false;
            this.errors = [];
            this.isAwardAsigned = true;
          }
        },
        err => {
          this.isErrorConnection = true;
          this.isUserNotFound = false;
          this.isAwardAsigned = false;
          this.errors.push('Ha ocurrido un error en la conexión, contactese con el Admin.');
        });
    } else {
      this.isNotAwardSelected = true;
    }
      localStorage.removeItem('user');
  }

  dismiss() {
    this.modalReference.dismiss();
  }

  close() {
    this.modalReference.close();
  }
}

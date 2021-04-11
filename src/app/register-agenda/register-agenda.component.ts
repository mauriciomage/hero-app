import { Component, OnInit } from '@angular/core';
import { RegisterAgendaService } from './register-agenda.service';
import { RegisterStadiumService } from '../register-stadium/register-stadium.service';
import { Stadium } from '../shared/models/stadium-model';
import { Agenda } from '../shared/models/agenda.model';
import { User } from '../shared/models/user.model';
import * as moment from 'moment';
import { STATUS } from '../shared/constants/general';
import { DailyAgendaModalComponent } from './daily-agenda-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-register-agenda',
  templateUrl: './register-agenda.component.html',
  styleUrls: ['./register-agenda.component.scss']
})
export class RegisterAgendaComponent implements OnInit {

  username: string;
  isAuthorized: boolean;
  isErrorConnection: boolean;
  isAgendaCreated: boolean;
  isAgendaExist: boolean;
  errors: any[];
  usersFound: any[];
  stadiums: Stadium[];
  userField: string;
  user: User;
  searchValue: string;
  stadium: Stadium;
  agenda: Agenda;
  allowPopupModal: any;
  isShownAlertModal: boolean;


  constructor(
    private service: RegisterAgendaService,
    private stadiumService: RegisterStadiumService,
    private modalService: NgbModal
  ) { }

  ngOnInit() {
    this.isAuthorized = false;
    this.isErrorConnection = false;
    this.isAgendaCreated = false;
    this.isAgendaExist = false;
    this.isShownAlertModal = false;
    this.errors = [];
    this.usersFound = [];
    this.searchValue = '';
    this.user = {};
    this.userField = '';
    this.agenda = {}
    this.stadiums = [];
    if (localStorage.getItem('id_user')) {
      this.isAuthorized = true;
      this.username = localStorage.getItem('username');
      this.getStadiums();
    }
  }

  searchUsers(event: any) {
    console.log(event.target);
    this.searchValue = event.target.value;
    this.service.getResultSearchUser(this.searchValue).subscribe((result) => {
      if (result.length > 0) {
        this.usersFound = result;
      } else {
        console.log('no se han encontrado resultados');
      }
    });
  }

  setUser(user) {
    this.user = user;
    this.userField = user.username;
    this.usersFound = [];
  }

  save(event) {
    event.preventDefault();
    const target = event.target;
    this.agenda.user = this.user;
    this.agenda.stadium = this.stadium;
    this.agenda.day = target.querySelector('#day').value;
    this.agenda.hour = target.querySelector('#hour').value;
    this.agenda.status = `${STATUS.booked}`;
    this.agenda.price = target.querySelector('#price').value;
    this.agenda.created_at = moment().format('DD/MM/YY');

    this.errors = [];
    this.service.newAgenda(this.agenda).subscribe(
      (response) => {
        if (response === 'ERROR_EXIST') {
          this.isAgendaExist = true;
          this.isErrorConnection = false;
          this.isAgendaCreated = false;
          this.errors.push('Ya existe un torno creado con esos datos.');
        } else {
          this.isAgendaExist = false;
          this.isErrorConnection = false;
          this.isAgendaCreated = true;
          this.errors = [];
        }
      },
      err => {
        this.isAgendaExist = false;
        this.isErrorConnection = true;
        this.isAgendaCreated = false;
        this.errors.push('Ha ocurrido un error en la conexión, contactese con el Admin.');
      });
  }

  private getStadiums() {
    this.stadiumService.getAllStadiums().subscribe(
      (stadiums) => {
        this.isErrorConnection = false;
        this.stadiums = stadiums;
      },
      err => {
        this.isErrorConnection = true;
        this.errors.push('Ha ocurrido un error en la conexión, contactese con el Admin.');
      });
  }

  selectStadium(stadium) {
    this.stadium = stadium;
  }

  openModal() {
    if (this.stadium) {
      this.isShownAlertModal = false;
      this.allowPopupModal = this.modalService.open(DailyAgendaModalComponent);
      this.allowPopupModal.componentInstance.stadium = this.stadium;
    } else {
      this.isShownAlertModal = true;
    }
  }
}

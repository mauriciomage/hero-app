import { Component, OnInit } from '@angular/core';
import { AgendaService } from '../agenda/agenda.service';
import { Agenda } from '../shared/models/agenda.model';
import { SHOW_MAX_AGENDA } from '../shared/constants/general';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  title = 'Hero Admin';
  isAuthorized: boolean;
  username: string;
  isErrorConnection: boolean;
  errors: any[];
  agenda: Agenda[];
  showMaxAgenda: number = SHOW_MAX_AGENDA.limit;

  constructor(
    private agendaService: AgendaService
  ) { }

  ngOnInit() {
    this.isAuthorized = false;
    this.isErrorConnection = false;
    this.agenda = [{
      id: null,
      user: {},
      stadium: {},
      hour: null,
      day: null,
      status: null,
      created_at: null
    }];
    this.errors = [];
    if (localStorage.getItem('id_user')) {
      this.isAuthorized = true;
      this.username = localStorage.getItem('username');
      this.getAgendaLatest()
    }
  }

  private getAgendaLatest() {
    this.agendaService.getAgenda(SHOW_MAX_AGENDA.limit).subscribe(
      (agenda) => {
        this.isErrorConnection = false;
        this.agenda = agenda;
        if (this.showMaxAgenda > this.agenda.length) {
          this.showMaxAgenda = this.agenda.length;
        } else {
          this.showMaxAgenda = SHOW_MAX_AGENDA.limit;
        }
      },
      err => {
        this.isErrorConnection = true;
        this.errors.push('Ha ocurrido un error en la conexión, contactese con el Admin.');
      });
  }

}

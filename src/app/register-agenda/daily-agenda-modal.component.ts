import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { RegisterAgendaService } from './register-agenda.service';
import { Stadium } from '../shared/models/stadium-model';

@Component({
  selector: 'app-daily-agenda-modal',
  templateUrl: './daily-agenda-modal.component.html',
  styleUrls: ['./daily-agenda-modal.component.scss']
})
export class DailyAgendaModalComponent implements OnInit {

  isErrorConnection: boolean;
  isUserEdited: boolean;
  isSomeFieldEmpty: boolean;
  errors: any[];
  currentMonth: string;
  month: number;
  year: number;
  days: any[];
  day: number;
  dayCalendar: string;
  dailyAgenda: any[];
  dayExecuted: any;
  @Input() stadium: Stadium;

  constructor(
    public modalReference: NgbActiveModal,
    private service: RegisterAgendaService
  ) { }

  ngOnInit() {
    this.isErrorConnection = false;
    this.isUserEdited = false;
    this.isSomeFieldEmpty = false;
    this.errors = [];
    this.day = 1;
    this.setDailyConfiguration();
    this.configDailyAgenda();
  }

  private configDailyAgenda() {
    this.month = moment().month();
    this.year = moment().year();
    this.currentMonth = moment().locale('es').format('MMMM');
    this.month = this.month;
    const monthForTwoDigits = this.month + 1;
    const monthTwoDigits = monthForTwoDigits < 10 ? '0' + monthForTwoDigits : monthForTwoDigits;

    const names = [ 'Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado' ];
    const date = new Date(this.year, this.month, 1);
    this.days = [];
    while (date.getMonth() === this.month) {
      const day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
      this.dayCalendar = this.year + '-' + monthTwoDigits + '-' + day;
      let objectDay = {
        dayVisible: names[date.getDay()] + ' ' + date.getDate(),
        day: this.dayCalendar
      }
      this.days.push(objectDay);
      date.setDate(date.getDate() + 1);
    }
  }

  getDailyAgenda(day) {
    if (day !== this.dayExecuted) {
      this.dayExecuted = day;

      this.setDailyConfiguration();
      this.service.getDailyAgenda(day, this.stadium._id).subscribe(
      (response) => {
        this.dailyAgenda.filter(item => {
          for (let i = 0; i < response.length; i++) {
            if (response[i].hour === item.hour) {
              item.status = 'No Disponible';
            }
          }
        });
      },
      err => {
        this.isErrorConnection = true;
        this.errors.push('Ha ocurrido un error en la conexión, contactese con el Admin.');
      });

    }
  }

  setDailyConfiguration() {
    this.dailyAgenda = [
      {
        hour: '12:00',
        status: 'Disponible'
      },
      {
        hour: '13:00',
        status: 'Disponible'
      },
      {
        hour: '14:00',
        status: 'Disponible'
      },
      {
        hour: '15:00',
        status: 'Disponible'
      },
      {
        hour: '16:00',
        status: 'Disponible'
      },
      {
        hour: '17:00',
        status: 'Disponible'
      },
      {
        hour: '18:00',
        status: 'Disponible'
      },
      {
        hour: '19:00',
        status: 'Disponible'
      },
      {
        hour: '20:00',
        status: 'Disponible'
      },
      {
        hour: '21:00',
        status: 'Disponible'
      },
      {
        hour: '22:00',
        status: 'Disponible'
      },
      {
        hour: '23:00',
        status: 'Disponible'
      }
    ];
  }

  dismiss() {
    this.modalReference.dismiss();
  }

  close() {
    this.modalReference.close();
  }
}

import { Component, OnInit } from '@angular/core';
import { HistoricalService } from './historical.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AsignAwardModalComponent } from './asign-award-modal.component';
import { Stadium } from '../shared/models/stadium-model';

@Component({
  selector: 'app-historical',
  templateUrl: './historical.component.html',
  styleUrls: ['./historical.component.scss']
})
export class HistoricalComponent implements OnInit {

  isAuthorized: boolean;
  username: string;
  errors: any[];
  historical: any[];
  sports: any[];
  cities: any[];
  stadium: Stadium;
  isSportFilter: boolean;
  isCityFilter: boolean;
  isDateFilter: boolean;
  isErrorConnection: boolean;
  filterSportText: string;
  filterCityText: string;
  filterDateText: string;
  isSportFilterApplied: boolean;
  isDateFilterApplied: boolean;
  isCityFilterApplied: boolean;


  constructor(
    private historicalService: HistoricalService,
    private modalService: NgbModal
  ) { }

  ngOnInit() {
    this.isAuthorized = false;
    this.username = '';
    this.errors = [];
    this.historical = [];
    this.isErrorConnection = false;
    this.sports = [];
    this.stadium = {};
    this.cities = [];
    this.isSportFilterApplied = false;
    this.isCityFilterApplied = false;
    this.isDateFilterApplied = false;
    this.filterSportText = 'Por Deporte';
    this.filterCityText = 'Por Ciudad';
    this.filterDateText = 'Por Fecha';

    if (localStorage.getItem('id_user')) {
      this.isAuthorized = true;
      this.username = localStorage.getItem('username');
      this.getHistorical();
    }
  }
  setFilterDate(event) {
    event.preventDefault();
    const target = event.target;
    const dayStart  = target.querySelector('#dayStart').value;
    const dayFinish = target.querySelector('#dayFinish').value;
    this.historicalService.getHistoricalByDate(dayStart, dayFinish).subscribe(
      (result) => {
        this.isErrorConnection = false;
        this.historical = result;
        this.isDateFilterApplied = true;
        this.filterDateText = 'Quitar Filtro';
      },
      err => {
        console.log(err);
        this.isErrorConnection = true;
        this.errors.push('Ha ocurrido un error en la conexión, contactese con el Admin.');
      });
  }
  showFilter(type, refresh) {
    if (refresh) {
      this.isSportFilter = false;
      this.isCityFilter = false;
      this.isDateFilter = false;
      this.sports = [];
      this.cities = [];
      this.getHistorical();
    } else {
      switch (type) {
        case 'sport':
          this.getSports();
          this.isSportFilter = true;
          this.isCityFilter = false;
          this.isDateFilter = false;
          break;
        case 'city':
          this.getCities();
          this.isSportFilter = false;
          this.isCityFilter = true;
          this.isDateFilter = false;
          break;
        case 'date':
          this.isSportFilter = false;
          this.isCityFilter = false;
          this.isDateFilter = true;
          break;
      }
    }
  }

  asignAward(user) {
    localStorage.setItem('userId', user._id);
    this.modalService.open(AsignAwardModalComponent, {
      backdrop: 'static',
      keyboard: false
    });
  }

  setPage(page) {
    localStorage.setItem('currentPage', page);
  }

  private getHistorical(filter = null, value = null, stadium = null) {
    this.stadium = stadium;
    switch (filter) {
      case 'bySport':
      this.historicalService.getHistorical(filter, value).subscribe(
        (result) => {
          this.isErrorConnection = false;
          this.historical = result;
          this.isSportFilterApplied = true;
          this.filterSportText = 'Quitar Filtro';
        },
        err => {
          console.log(err);
          this.isErrorConnection = true;
          this.errors.push('Ha ocurrido un error en la conexión, contactese con el Admin.');
        });
      break;

      case 'byCity':
      this.historicalService.getHistorical(filter, value).subscribe(
        (result) => {
          this.isErrorConnection = false;
          this.historical = result;
          this.isCityFilterApplied = true;
          this.filterCityText = 'Quitar Filtro';
        },
        err => {
          console.log(err);
          this.isErrorConnection = true;
          this.errors.push('Ha ocurrido un error en la conexión, contactese con el Admin.');
        });
      break;

      case 'byDate':
      this.historicalService.getHistorical(filter, value).subscribe(
        (result) => {
          this.isErrorConnection = false;
          this.historical = result;
          this.isCityFilterApplied = true;
          this.filterCityText = 'Quitar Filtro';
        },
        err => {
          console.log(err);
          this.isErrorConnection = true;
          this.errors.push('Ha ocurrido un error en la conexión, contactese con el Admin.');
        });
      break;

      default:
      this.historicalService.getHistorical().subscribe(
        (result) => {
          this.isErrorConnection = false;
          this.historical = result;
          this.isSportFilterApplied = false;
          this.isCityFilterApplied = false;
          this.isDateFilterApplied = false;
          this.filterSportText = 'Por Deporte';
          this.filterCityText = 'Por Ciudad';
          this.filterDateText = 'Por Fecha';
          this.isSportFilter = false;
          this.isCityFilter = false;
          this.isDateFilter = false;
        },
        err => {
          console.log(err);
          this.isErrorConnection = true;
          this.errors.push('Ha ocurrido un error en la conexión, contactese con el Admin.');
        });
      break;
    }
  }

  closeFilters() {
    this.isSportFilter = false;
    this.isCityFilter = false;
    this.isDateFilter = false;
  }

  private getSports() {
    this.historicalService.getSports().subscribe(
      (result) => {
        this.isErrorConnection = false;
        this.sports = result;
      },
      err => {
        console.log(err);
        this.isErrorConnection = true;
        this.errors.push('Ha ocurrido un error en la conexión, contactese con el Admin.');
      });
  }

  private getCities() {
    this.historicalService.getCities().subscribe(
      (result) => {
        this.isErrorConnection = false;
        this.cities = result;
      },
      err => {
        console.log(err);
        this.isErrorConnection = true;
        this.errors.push('Ha ocurrido un error en la conexión, contactese con el Admin.');
      });
  }
}

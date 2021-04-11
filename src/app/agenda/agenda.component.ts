import { Component, OnInit, Inject, PLATFORM_ID, Injector } from '@angular/core';
import { AgendaService } from './agenda.service';
import { Agenda } from '../shared/models/agenda.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { StatusModalComponent } from './status-modal.component';
import { EditPriceModalComponent } from './edit-price-modal.component';

@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.scss']
})
export class AgendaComponent implements OnInit {

  isAuthorized: boolean;
  username: string;
  agenda: Agenda[];
  agendaId: string;
  errors: any[];
  isErrorConnection: boolean;
  isGoingToBeCanceled: boolean;
  isGoingToBeConfirmed: boolean;
  isGoingToBeFinished: boolean;
  allowPopupModal: any;
  constructor(
    private agendaService: AgendaService,
    private modalService: NgbModal
  ) { }

  ngOnInit() {
    this.agenda = [{
      id: null,
      user: {},
      stadium: {},
      hour: null,
      day: null,
      status: null,
      price: null,
      created_at: null
    }];
    this.errors = [];
    this.isAuthorized = false;
    this.isErrorConnection = false;
    this.isGoingToBeCanceled = false;
    this.isGoingToBeConfirmed = false;
    this.isGoingToBeFinished = false;

    if (localStorage.getItem('id_user')) {
      this.isAuthorized = true;
      this.username = localStorage.getItem('username');
      this.getAgenda();
    }
  }

  private getAgenda() {
    this.agendaService.getAgenda().subscribe(
      (agenda) => {
        this.isErrorConnection = false;
        this.agenda = agenda;
      },
      err => {
        console.log(err);
        this.isErrorConnection = true;
        this.errors.push('Ha ocurrido un error en la conexión, contactese con el Admin.');
      });
  }

  changeStatus(id, status) {
    this.agendaId = id;
    this.allowPopupModal = this.modalService.open(StatusModalComponent);
    this.allowPopupModal.componentInstance.id = id;
    this.allowPopupModal.componentInstance.status = status;
    this.allowPopupModal.result.then((result) => {
      }, () => {
        this.getAgenda();  
    });
  }

  statusUpdated(status) {
    this.agendaService.updateAgenda(this.agendaId, status).subscribe(
      () => {
        this.errors = [];
        this.isGoingToBeCanceled = false;
        this.isGoingToBeConfirmed = false;
        this.isGoingToBeFinished = false;
        this.getAgenda();
      },
      err => {
        this.isErrorConnection = true;
        this.isGoingToBeCanceled = false;
        this.isGoingToBeConfirmed = false;
        this.isGoingToBeFinished = false;
        this.errors.push('Ha ocurrido un error en la conexión, contactese con el Admin.');
      });
  }

  editPrice(agendaObj) {
    this.allowPopupModal = this.modalService.open(EditPriceModalComponent);
    this.allowPopupModal.componentInstance.agenda = agendaObj;
  }

  hideAlert(status) {
    if (status === 'cancel') {
      this.isGoingToBeCanceled = false;
    }

    if (status === 'confirm') {
      this.isGoingToBeConfirmed = false;
    }

    if (status === 'finish') {
      this.isGoingToBeFinished = false;
    }
  }
}

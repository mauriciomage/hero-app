import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AgendaService } from './agenda.service';

@Component({
  selector: 'app-status-modal',
  templateUrl: './status-modal.component.html',
  styleUrls: ['./status-modal.component.scss']
})
export class StatusModalComponent implements OnInit {

  isErrorConnection: boolean;
  isAgendaUpdated: boolean;
  statusTranslated: string;
  errors: any[];
  @Input() status: string;
  @Input() id: string;

  constructor(
    public modalReference: NgbActiveModal,
    private agendaService: AgendaService
  ) { }

  ngOnInit() {
    this.statusTranslated = '';
    this.isErrorConnection = false;
    this.isAgendaUpdated = false;
    this.errors = [];
    this.translateStatus(this.status);
  }

  updateStatus() {
      this.agendaService.updateAgenda(this.id, this.status).subscribe(
      () => {
        this.errors = [];
        this.isAgendaUpdated = true;
        setTimeout(() => {
          this.modalReference.dismiss();
       }, 3000);
      },
      err => {
        this.isErrorConnection = true;
        this.isAgendaUpdated = false;
        this.errors.push('Ha ocurrido un error en la conexión, contactese con el Admin.');
      });
  }

  dismiss() {
    this.modalReference.dismiss();
  }

  private translateStatus(status) {
    switch (status) {
      case 'confirmed': {
        this.statusTranslated = 'CONFIRMADO';
        break;
      }
      case 'finished': {
        this.statusTranslated = 'FINALIZADO';
        break;
      }
      case 'canceled': {
        this.statusTranslated = 'CANCELADO';
        break;
      }
    }
  }
}

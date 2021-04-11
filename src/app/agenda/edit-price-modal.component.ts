import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AgendaService } from './agenda.service';
import { User } from '../shared/models/user.model';
import { Agenda } from '../shared/models/agenda.model';

@Component({
  selector: 'app-edit-price-modal',
  templateUrl: './edit-price-modal.component.html',
  styleUrls: ['./edit-price-modal.component.scss']
})
export class EditPriceModalComponent implements OnInit {

  isErrorConnection: boolean;
  isPriceEdited: boolean;
  isFieldEmpty: boolean;
  errors: any[];
  @Input() agenda: Agenda;

  constructor(
    public modalReference: NgbActiveModal,
    private service: AgendaService
  ) { }

  ngOnInit() {
    this.isErrorConnection = false;
    this.isPriceEdited = false;
    this.errors = [];
  }

  editPrice() {
    console.log('agenda', this.agenda);
    this.service.editPrice(this.agenda).subscribe(
    (response) => {
    if (response === 'ERROR_CONNECTION') {
        this.isErrorConnection = true;
        this.isPriceEdited = false;
        this.errors.push('Ha ocurrido un error en la conexión, contactese con el Admin.');
    } else if (response === 'AGENDA_UPDATED') {
        this.isErrorConnection = false;
        this.errors = [];
        this.isPriceEdited = true;
    }
    },
    err => {
    this.isErrorConnection = true;
    this.isPriceEdited = false;
    this.errors.push('Ha ocurrido un error en la conexión, contactese con el Admin.');
    });
  }

  dismiss() {
    this.modalReference.dismiss();
  }

  close() {
    this.service.getAgenda();
    this.modalReference.close();
  }
}

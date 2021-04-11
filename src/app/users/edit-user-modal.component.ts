import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UsersService } from './users.service';
import { User } from '../shared/models/user.model';

@Component({
  selector: 'app-edit-user-modal',
  templateUrl: './edit-user-modal.component.html',
  styleUrls: ['./edit-user-modal.component.scss']
})
export class EditUserModalComponent implements OnInit {

  isErrorConnection: boolean;
  isUserEdited: boolean;
  isSomeFieldEmpty: boolean;
  errors: any[];
  @Input() user: User;

  constructor(
    public modalReference: NgbActiveModal,
    private userService: UsersService
  ) { }

  ngOnInit() {
    this.isErrorConnection = false;
    this.isUserEdited = false;
    this.isSomeFieldEmpty = false;
    this.errors = [];
  }

  editUser() {
    if (this.user.city === '' || this.user.email === '' || this.user.phone === '' || this.user.username === '') {
      this.isSomeFieldEmpty = true;
    } else {
      this.isSomeFieldEmpty = false;

      this.userService.edit(this.user).subscribe(
      (response) => {
        if (response === 'ERROR_CONNECTION') {
          this.isErrorConnection = true;
          this.isUserEdited = false;
          this.errors.push('Ha ocurrido un error en la conexión, contactese con el Admin.');
        } else if (response === 'USER_UPDATED') {
          this.isErrorConnection = false;
          this.errors = [];
          this.isUserEdited = true;
        }
      },
      err => {
        this.isErrorConnection = true;
        this.isUserEdited = false;
        this.errors.push('Ha ocurrido un error en la conexión, contactese con el Admin.');
      });
    }
  }

  dismiss() {
    this.modalReference.dismiss();
  }

  close() {
    this.userService.getAllUsers();
    this.modalReference.close();
  }
}

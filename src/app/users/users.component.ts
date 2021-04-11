import { Component, OnInit } from '@angular/core';
import { UsersService } from './users.service';
import { User } from '../shared/models/user.model';
import { EditUserModalComponent } from './edit-user-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
// import { DeleteUserModalComponent } from './delete-user-modal.component.';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  constructor(
    private usersService: UsersService,
    private modalService: NgbModal
  ) {}

  allowPopupModal: any;
  username: string;
  isAuthorized: boolean;
  users: User[];
  errors: any[];
  isErrorConnection: boolean;

  ngOnInit() {
    this.errors = [];
    this.users = [];
    this.isErrorConnection = false;
    this.isAuthorized = false;
    if (localStorage.getItem('id_user')) {
      this.isAuthorized = true;
      this.username = localStorage.getItem('username');
      this.getUsers();
    }
  }

  editUser(user) {
    this.allowPopupModal = this.modalService.open(EditUserModalComponent);
    this.allowPopupModal.componentInstance.user = user;
  }

  deleteUser(user) {
    // this.allowPopupModal = this.modalService.open(DeleteUserModalComponent);
    // this.allowPopupModal.componentInstance.user = user;
  }

  private getUsers() {
    this.usersService.getAllUsers().subscribe(
      (users) => {
        this.isErrorConnection = false;
        this.users = users;
      },
      err => {
        console.log(err);
        this.isErrorConnection = true;
        this.errors.push('Ha ocurrido un error en la conexión, contactese con el Admin.');
      });
  }
}

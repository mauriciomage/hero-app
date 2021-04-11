import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { User } from '../shared/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

  getAllUsers(): Observable<any> {
    return this.http.get(`${environment.api_local}/api/users`);
  }

  edit(user: User): Observable<any> {
    return this.http.post(`${environment.api_local}/api/edit/user`, {
        user
    });
  }

  delete(user: User): Observable<any> {
    return this.http.post(`${environment.api_local}/api/delete/user`, {
        user
    });
  }
}

import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { User } from '../shared/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class RegisterUsersService {

  constructor(private http: HttpClient) { }

  newUser(user: User): Observable<any> {
    return this.http.post(`${environment.api_local}/api/new/user`, {
        user
    });
  }
}

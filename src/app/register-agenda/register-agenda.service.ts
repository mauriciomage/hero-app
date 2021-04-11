import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Agenda } from '../shared/models/agenda.model';

@Injectable({
  providedIn: 'root'
})
export class RegisterAgendaService {

  constructor(
    private http: HttpClient
  ) { }

  getResultSearchUser(user): Observable<any> {
    return this.http.post(`${environment.api_local}/api/searchUsers`, {
      user
    });
  }

  getDailyAgenda(day, stadium): Observable<any> {
    return this.http.post(`${environment.api_local}/api/agenda/day`, {
      day,
      stadium
    });
  }

  newAgenda(agenda: Agenda): Observable<any> {
    return this.http.post(`${environment.api_local}/api/new/agenda`, {
        agenda
    });
  }
}

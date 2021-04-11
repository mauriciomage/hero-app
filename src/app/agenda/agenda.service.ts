import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Agenda } from '../shared/models/agenda.model';

@Injectable({
  providedIn: 'root'
})
export class AgendaService {

  constructor(private http: HttpClient) { }

  getAgenda(limit= null): Observable<any> {
    const params = new HttpParams().set('limit', limit);
    return this.http.get(`${environment.api_local}/api/agenda`, {params});
  }

  updateAgenda(agenda, status): Observable<any> {
    return this.http.post(`${environment.api_local}/api/update/agenda`, {
      agenda,
      status
  });
  }

  editPrice(agenda: Agenda): Observable<any> {
    return this.http.post(`${environment.api_local}/api/agenda/price`, {
        agenda
    });
  }
}

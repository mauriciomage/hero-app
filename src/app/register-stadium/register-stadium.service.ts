import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Stadium } from '../shared/models/stadium-model';


@Injectable({
  providedIn: 'root'
})
export class RegisterStadiumService {

  constructor(
    private http: HttpClient
  ) { }

  getAllStadiums(): Observable<any> {
    return this.http.get(`${environment.api_local}/api/stadiums`);
  }

  newStadium(stadium: Stadium): Observable<any> {
    return this.http.post(`${environment.api_local}/api/new/stadium`, {
        stadium
    });
  }
}

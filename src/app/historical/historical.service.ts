import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HistoricalService {

  constructor(private http: HttpClient) { }

  getHistorical(filter = null, value = null): Observable<any> {
    if (filter === 'bySport') {
      const params = new HttpParams().set('value', value);
      return this.http.get(`${environment.api_local}/api/historical/bySport`, {params});
    } else if (filter === 'byCity') {
      const params = new HttpParams().set('value', value);
      return this.http.get(`${environment.api_local}/api/historical/byCity`, {params});
    } else {
      const params = null;
      return this.http.get(`${environment.api_local}/api/historical`, {params});
    }
  }

  getHistoricalByDate(dayStart, dayFinish): Observable<any> {
    const params = new HttpParams().set('from', dayStart)
    .set('to', dayFinish);
    return this.http.get(`${environment.api_local}/api/historical/byDate`, {params});
  }

  getSports(): Observable<any> {
    return this.http.get(`${environment.api_local}/api/stadiums/sports`);
  }

  getCities(): Observable<any> {
    return this.http.get(`${environment.api_local}/api/stadiums/cities`);
  }

  asign(award, user, createAt) {
    return this.http.post(`${environment.api_local}/api/award/asigned`, {
      award,
      user,
      createAt
  });
  }
}

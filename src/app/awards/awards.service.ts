import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AwardsService {

  constructor(private http: HttpClient) { }

  getAwards(): Observable<any> {
    return this.http.get(`${environment.api_local}/api/awards`);
  }
}

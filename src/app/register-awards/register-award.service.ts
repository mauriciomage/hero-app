import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Award } from '../shared/models/awards.model';

@Injectable({
  providedIn: 'root'
})
export class RegisterAwardService {

  constructor(
    private http: HttpClient
  ) { }

  newAward(award: Award): Observable<any> {
    return this.http.post(`${environment.api_local}/api/new/award`, {
        award
    });
  }
}

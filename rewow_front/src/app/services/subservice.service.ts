import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { enviroment } from 'src/enviroment/enviroment';
import { Subservice } from '../interfaces/subservice';

@Injectable({
  providedIn: 'root',
})
export class SubserviceService {
  constructor(private httpclient: HttpClient) {}

  private urlAPI = enviroment.urlEndPoint;

  listSubservice(): Observable<Subservice[]> {
    return this.httpclient.get<Subservice[]>(this.urlAPI + '/subservice');
  }
}

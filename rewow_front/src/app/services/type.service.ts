import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { enviroment } from 'src/enviroment/enviroment';
import { Type } from '../interfaces/type';

@Injectable({
  providedIn: 'root',
})
export class TypeService {
  constructor(private httpclient: HttpClient) {}

  private urlAPI = enviroment.urlEndPoint;

  listType(): Observable<Type[]> {
    return this.httpclient.get<Type[]>(this.urlAPI + '/type');
  }
}

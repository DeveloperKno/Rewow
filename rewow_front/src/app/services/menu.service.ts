import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Menu } from '../interfaces/menu';
import { enviroment } from 'src/enviroment/enviroment';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  constructor(private httpclient: HttpClient) {}

  private urlAPI = enviroment.urlEndPoint;

  getMenu(): Observable<Menu[]> {
    return this.httpclient.get<Menu[]>('./assets/data/menu.json');
  }

  listMenu(): Observable<Menu[]> {
    return this.httpclient.get<Menu[]>(this.urlAPI + '/menu/');
  }
}

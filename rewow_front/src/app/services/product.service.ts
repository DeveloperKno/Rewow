import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { enviroment } from 'src/enviroment/enviroment';
import { Product } from '../interfaces/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private httpclient: HttpClient) {}

  private urlAPI = enviroment.urlEndPoint;

  listProduct(): Observable<Product[]> {
    return this.httpclient.get<Product[]>(this.urlAPI + '/product');
  }
}

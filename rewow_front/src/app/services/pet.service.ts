import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { enviroment } from 'src/enviroment/enviroment';
import { Pet } from '../interfaces/pet';

@Injectable({
  providedIn: 'root',
})
export class PetService {
  constructor(private httpclient: HttpClient) {}

  private urlAPI = enviroment.urlEndPoint;

  listPet(): Observable<Pet[]> {
    return this.httpclient.get<Pet[]>(this.urlAPI + '/pet');
  }

  addPet(pet: Pet) {
    return this.httpclient.post(this.urlAPI + '/pet', pet);
  }

  editPet(id: any, pet: Pet): Observable<Pet> {
    return this.httpclient.put<Pet>(this.urlAPI + '/pet/' + id, pet);
  }

  deletePet(id: any): Observable<Pet> {
    return this.httpclient.delete<Pet>(this.urlAPI + '/pet/' + id);
  }

  listHistory(): Observable<any> {
    return this.httpclient.get<any>(this.urlAPI + '/petAppointment');
  }
}

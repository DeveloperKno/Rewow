import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { enviroment } from 'src/enviroment/enviroment';
import { Schedule } from '../interfaces/schedule';

@Injectable({
  providedIn: 'root',
})
export class ScheduleService {
  constructor(private httpclient: HttpClient) {}

  private urlAPI = enviroment.urlEndPoint;

  listSchedule(): Observable<Schedule[]> {
    return this.httpclient.get<Schedule[]>(this.urlAPI + '/schedule');
  }

  addAppointment(schedule: Schedule) {
    return this.httpclient.post(this.urlAPI + '/schedule', schedule);
  }
}

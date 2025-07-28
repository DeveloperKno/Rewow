import { Component, OnInit } from '@angular/core';
import { Schedule } from 'src/app/interfaces/schedule';
import { ScheduleService } from 'src/app/services/schedule.service';
import { CreateEditAppoinmentComponent } from './create-edit-appoinment/create-edit-appoinment.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-schedules',
  templateUrl: './schedules.component.html',
  styleUrls: ['./schedules.component.css'],
})
export class SchedulesComponent implements OnInit {
  public listSchedule: Schedule[] = [];
  pageSize = 2;
  currentPage = 1;

  constructor(
    private _scheduleService: ScheduleService,
    public dialog: MatDialog
  ) {}
  ngOnInit() {
    this.loadSchedule();
  }

  loadSchedule() {
    this._scheduleService.listSchedule().subscribe({
      next: (response) => {
        this.listSchedule = response;
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  newAppointment(selected?: any) {
    this.dialog
      .open(CreateEditAppoinmentComponent, {
        disableClose: true,
        width: '40%',
        height: '60%',
        data: selected,
      })
      .afterClosed()
      .subscribe((result) => {
        this.loadSchedule();
      });
  }
}

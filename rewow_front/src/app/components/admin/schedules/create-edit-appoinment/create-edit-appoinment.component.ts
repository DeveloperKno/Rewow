import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Pet } from 'src/app/interfaces/pet';
import { Schedule } from 'src/app/interfaces/schedule';
import { Subservice } from 'src/app/interfaces/subservice';
import { PetService } from 'src/app/services/pet.service';
import { ScheduleService } from 'src/app/services/schedule.service';
import { SubserviceService } from 'src/app/services/subservice.service';

@Component({
  selector: 'app-create-edit-appoinment',
  templateUrl: './create-edit-appoinment.component.html',
  styleUrls: ['./create-edit-appoinment.component.css'],
})
export class CreateEditAppoinmentComponent implements OnInit {
  selectedDate: Date | null = null;
  selectedTime: string = '';
  selectedOption: number = 0;
  public listSubservice: Subservice[] = [];
  public listPet: Pet[] = [];
  selectPet: number = 0;

  selectedHour: string = '';
  hours: string[] = [];
  todayDate: Date = new Date();
  form: FormGroup;

  constructor(
    private dialogReference: MatDialogRef<CreateEditAppoinmentComponent>,
    private _subservice: SubserviceService,
    private _petservice: PetService,
    private _SnackBar: MatSnackBar,
    private _scheduleService: ScheduleService,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      pet_id: [0, [Validators.required]],
      subservice_id: [0, [Validators.required]],
      date: ['', [Validators.required]],
      hour: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.hours = this.hourOptions();
    this.todayDate.setHours(0, 0, 0, 0);
    this.loadSubservice();
    this.loadPet();
  }

  loadSubservice() {
    this._subservice.listSubservice().subscribe({
      next: (res) => (this.listSubservice = res),
      error: (err) => {
        console.error('Error al cargar tipos de mascota', err);
      },
    });
  }

  loadPet() {
    this._petservice.listPet().subscribe({
      next: (res) => (this.listPet = res),
      error: (err) => {
        console.error('Error al cargar tipos de mascota', err);
      },
    });
  }

  selectOnlyOne(opcion: number) {
    this.selectedOption = opcion;
  }

  hourOptions(): string[] {
    const options: string[] = [];
    for (let i = 7; i <= 17; i++) {
      const hour = i.toString().padStart(2, '0');
      options.push(`${hour}:00`);
    }
    return options;
  }

  formatearFecha(fecha: Date): string {
    const year = fecha.getFullYear();
    const month = String(fecha.getMonth() + 1).padStart(2, '0'); // enero = 0
    const day = String(fecha.getDate()).padStart(2, '0');
    const hours = this.form.value.hour;
    const seconds = String(fecha.getSeconds()).padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${seconds}`;
  }

  saveAppointment(): void {
    if (!this.form.valid) {
      return;
    }

    const appointment: Schedule = {
      pet_id: this.form.value.pet_id.id,
      subservice_id: this.form.value.subservice_id,
      date: this.formatearFecha(this.form.value.date),
    };

    this._scheduleService.addAppointment(appointment).subscribe({
      next: () => {
        console.log('Cita agendada con éxito');
        this.form.reset();
        this.showMessage('Cita registrada con exito!', 'Listo');
        this.dialogReference.close();
      },
      error: (err) => {
        console.error('Error al guardar la cita', err);
      },
    });
  }

  showMessage(msg: string, action: string) {
    this._SnackBar.open(msg, action, {
      horizontalPosition: 'end',
      verticalPosition: 'top',
      duration: 2000,
    });
  }
}

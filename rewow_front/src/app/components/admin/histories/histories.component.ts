import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Pet } from 'src/app/interfaces/pet';
import { Schedule } from 'src/app/interfaces/schedule';
import { PetService } from 'src/app/services/pet.service';
import { ScheduleService } from 'src/app/services/schedule.service';

@Component({
  selector: 'app-histories',
  templateUrl: './histories.component.html',
  styleUrls: ['./histories.component.css'],
})
export class HistoriesComponent implements OnInit {
  public listPet: Pet[] = [];
  public listAppointment: Schedule[] = [];
  form: FormGroup;
  public history: any[] = [];

  constructor(
    private _petService: PetService,
    private _scheduleService: ScheduleService,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      pet: [null],
    });
  }

  ngOnInit(): void {
    this.loadPet();

    this.form.get('pet')?.valueChanges.subscribe((pet) => {
      if (pet) {
        this.history = pet.history || [];
      } else {
        this.history = [];
      }
    });
  }

  loadPet() {
    this._petService.listHistory().subscribe({
      next: (res) => ((this.listPet = res), console.log('pets: ', res)),
      error: (err) => {
        console.error('Error al cargar tipos de mascota', err);
      },
    });
  }
}

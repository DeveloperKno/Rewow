import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Pet } from 'src/app/interfaces/pet';
import { Type } from 'src/app/interfaces/type';
import { PetService } from 'src/app/services/pet.service';
import { TypeService } from 'src/app/services/type.service';

@Component({
  selector: 'app-create-edit-pet',
  templateUrl: './create-edit-pet.component.html',
  styleUrls: ['./create-edit-pet.component.css'],
})
export class CreateEditPetComponent implements OnInit {
  public listTypes: Type[] = [];
  form: FormGroup;
  titleAccion: string = 'Nuevo';
  buttonAccion: string = 'Guardar';
  size: string = '';

  constructor(
    private dialogRef: MatDialogRef<CreateEditPetComponent>,
    private fb: FormBuilder,
    private _petService: PetService,
    private _typeService: TypeService,
    private _snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public selected: Pet
  ) {
    this.form = this.fb.group({
      owner_name: ['', [Validators.required, Validators.minLength(5)]],
      name: ['', Validators.required],
      type_id: ['', Validators.required],
      size_id: ['', Validators.required],
      description: [''],
    });
  }

  ngOnInit(): void {
    this.loadType();
    if (this.selected) {
      this.form.patchValue(this.selected);
      this.titleAccion = 'Editar';
      this.buttonAccion = 'Actualizar';
    }
  }

  loadType() {
    this._typeService.listType().subscribe({
      next: (res) => (this.listTypes = res),
      error: (err) => {
        console.error('Error al cargar tipos de mascota', err);
        this.showMessage('Error al cargar tipos', 'Error');
      },
    });
  }

  savePet(): void {
    if (this.form.invalid) return;

    const pet: Pet = this.form.value;

    const obs = this.selected
      ? this._petService.editPet(this.selected.id, pet)
      : this._petService.addPet(pet);

    obs.subscribe({
      next: () => {
        this.form.reset();
        const mensaje = this.selected
          ? 'Actualización de la mascota exitosa!'
          : 'La mascota fue agregada con éxito';
        this.showMessage(mensaje, 'Listo');
        this.dialogRef.close(this.selected ? 'editado' : 'creado');
      },
      error: () => {
        const mensaje = this.selected
          ? 'No se logró editar la mascota!'
          : 'No se logró agregar la mascota!';
        this.showMessage(mensaje, 'Error');
      },
    });
  }

  showMessage(msg: string, action: string) {
    this._snackBar.open(msg, action, {
      horizontalPosition: 'end',
      verticalPosition: 'top',
      duration: 2000,
    });
  }
}

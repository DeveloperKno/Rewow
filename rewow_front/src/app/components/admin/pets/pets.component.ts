import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Pet } from 'src/app/interfaces/pet';
import { PetService } from 'src/app/services/pet.service';
import Swal from 'sweetalert2';
import { CreateEditPetComponent } from './create-edit-pet/create-edit-pet.component';

@Component({
  selector: 'app-pets',
  templateUrl: './pets.component.html',
  styleUrls: ['./pets.component.css'],
})
export class PetsComponent implements AfterViewInit, OnInit {
  displayedColumns: string[] = [
    'code',
    'owner',
    'name',
    'type',
    'size',
    'description',
    'acciones',
  ];

  dataSource = new MatTableDataSource<Pet>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  constructor(
    private _petService: PetService,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {}
  ngOnInit(): void {
    this.loadPets();
  }

  optionPet(selected?: Pet) {
    this.dialog
      .open(CreateEditPetComponent, {
        disableClose: true,
        width: '40%',
        height: '60%',
        data: selected,
      })
      .afterClosed()
      .subscribe((result) => {
        this.loadPets();
      });
  }

  loadPets() {
    this._petService.listPet().subscribe({
      next: (response) => {
        this.dataSource.data = response;
      },
      error: (err) => {
        console.error(err);
        this._snackBar.open('Error al cargar las mascotas', 'Cerrar', {
          duration: 3000,
        });
      },
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  deletePet(id: number) {
    Swal.fire({
      title: 'Desea eliminar la mascota?',
      text: 'Despues no podrá revertirlo!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#875687',
      cancelButtonColor: '#c8d24c',
      confirmButtonText: 'Si',
    }).then((result) => {
      if (result.isConfirmed) {
        this._petService.deletePet(id).subscribe({
          next: (data) => {
            Swal.fire({
              icon: 'success',
              title: 'Eliminado!',
              text: 'Se elímino la mascota!',
              showConfirmButton: false,
              timer: 1500,
            });
          },
          error: (error) => {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: error.error.message,
              showConfirmButton: false,
              timer: 1500,
            });
          },
          complete: () => {
            this.loadPets();
          },
        });
      }
    });
  }
}

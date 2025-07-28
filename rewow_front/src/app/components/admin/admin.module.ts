import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { SharedModule } from '../shared/shared.module';
import { AdminComponent } from './admin.component';
import { InicioComponent } from './inicio/inicio.component';
import { NavbarComponent } from './navbar/navbar.component';
import { PetsComponent } from './pets/pets.component';
import { CreateEditPetComponent } from './pets/create-edit-pet/create-edit-pet.component';
import { HistoriesComponent } from './histories/histories.component';
import { SchedulesComponent } from './schedules/schedules.component';
import { CreateEditAppoinmentComponent } from './schedules/create-edit-appoinment/create-edit-appoinment.component';
import { StoreComponent } from './store/store.component';

@NgModule({
  declarations: [
    AdminComponent,
    InicioComponent,
    NavbarComponent,
    PetsComponent,
    CreateEditPetComponent,
    HistoriesComponent,
    SchedulesComponent,
    CreateEditAppoinmentComponent,
    StoreComponent,
  ],
  imports: [CommonModule, AdminRoutingModule, SharedModule],
})
export class AdminModule {}

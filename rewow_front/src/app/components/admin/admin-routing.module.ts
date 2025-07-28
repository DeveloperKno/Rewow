import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { InicioComponent } from './inicio/inicio.component';
import { PetsComponent } from './pets/pets.component';
import { HistoriesComponent } from './histories/histories.component';
import { SchedulesComponent } from './schedules/schedules.component';
import { StoreComponent } from './store/store.component';
import { AuthGuard } from 'src/app/auth/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: InicioComponent },
      { path: 'pets', component: PetsComponent },
      { path: 'histories', component: HistoriesComponent },
      { path: 'schedules', component: SchedulesComponent },
      { path: 'store', component: StoreComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}

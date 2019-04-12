import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent }   from './login/login.component';
import { AuthGuard } from './guards/auth.guards';
import { ManufacturerComponent } from './manufacturer/manufacturer.component';
import { VehicleComponent } from './vehicles/vehicle.component';
import { ListvehiclesComponent } from './vehicles/listvehicles.component';
const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '*', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent, data: {title: 'Mini Care Inventory System::Login'} }, 
  { path: 'manufacturer', component: ManufacturerComponent,canActivate: [AuthGuard], data: { title: 'Mini Care Inventory System::Manufacturer' } },
  { path: 'vehicles', component: ListvehiclesComponent,canActivate: [AuthGuard], data: { title: 'Mini Care Inventory System::Vehicles List' } },
  { path: 'vehicle/add', component: VehicleComponent,canActivate: [AuthGuard], data: { title: 'Mini Care Inventory System::Manufacturer' } }	
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}


import { NgModule } from '@angular/core';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';

import { SirComponent } from './componentes/pages/sir/sir.component';
import { HomeComponent } from './componentes/pages/home/home.component';
import { LoginComponent } from './componentes/pages/login/login.component';
import { HomeSirComponent } from './componentes/pages/home-sir/home-sir.component';
import { Page404Component } from './componentes/pages/page404/page404.component';
import { RegisterComponent } from './componentes/pages/register/register.component';
import { PersonalComponent } from './componentes/pages/personal/personal.component';
import { EquipamientoComponent } from './componentes/pages/personal/equipamiento/equipamiento.component';
import { ContratosComponent } from './componentes/pages/personal/contratos/contratos.component';
import { VacacionesComponent } from './componentes/pages/personal/vacaciones/vacaciones.component';
import { HomepersonalComponent } from './componentes/pages/personal/homepersonal/homepersonal.component';
import { VehiculosComponent } from './componentes/pages/vehiculos/vehiculos.component';
import { TenenciasComponent } from './componentes/pages/vehiculos/tenencias/tenencias.component';
import { VerificacionesComponent } from './componentes/pages/vehiculos/verificaciones/verificaciones.component';
import { SegurosComponent } from './componentes/pages/vehiculos/seguros/seguros.component';
import { HomevehiculosComponent } from './componentes/pages/vehiculos/homevehiculos/homevehiculos.component';
import { LicenciasComponent } from './componentes/pages/licencias/licencias.component';
import { SeepersonalComponent } from './componentes/pages/personal/homepersonal/seepersonal/seepersonal.component';
import { UpdatepersonalComponent } from './componentes/pages/personal/homepersonal/updatepersonal/updatepersonal.component';
import { VehicleseeComponent } from './componentes/pages/vehiculos/vehiclesee/vehiclesee.component';
import { VehiclesupdateComponent } from './componentes/pages/vehiculos/vehiclesupdate/vehiclesupdate.component';
import { SeeequipamentComponent } from './componentes/pages/personal/equipamiento/seeequipament/seeequipament.component';
import { EditequipmentComponent } from './componentes/pages/personal/equipamiento/editequipment/editequipment.component';
import { SeecontratComponent } from './componentes/pages/personal/contratos/seecontrat/seecontrat.component';
import { EditcontratComponent } from './componentes/pages/personal/contratos/editcontrat/editcontrat.component';
import { SalariosComponent } from './componentes/pages/personal/salarios/salarios.component';
import { SalaryeditComponent } from './componentes/pages/personal/salarios/salaryedit/salaryedit.component';
import { SalaryseeComponent } from './componentes/pages/personal/salarios/salarysee/salarysee.component';
import { SeetenenciaComponent } from './componentes/pages/vehiculos/tenencias/seetenencia/seetenencia.component';
import { TenenciaeditComponent } from './componentes/pages/vehiculos/tenencias/tenenciaedit/tenenciaedit.component';
import { SeeVerificacionComponent } from './componentes/pages/vehiculos/verificaciones/see-verificacion/see-verificacion.component';
import { EditVerificacionComponent } from './componentes/pages/vehiculos/verificaciones/edit-verificacion/edit-verificacion.component';
import { SeguroEditComponent } from './componentes/pages/vehiculos/seguros/seguro-edit/seguro-edit.component';
import { SeeSeguroComponent } from './componentes/pages/vehiculos/seguros/see-seguro/see-seguro.component';
import { HomeLicenciaComponent } from './componentes/pages/licencias/home-licencia/home-licencia.component';
import { GarantiasComponent } from './componentes/pages/licencias/garantias/garantias.component';
import { ServiciosComponent } from './componentes/pages/licencias/servicios/servicios.component';
import { DatesComponent } from './componentes/pages/licencias/dates/dates.component';
import { Sub_LicenciasComponent } from './componentes/pages/licencias/sub_licencias/sub_licencias.component';
import { SeeLicenciaComponent } from './componentes/pages/licencias/sub_licencias/see-licencia/see-licencia.component';
import { EditLicenciaComponent } from './componentes/pages/licencias/sub_licencias/edit-licencia/edit-licencia.component';

const routes: Routes = [

  {
    path: 'SirHome', component: HomeSirComponent, data: { title: 'Index Panel' },
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent },
      { path: '**', component: Page404Component }
    ]
  },
  {
    path: 'SirHomeAdmin', component: SirComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'register', component: RegisterComponent },
      {
        path: 'staffadm', component: PersonalComponent, data: { title: 'Personal' },
        children: [
          { path: '', redirectTo: 'homestaff', pathMatch: 'full' },
          { path: 'equipamiento', component: EquipamientoComponent },
          { path: 'contratos', component: ContratosComponent },
          { path: 'salarios', component: SalariosComponent },
          { path: 'vacaciones', component: VacacionesComponent },
          { path: 'homestaff', component: HomepersonalComponent },
          { path: 'staffsee/:id', component: SeepersonalComponent },
          { path: 'staffupdate/:id', component: UpdatepersonalComponent },
          { path: 'equipmentssee/:id', component: SeeequipamentComponent },
          { path: 'EquipamentEdit/:id', component: EditequipmentComponent },
          { path: 'ContratEdit/:id', component: EditcontratComponent },
          { path: 'ContratSee/:id', component: SeecontratComponent },
          { path: 'SalaryEdit/:id', component: SalaryeditComponent },
          { path: 'SalarySee/:id', component: SalaryseeComponent },
          { path: '**', component: Page404Component }
        ]
      },
      {
        path: 'vehiculosadm', component: VehiculosComponent, data: { title: 'Vehiculos' },
        children: [
          { path: '', redirectTo: 'homevehiculos', pathMatch: 'full' },
          { path: 'tenencias', component: TenenciasComponent },
          { path: 'seetenencia/:id', component: SeetenenciaComponent },
          { path: 'TenenciaEdit/:id', component: TenenciaeditComponent },
          { path: 'seeVerificacion/:id', component: SeeVerificacionComponent },
          { path: 'VerificacionEdit/:id', component: EditVerificacionComponent },
          { path: 'verificaciones', component: VerificacionesComponent },
          { path: 'seguros', component: SegurosComponent },
          { path: 'seeSeguro/:id', component: SeeSeguroComponent },
          { path: 'SeguroEdit/:id', component: SeguroEditComponent },
          { path: 'homevehiculos', component: HomevehiculosComponent },
          { path: 'vehiclesee/:id', component: VehicleseeComponent },
          { path: 'vehicleupdate/:id', component: VehiclesupdateComponent },
          { path: '**', component: Page404Component }
        ]
      },
      {
        path: 'licenciasadm', component: LicenciasComponent,
        children: [
          { path: '', redirectTo: 'homeLicences', pathMatch: 'full'},
          { path: 'homeLicences', component: HomeLicenciaComponent},
          { path: 'See/:id', component: SeeLicenciaComponent},
          { path: 'Edit/:id', component: EditLicenciaComponent},
          { path: 'garantias', component: GarantiasComponent },
          { path: 'servicios', component: ServiciosComponent},
          { path: 'licencias', component: Sub_LicenciasComponent},
          { path: 'fechas', component: DatesComponent},
        ]
      },

      { path: 'home', component: HomeComponent },
      { path: '**', component: Page404Component }
    ]
  },
  { path: '', redirectTo: '**', pathMatch: 'full' },
  { path: '**', component: LoginComponent }
];

const options: ExtraOptions = {
  enableTracing: false,
  onSameUrlNavigation: 'reload'
}



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

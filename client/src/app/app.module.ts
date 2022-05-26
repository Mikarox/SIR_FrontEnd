import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

import localES from '@angular/common/locales/es'
import { registerLocaleData } from '@angular/common';
registerLocaleData(localES, 'es');

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

//Servicios
import { UserService } from './services/user_service/user.service';
import { PersonalService } from './services/personal_service/personal.service';

//componentes
import { LoginComponent } from './componentes/pages/login/login.component';
import { Page404Component } from './componentes/pages/page404/page404.component';
import { HomeSirComponent } from './componentes/pages/home-sir/home-sir.component';
import { AdminnavComponent } from './componentes/nav/adminnav/adminnav.component';
import { HomeComponent } from './componentes/pages/home/home.component';
import { NavComponent } from './componentes/nav/nav/nav.component';
import { SirComponent } from './componentes/pages/sir/sir.component';
import { RegisterComponent } from './componentes/pages/register/register.component';
import { PersonalComponent } from './componentes/pages/personal/personal.component';
import { VehiculosComponent } from './componentes/pages/vehiculos/vehiculos.component';
import { PersonalNavComponent } from './componentes/nav/personal-nav/personal-nav.component';
import { EquipamientoComponent } from './componentes/pages/personal/equipamiento/equipamiento.component';
import { VacacionesComponent } from './componentes/pages/personal/vacaciones/vacaciones.component';
import { ContratosComponent } from './componentes/pages/personal/contratos/contratos.component';
import { HomepersonalComponent } from './componentes/pages/personal/homepersonal/homepersonal.component';
import { VehiculosNavComponent } from './componentes/nav/vehiculos-nav/vehiculos-nav.component';
import { HomevehiculosComponent } from './componentes/pages/vehiculos/homevehiculos/homevehiculos.component';
import { TenenciasComponent } from './componentes/pages/vehiculos/tenencias/tenencias.component';
import { VerificacionesComponent } from './componentes/pages/vehiculos/verificaciones/verificaciones.component';
import { SegurosComponent } from './componentes/pages/vehiculos/seguros/seguros.component';
import { LicenciasComponent } from './componentes/pages/licencias/licencias.component';
import { Sub_LicenciasComponent } from './componentes/pages/licencias/sub_licencias/sub_licencias.component';
import { SeepersonalComponent } from './componentes/pages/personal/homepersonal/seepersonal/seepersonal.component';
import { UpdatepersonalComponent } from './componentes/pages/personal/homepersonal/updatepersonal/updatepersonal.component';
import { VehiclesupdateComponent } from './componentes/pages/vehiculos/vehiclesupdate/vehiclesupdate.component';
import { VehicleseeComponent } from './componentes/pages/vehiculos/vehiclesee/vehiclesee.component';
import { SeeequipamentComponent } from './componentes/pages/personal/equipamiento/seeequipament/seeequipament.component';
import { EditequipmentComponent } from './componentes/pages/personal/equipamiento/editequipment/editequipment.component';
import { SeecontratComponent } from './componentes/pages/personal/contratos/seecontrat/seecontrat.component';
import { EditcontratComponent } from './componentes/pages/personal/contratos/editcontrat/editcontrat.component';
import { SalariosComponent } from './componentes/pages/personal/salarios/salarios.component';
import { SalaryseeComponent } from './componentes/pages/personal/salarios/salarysee/salarysee.component';
import { SalaryeditComponent } from './componentes/pages/personal/salarios/salaryedit/salaryedit.component';
import { SeetenenciaComponent } from './componentes/pages/vehiculos/tenencias/seetenencia/seetenencia.component';
import { TenenciaeditComponent } from './componentes/pages/vehiculos/tenencias/tenenciaedit/tenenciaedit.component';
import { SeeVerificacionComponent } from './componentes/pages/vehiculos/verificaciones/see-verificacion/see-verificacion.component';
import { EditVerificacionComponent } from './componentes/pages/vehiculos/verificaciones/edit-verificacion/edit-verificacion.component';
import { SeeSeguroComponent } from './componentes/pages/vehiculos/seguros/see-seguro/see-seguro.component';
import { SeguroEditComponent } from './componentes/pages/vehiculos/seguros/seguro-edit/seguro-edit.component';
import { LicenciasNavComponent } from './componentes/nav/licencias-nav/licencias-nav.component';
import { HomeLicenciaComponent } from './componentes/pages/licencias/home-licencia/home-licencia.component';
import { GarantiasComponent } from './componentes/pages/licencias/garantias/garantias.component';
import { SeeGarantiaComponent } from './componentes/pages/licencias/garantias/see-garantia/see-garantia.component';
import { EditGarantiaComponent } from './componentes/pages/licencias/garantias/edit-garantia/edit-garantia.component';
import { ServiciosComponent } from './componentes/pages/licencias/servicios/servicios.component';
import { SeeServicioComponent } from './componentes/pages/licencias/servicios/see-servicio/see-servicio.component';
import { EditServicioComponent } from './componentes/pages/licencias/servicios/edit-servicio/edit-servicio.component';
import { SeeLicenciaComponent } from './componentes/pages/licencias/sub_licencias/see-licencia/see-licencia.component';
import { EditLicenciaComponent } from './componentes/pages/licencias/sub_licencias/edit-licencia/edit-licencia.component';
import { DatesComponent } from './componentes/pages/licencias/dates/dates.component';
import { EditDateComponent } from './componentes/pages/licencias/dates/edit-date/edit-date.component';
import { SeeDateComponent } from './componentes/pages/licencias/dates/see-date/see-date.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    Page404Component,
    HomeSirComponent,
    AdminnavComponent,
    HomeComponent,
    NavComponent,
    SirComponent,
    RegisterComponent,
    PersonalComponent,
    VehiculosComponent,
    PersonalNavComponent,
    EquipamientoComponent,
    VacacionesComponent,
    ContratosComponent,
    HomepersonalComponent,
    VehiculosNavComponent,
    HomevehiculosComponent,
    TenenciasComponent,
    VerificacionesComponent,
    SegurosComponent,
    LicenciasComponent,
    Sub_LicenciasComponent,
    SeepersonalComponent,
    UpdatepersonalComponent,
    VehicleseeComponent,
    VehiclesupdateComponent,
    SeeequipamentComponent,
    EditequipmentComponent,
    SeecontratComponent,
    EditcontratComponent,
    SalariosComponent,
    SalaryseeComponent,
    SalaryeditComponent,
    SeetenenciaComponent,
    TenenciaeditComponent,
    SeeVerificacionComponent,
    EditVerificacionComponent,
    SeeSeguroComponent,
    SeguroEditComponent,
    LicenciasNavComponent,
    HomeLicenciaComponent,
    GarantiasComponent,
    SeeGarantiaComponent,
    EditGarantiaComponent,
    ServiciosComponent,
    SeeServicioComponent,
    EditServicioComponent,
    SeeLicenciaComponent,
    EditLicenciaComponent,
    DatesComponent,
    EditDateComponent,
    SeeDateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [UserService,PersonalService, {provide: LOCALE_ID, useValue: 'es'}],
  bootstrap: [AppComponent]
})
export class AppModule { }

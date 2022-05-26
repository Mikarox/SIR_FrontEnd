import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { Licencia } from 'src/app/models/Licencia';

@Injectable({
  providedIn: 'root'
})
export class LicenciasService {

  API_URI = 'http://localhost:3000/api'  //Como atributo la dirección del servidor
  constructor(private http: HttpClient) { }

  getLicencias(): Observable<Licencia> {
    return this.http.get(`${this.API_URI}/licencias/list`)
  }
  getLicenciaOne(id: string): Observable<Licencia> {
    return this.http.get(`${this.API_URI}/licencias/${id}`);
  }
  deleteLicencia(id: string): Observable<Licencia> {
    return this.http.delete(`${this.API_URI}/licencias/${id}`);
  }
  saveLicencia(licencia: Licencia): Observable<Licencia> {
    return this.http.post(`${this.API_URI}/licencias/`, licencia);
  }
  updateLicencia(id: string, updatelicencia: Licencia): Observable<Licencia> {
    return this.http.put(`${this.API_URI}/licencias/${id}`, updatelicencia);
  }
  getGarantias(): Observable<Licencia> {
    return this.http.get(`${this.API_URI}/licencias/listG`)
  }
  getServicios(): Observable<Licencia> {
    return this.http.get(`${this.API_URI}/licencias/listS`)
  }
  getLicenciasL(): Observable<Licencia> {
    return this.http.get(`${this.API_URI}/licencias/listL`)
  }
  getFechas(): Observable<Licencia> {
    return this.http.get(`${this.API_URI}/licencias/listF`)
  }

  // verifyLicencia(licencia: Licencia): Observable<Licencia>{
  //   return this.http.post(`${this.API_URI}/licencia/verify-isExistlicencia/`, licencia);
  // }

  // verifyPersonalUpdate(licencia: Licencia): Observable<Licencia>{
  //   return this.http.post(`${this.API_URI}/licencia/verify-isUpdatelicencia/`, licencia);
  // }
}

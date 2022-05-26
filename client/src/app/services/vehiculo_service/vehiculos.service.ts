import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Vehiculos } from '../../models/Vehiculos'
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class VehiculosService {

  API_URI = 'http://localhost:3000/api'  //Como atributo la dirección del servidor
  constructor(private http: HttpClient) { }

  getVehiculos(): Observable<Vehiculos>{
    return this.http.get(`${this.API_URI}/vehiculos/list`)
  }

  getVehiculo(id: string): Observable<Vehiculos>{
    return this.http.get(`${this.API_URI}/vehiculos/one/${id}`);
  }

  saveVehiculo(vehiculo: Vehiculos): Observable<Vehiculos>{
    return this.http.post(`${this.API_URI}/vehiculos/`, vehiculo);
  }
  deleteVehiculo(id: string): Observable<Vehiculos>{
    return this.http.delete(`${this.API_URI}/vehiculos/${id}`);
  }
  verifyVehiculo(vehiculo: Vehiculos): Observable<Vehiculos>{
    return this.http.post(`${this.API_URI}/vehiculos/verify-isExistVehiculo/`, vehiculo);
  }
  verifyUpdateVehiculo(vehiculo: Vehiculos): Observable<Vehiculos>{
    return this.http.post(`${this.API_URI}/vehiculos/verify-isUpdateVehiculo/`, vehiculo);
  }
  updateVehiculo(id: string, updateVehi: Vehiculos): Observable<Vehiculos>{
    return this.http.put(`${this.API_URI}/vehiculos/${id}`, updateVehi);
  }

}

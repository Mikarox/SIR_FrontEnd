import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


import { Observable } from 'rxjs';
import { Contrat } from 'src/app/models/Contrat';
import { Salary } from 'src/app/models/Salary';
import { Tenencia } from 'src/app/models/Tenencia';
import { Verificacion } from 'src/app/models/Verificacion';
import { Seguro } from 'src/app/models/Seguro';
import { Equipament } from 'src/app/models/Equipament';

@Injectable({
  providedIn: 'root'
})
export class MiscellaneousService {

  API_URI = 'http://localhost:3000/api'  //Como atributo la dirección del servidor
  constructor(private http: HttpClient) { }

  renewEvent(id: String): Observable<any>{
    return this.http.get(`${this.API_URI}/renew/${id}`);
  }


  getBirtdays(): Observable<any>{
    return this.http.get(`${this.API_URI}/birthday`)
  }

  getEvents(): Observable<any>{
    return this.http.get(`${this.API_URI}/eventlist`)
  }

  getEquipments(): Observable<any>{
    return this.http.get(`${this.API_URI}/equipments`)
  }

  deleteEquipment(id: String): Observable<any>{
    return this.http.delete(`${this.API_URI}/equipments/${id}`);
  }

  getEquipment(id: string): Observable<any>{
    return this.http.get(`${this.API_URI}/equipments/${id}`);
  }

  renewEquipment(id: String): Observable<any>{
    return this.http.get(`${this.API_URI}/equipments/renew/${id}`);
  }

  saveEquipment(id: string, updateEqipmen: Equipament): Observable<Contrat>{
    return this.http.put(`${this.API_URI}/equipments/${id}`, updateEqipmen);
  }

  deleteContrat(id: String): Observable<any>{
    return this.http.delete(`${this.API_URI}/contrats/${id}`);
  }

  getContrat(id: string): Observable<any>{
    return this.http.get(`${this.API_URI}/contrats/${id}`);
  }

  getContrats(): Observable<any>{
    return this.http.get(`${this.API_URI}/contrats`)
  }

  saveContrat(id: string, updateContrat: Contrat): Observable<Contrat>{
    return this.http.put(`${this.API_URI}/contrats/${id}`, updateContrat);
  }

  deleteSalary(id: String): Observable<any>{
    return this.http.delete(`${this.API_URI}/salarys/${id}`);
  }

  getSalary(id: string): Observable<any>{
    return this.http.get(`${this.API_URI}/salarys/${id}`);
  }

  getSalarys(): Observable<any>{
    return this.http.get(`${this.API_URI}/salarys`)
  }

  saveSalary(id: string, updateSalary: Salary): Observable<Contrat>{
    return this.http.put(`${this.API_URI}/salarys/${id}`, updateSalary);
  }

  //Vehiculos
  //optiene las tenencias
  getTenencias(): Observable<any>{
    return this.http.get(`${this.API_URI}/Tenencias`)
  }
  //eliminar una tenencia por su id
  deleteTenencia(id: String): Observable<any>{
    return this.http.delete(`${this.API_URI}/Tenencias/${id}`);
  }
  //optener una tenencia por su id
  getTenencia(id: string): Observable<any>{
    return this.http.get(`${this.API_URI}/Tenencias/${id}`);
  }
  //renovar la tenencia
  renewTenencia(id: String): Observable<any>{
    return this.http.get(`${this.API_URI}/Tenencias/renew/${id}`);
  }
  //guardar tenencia editada
  saveTenencia(id: string, updateTenencia: Tenencia): Observable<Contrat>{
    return this.http.put(`${this.API_URI}/Tenencias/${id}`, updateTenencia);
  }
  //eliminar una verificacion
  deleteVerificacion(id: String): Observable<any>{
    return this.http.delete(`${this.API_URI}/Verificacion/${id}`);
  }
  //optener una verificaion por su id
  getVerificacion(id: string): Observable<any>{
    return this.http.get(`${this.API_URI}/Verificacion/${id}`);
  }
  renewVerificacion(id: String): Observable<any>{
    return this.http.get(`${this.API_URI}/Verificacion/renew/${id}`);
  }
  //optener todas las verificaciones
  getVerificaciones(): Observable<any>{
    return this.http.get(`${this.API_URI}/Verificacion`)
  }
  //guardar verificacion update
  saveVerificacion(id: string, updateVerificacion: Verificacion): Observable<Contrat>{
    return this.http.put(`${this.API_URI}/Verificacion/${id}`, updateVerificacion);
  }
  //eliminar Seguro
  deleteSeguro(id: String): Observable<any>{
    return this.http.delete(`${this.API_URI}/Seguro/${id}`);
  }
  //optener seguro
  getSeguro(id: string): Observable<any>{
    return this.http.get(`${this.API_URI}/Seguro/${id}`);
  }
  // optener todos los seguro
  getSeguros(): Observable<any>{
    return this.http.get(`${this.API_URI}/Seguro`)
  }
  //guardar un seguro
  saveSeguro(id: string, updateSeguro: Seguro): Observable<Contrat>{
    return this.http.put(`${this.API_URI}/Seguro/${id}`, updateSeguro);
  }
  //renovar seguro
  renewSeguros(id: String): Observable<any>{
    return this.http.get(`${this.API_URI}/Seguro/renew/${id}`);
  }


}

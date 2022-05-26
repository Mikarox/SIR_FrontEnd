import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Personal } from '../../models/Personal'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PersonalService {

  API_URI = 'http://localhost:3000/api'  //Como atributo la dirección del servidor
  constructor(private http: HttpClient) { }

  getPersonals(): Observable<Personal>{
    return this.http.get(`${this.API_URI}/personal/list`)
  }
  getPersonal(id: string): Observable<Personal>{
    return this.http.get(`${this.API_URI}/personal/one/${id}`);
  }
  deletePersonal(id: string): Observable<Personal>{
    return this.http.delete(`${this.API_URI}/personal/${id}`);
  }
  savePersonal(personal: Personal): Observable<Personal>{
    return this.http.post(`${this.API_URI}/personal/`, personal);
  }
  updatePersonal(id: string, updatePersonal: Personal): Observable<Personal>{
    return this.http.put(`${this.API_URI}/personal/${id}`, updatePersonal);
  }
  verifyPersonal(Personal: Personal): Observable<Personal>{
    return this.http.post(`${this.API_URI}/personal/verify-isExistPersonal/`, Personal);
  }

  verifyPersonalUpdate(Personal: Personal): Observable<Personal>{
    return this.http.post(`${this.API_URI}/personal/verify-isUpdatePersonal/`, Personal);
  }
}

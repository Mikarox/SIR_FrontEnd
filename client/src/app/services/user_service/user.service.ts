import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from '../../models/User'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  API_URI = 'http://localhost:3000/api' //Como atributo la dirección del servidor

  constructor(private http: HttpClient) { }

  getUsers(): Observable<User> {
    return this.http.get(`${this.API_URI}/users`)
  }
  getUser(id: any): Observable<User> {
    return this.http.get(`${this.API_URI}/users/${id}`);
  }
  deleteUser(id: string): Observable<User> {
    return this.http.delete(`${this.API_URI}/users/${id}`);
  }
  saveUser(user: User): Observable<User> {
    // const fd = new FormData();
    // fd.append('email', user.email || '');
    // fd.append('password', user.password || '');

    return this.http.post(`${this.API_URI}/users/`, user);
  }
  verifyEmail(email: string){
    return this.http.get(`${this.API_URI}/users/verify-isExistEmial/${email}`);
  }
  updateUser(id: any, updateUser: User): Observable<User>{
    // const fd = new FormData();
    // fd.append('email', updateUser.email || '');
    // fd.append('password', updateUser.password || '');
    return this.http.put(`${this.API_URI}/users/${id}`, updateUser);
  }
  login(user: User): Observable<User> {
    return this.http.post(`${this.API_URI}/users/login`, user);
  }
}

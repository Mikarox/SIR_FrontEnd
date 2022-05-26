import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  userEmail=""
  constructor() {
  }

  ngOnInit(): void {
    const sesion = localStorage.getItem('sesion');
    let value = " " + sesion + " ";
    this.userEmail=JSON.parse(value)["email"];
  }

  logout(){
    localStorage.removeItem('sesion');
    location.replace('/');
  }

}

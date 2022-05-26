import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-adminnav',
  templateUrl: './adminnav.component.html',
  styleUrls: ['./adminnav.component.css']
})
export class AdminnavComponent implements OnInit {
  userName=""
  constructor() {
  }

  ngOnInit(): void {
    const sesion = localStorage.getItem('sesion');
    let value = " " + sesion + " ";
    this.userName=JSON.parse(value)["nombres"];
  }

  logout(){
    localStorage.removeItem('sesion');
    location.replace('/');
  }

}

import { Component, OnInit } from '@angular/core';
import {Title} from "@angular/platform-browser";
import { MiscellaneousService } from 'src/app/services/miscellaneous_service/miscellaneous.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  userId = ""
  birthdayList: any = [];
  eventList: any = [];
  constructor(private titleService:Title, private miscellaneousService: MiscellaneousService) {
    this.titleService.setTitle("SiR - Home");
  }

  ngOnInit(): void {
    if (localStorage.getItem('sesion')) {
      const sesion = localStorage.getItem('sesion');
      let value = " " + sesion + " ";
      this.userId = JSON.parse(value)["id"];
      this.miscellaneousService.getBirtdays()
        .subscribe({
          next: (v) => {
            this.birthdayList = v
          },
          error: (e) => { console.log(e) },
          complete: () => console.info('complete')
        })

        this.miscellaneousService.getEvents()
        .subscribe({
          next: (v) => {
            this.eventList = v
          },
          error: (e) => { console.log(e) },
          complete: () => console.info('complete')
        })
    } else {
      location.replace('');
    }

  }

}

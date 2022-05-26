import { Component, OnInit } from '@angular/core';
import {Title} from "@angular/platform-browser";


@Component({
  selector: 'app-home-sir',
  templateUrl: './home-sir.component.html',
  styleUrls: ['./home-sir.component.css']
})
export class HomeSirComponent implements OnInit {

  constructor(private titleService:Title) {
    this.titleService.setTitle("SIR");
  }

  ngOnInit(): void {
  }

}

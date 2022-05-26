import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { MiscellaneousService } from 'src/app/services/miscellaneous_service/miscellaneous.service';

@Component({
  selector: 'app-seetenencia',
  templateUrl: './seetenencia.component.html',
  styleUrls: ['./seetenencia.component.css']
})
export class SeetenenciaComponent implements OnInit {
  idT: any;
  t: any;

  constructor(private router: Router, private route: ActivatedRoute, private Miscellaneous: MiscellaneousService, private titleService: Title) {

   }

  ngOnInit(): void{
    this.idT = this.route.snapshot.paramMap.get('id');
    this.Miscellaneous.getTenencia(this.idT)
      .subscribe({
        next: (v) => {
          this.t = v;
          // formatDate(value, 'yyyy-MM-dd', 'en_US')
          this.t.UltimoPago = formatDate(this.t.UltimoPago, 'yyyy-MM-dd', 'en_US')
          this.t.Fecha = formatDate(this.t.Fecha, 'yyyy-MM-dd', 'en_US')
          this.titleService.setTitle("SIR - Tenencia - " + v.Modelo );


        },
        error: (e) => { console.log(e) },
        complete: () => console.info('complete')
      });
  }




}

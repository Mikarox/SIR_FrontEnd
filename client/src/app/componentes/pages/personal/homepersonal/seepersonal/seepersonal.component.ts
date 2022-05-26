import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PersonalService } from 'src/app/services/personal_service/personal.service';
import { Title } from "@angular/platform-browser";

@Component({
  selector: 'app-seepersonal',
  templateUrl: './seepersonal.component.html',
  styleUrls: ['./seepersonal.component.css']
})
export class SeepersonalComponent implements OnInit {
  personalInfo: any = [];
  eqs: any = [];
  eqfechas: any = [];
  eqdetalles: any = [];
  eqprox: any = [];
  Amotivos: any = [];
  ADetalles: any = [];
  AFechas: any = [];

  idPerson: any;

  constructor(private router: Router, private route: ActivatedRoute, private personalService: PersonalService, private titleService: Title) {
  }

  ngOnInit(): void {


    this.idPerson = this.route.snapshot.paramMap.get('id');
    this.personalService.getPersonal(this.idPerson)
      .subscribe({
        next: (v) => {
          this.personalInfo = v;

          if (this.personalInfo.EqNom)
            this.eqs = this.personalInfo.EqNom.split(";");
          if (this.personalInfo.LastDelivery)
            this.eqfechas = this.personalInfo.LastDelivery.split(";");
          if (this.personalInfo.EqDetalles)
            this.eqdetalles = this.personalInfo.EqDetalles.split(';');
          if (this.personalInfo.ProxFecha)
            this.eqprox = this.personalInfo.ProxFecha.split(";");
          if (this.personalInfo.AAMotivo)
            this.Amotivos = this.personalInfo.AAMotivo.split(";");
          if (this.personalInfo.AADetalles)
            this.ADetalles = this.personalInfo.AADetalles.split(";");
          if (this.personalInfo.AAFecha)
            this.AFechas = this.personalInfo.AAFecha.split(";");

          this.titleService.setTitle("SIR - Personal - " + this.personalInfo.Nombres);
          console.log(v);
        },
        error: (e) => { console.log(e) },
        complete: () => console.info('complete')
      });



  }

}

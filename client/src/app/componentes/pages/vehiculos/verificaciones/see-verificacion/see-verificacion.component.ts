import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { MiscellaneousService } from 'src/app/services/miscellaneous_service/miscellaneous.service';

@Component({
  selector: 'app-see-verificacion',
  templateUrl: './see-verificacion.component.html',
  styleUrls: ['./see-verificacion.component.css']
})
export class SeeVerificacionComponent implements OnInit {

  idV: any;
  v: any;

  constructor(private router: Router, private route: ActivatedRoute, private Miscellaneous: MiscellaneousService, private titleService: Title) {

   }

  ngOnInit(): void{
    this.idV = this.route.snapshot.paramMap.get('id');
    this.Miscellaneous.getVerificacion(this.idV)
      .subscribe({
        next: (r) => {
          this.v = r;
          // formatDate(value, 'yyyy-MM-dd', 'en_US')
          // this.t.UltimoPago = formatDate(this.t.UltimoPago, 'yyyy-MM-dd', 'en_US')
          // this.t.Fecha = formatDate(this.t.Fecha, 'yyyy-MM-dd', 'en_US')
          this.titleService.setTitle("SIR - Verificacion - " + r.Modelo );


        },
        error: (e) => { console.log(e) },
        complete: () => console.info('complete')
      });
  }

}

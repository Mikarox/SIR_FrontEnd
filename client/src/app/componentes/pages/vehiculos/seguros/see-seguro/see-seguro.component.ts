import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { MiscellaneousService } from 'src/app/services/miscellaneous_service/miscellaneous.service';

@Component({
  selector: 'app-see-seguro',
  templateUrl: './see-seguro.component.html',
  styleUrls: ['./see-seguro.component.css']
})
export class SeeSeguroComponent implements OnInit {
  idS: any;
  s: any = [];


  constructor(private router: Router, private route: ActivatedRoute, private Miscellaneous: MiscellaneousService, private titleService: Title) {

   }

  ngOnInit(): void{
    this.idS = this.route.snapshot.paramMap.get('id');
    this.Miscellaneous.getSeguro(this.idS)
      .subscribe({
        next: (r) => {
          this.s = r;
          // formatDate(value, 'yyyy-MM-dd', 'en_US')
          // this.t.UltimoPago = formatDate(this.t.UltimoPago, 'yyyy-MM-dd', 'en_US')
          // this.t.Fecha = formatDate(this.t.Fecha, 'yyyy-MM-dd', 'en_US')
          this.titleService.setTitle("SIR - Verificacion - " + r.Modelo );
          console.log(this.s)

        },
        error: (e) => { console.log(e) },
        complete: () => console.info('complete')
      });
  }

}

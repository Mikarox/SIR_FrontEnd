import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { MiscellaneousService } from 'src/app/services/miscellaneous_service/miscellaneous.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-seecontrat',
  templateUrl: './seecontrat.component.html',
  styleUrls: ['./seecontrat.component.css']
})
export class SeecontratComponent implements OnInit {
  c: any = [];
  idc: any;

  constructor(private router: Router, private route: ActivatedRoute, private MiscellaneousService: MiscellaneousService, private titleService: Title) {
  }

  ngOnInit(): void {
    this.idc = this.route.snapshot.paramMap.get('id');
    this.MiscellaneousService.getContrat(this.idc)
      .subscribe({
        next: (v) => {
          this.c = v;

          this.titleService.setTitle("SIR - Contrato - " + this.c.Nombres );
          console.log(v);
        },
        error: (e) => { console.log(e) },
        complete: () => console.info('complete')
      });



  }


}

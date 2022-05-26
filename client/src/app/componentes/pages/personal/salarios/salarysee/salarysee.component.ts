import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { MiscellaneousService } from 'src/app/services/miscellaneous_service/miscellaneous.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-salarysee',
  templateUrl: './salarysee.component.html',
  styleUrls: ['./salarysee.component.css']
})
export class SalaryseeComponent implements OnInit {
  s: any = [];
  ids: any;

  constructor(private router: Router, private route: ActivatedRoute, private MiscellaneousService: MiscellaneousService, private titleService: Title) {
  }

  ngOnInit(): void {
    this.ids = this.route.snapshot.paramMap.get('id');
    this.MiscellaneousService.getSalary(this.ids)
      .subscribe({
        next: (v) => {
          this.s = v;

          this.titleService.setTitle("SIR - Salario - " + this.s.Nombres );
          console.log(v);
        },
        error: (e) => { console.log(e) },
        complete: () => console.info('complete')
      });



  }


}

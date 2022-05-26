import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { MiscellaneousService } from 'src/app/services/miscellaneous_service/miscellaneous.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-seeequipament',
  templateUrl: './seeequipament.component.html',
  styleUrls: ['./seeequipament.component.css']
})
export class SeeequipamentComponent implements OnInit {
  equipo: any = [];
  idequipo: any;

  constructor(private router: Router, private route: ActivatedRoute, private MiscellaneousService: MiscellaneousService, private titleService: Title) {
  }

  ngOnInit(): void {
    this.idequipo = this.route.snapshot.paramMap.get('id');
    this.MiscellaneousService.getEquipment(this.idequipo)
      .subscribe({
        next: (v) => {
          this.equipo = v;

          this.titleService.setTitle("SIR - Equipamiento - " );
          console.log(v);
        },
        error: (e) => { console.log(e) },
        complete: () => console.info('complete')
      });



  }

  updateEquipment(id: string){
    Swal.fire({
      title: '¿Seguro que deseas renovar este equipamiento? (8 meses) ',
      text: "",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#AEB6BF',
      confirmButtonText: 'Sí, renovar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.MiscellaneousService.renewEquipment(id)
          .subscribe({
            next: (v) => {
              Swal.fire(
                'Renovado',
                'El Equipo ha sido renovado en el registro',
                'success'
              ).then(() => {
                location.reload();
              });
            },
            error: (e) => { },
            complete: () => console.info('complete')
          })

      }
    })
  }

}

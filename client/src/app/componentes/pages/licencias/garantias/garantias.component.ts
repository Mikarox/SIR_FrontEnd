import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { LicenciasService } from 'src/app/services/licencias_service/licencias.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-garantias',
  templateUrl: './garantias.component.html',
  styleUrls: ['./garantias.component.css']
})
export class GarantiasComponent implements OnInit {
  allLicences: any = [];
  constructor( private licenciaService: LicenciasService, private titleService: Title) {
    this.titleService.setTitle("SIR - Garantias - ");
  }

  ngOnInit(): void {
    this.licenciaService.getGarantias()
        .subscribe({
          next: (v) => {
            this.allLicences = v
          },
          error: (e) => { console.log(e) },
          complete: () => console.info('complete')
        })
  }


  deleteLicencia(id: any){
    Swal.fire({
      title: '¿Seguro que desea eliminar a esta garantia?',
      text: "",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#AEB6BF',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.licenciaService.deleteLicencia(id)
          .subscribe({
            next: (v) => {
              Swal.fire(
                'Eliminado',
                'La garantia ha sido eliminado del registro',
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

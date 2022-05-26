import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { LicenciasService } from 'src/app/services/licencias_service/licencias.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-servicios',
  templateUrl: './servicios.component.html',
  styleUrls: ['./servicios.component.css']
})
export class ServiciosComponent implements OnInit {
  allLicences: any = [];
  constructor( private licenciaService: LicenciasService, private titleService: Title) {
    this.titleService.setTitle("SIR - Servicios - ");
  }

  ngOnInit(): void {
    this.licenciaService.getServicios()
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
      title: '¿Seguro que desea eliminar a este Servicio?',
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
                'El Servicio ha sido eliminado del registro',
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

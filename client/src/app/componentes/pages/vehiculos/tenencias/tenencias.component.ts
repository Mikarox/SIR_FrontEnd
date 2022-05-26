import { Component, OnInit } from '@angular/core';
import { Title } from "@angular/platform-browser";
import Swal from 'sweetalert2'
import { MiscellaneousService } from 'src/app/services/miscellaneous_service/miscellaneous.service';


@Component({
  selector: 'app-tenencias',
  templateUrl: './tenencias.component.html',
  styleUrls: ['./tenencias.component.css']
})
export class TenenciasComponent implements OnInit {
  tenencias = []

  constructor(private titleService: Title, private miscellaneousService: MiscellaneousService) {
    this.titleService.setTitle("SIR - Vehiculos - Tenencias"); }

  ngOnInit(): void {
    this.miscellaneousService.getTenencias()
      .subscribe({
        next: (v) => {
          console.log(v)
          this.tenencias = v
        },
        error: (e) => { console.log(e) },
        complete: () => console.info('complete')
      })
  }

  updateTenencia(id: string){
    Swal.fire({
      title: '¿Seguro que deseas renovar este equipamiento? (1 año) ',
      text: "",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#AEB6BF',
      confirmButtonText: 'Sí, renovar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.miscellaneousService.renewTenencia(id)
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

  deleteTenencia(id: string){
    Swal.fire({
      title: '¿Seguro que desea eliminar esta tenencia?',
      text: "",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#AEB6BF',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.miscellaneousService.deleteTenencia(id)
          .subscribe({
            next: (v) => {
              Swal.fire(
                'Eliminado',
                'La tenenia ha sido eliminado del registro',
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

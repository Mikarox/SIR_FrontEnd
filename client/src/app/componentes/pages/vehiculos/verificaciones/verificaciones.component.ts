import { Component, OnInit } from '@angular/core';
import { Title } from "@angular/platform-browser";
import Swal from 'sweetalert2'
import { MiscellaneousService } from 'src/app/services/miscellaneous_service/miscellaneous.service';


@Component({
  selector: 'app-verificaciones',
  templateUrl: './verificaciones.component.html',
  styleUrls: ['./verificaciones.component.css']
})
export class VerificacionesComponent implements OnInit {
  verificacion = []

  constructor(private titleService: Title, private miscellaneousService: MiscellaneousService) {
    this.titleService.setTitle("SIR - Vehiculos - Verificaciones"); }

  ngOnInit(): void {
    this.miscellaneousService.getVerificaciones()
      .subscribe({
        next: (v) => {
          console.log(v)
          this.verificacion = v
        },
        error: (e) => { console.log(e) },
        complete: () => console.info('complete')
      })
  }


  updateVerificacion(id:any){
    Swal.fire({
      title: '¿Seguro que deseas renovar esta Verificacion? (6 meses) ',
      text: "Con la fecha a partir de hoy",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#AEB6BF',
      confirmButtonText: 'Sí, renovar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.miscellaneousService.renewVerificacion(id)
          .subscribe({
            next: (v) => {
              Swal.fire(
                'Renovado',
                'La Verificacion Vehicular ha sido renovada en el registro',
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

  deleteVerificacion(id:any){
    Swal.fire({
      title: '¿Seguro que deseas eliminar esta Verificacion? ',
      text: "",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#AEB6BF',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.miscellaneousService.deleteVerificacion(id)
          .subscribe({
            next: (v) => {
              Swal.fire(
                'Eliminado',
                'El registro ha sido eliminado de la base de datos',
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

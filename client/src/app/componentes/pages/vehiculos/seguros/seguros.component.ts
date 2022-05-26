import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { MiscellaneousService } from 'src/app/services/miscellaneous_service/miscellaneous.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-seguros',
  templateUrl: './seguros.component.html',
  styleUrls: ['./seguros.component.css']
})
export class SegurosComponent implements OnInit {
  seguros: any = [];

  constructor(private titleService: Title, private miscellaneousService: MiscellaneousService) {
    this.titleService.setTitle("SIR - Vehiculos - Seguros"); }

  ngOnInit(): void {
    this.miscellaneousService.getSeguros()
      .subscribe({
        next: (v) => {
          console.log(v)
          this.seguros = v
        },
        error: (e) => { console.log(e) },
        complete: () => console.info('complete')
      })
  }


  updateSeguro(id:any){
    Swal.fire({
      title: '¿Seguro que deseas renovar este Seguro? (1 año) ',
      text: "Con la fecha a partir de hoy",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#AEB6BF',
      confirmButtonText: 'Sí, renovar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.miscellaneousService.renewSeguros(id)
          .subscribe({
            next: (v) => {
              Swal.fire(
                'Renovado',
                'El Seguro Vehicular ha sido renovada en el registro',
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

  deleteSeguro(id:any){
    Swal.fire({
      title: '¿Seguro que deseas eliminar esta Seguro? ',
      text: "",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#AEB6BF',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.miscellaneousService.deleteSeguro(id)
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

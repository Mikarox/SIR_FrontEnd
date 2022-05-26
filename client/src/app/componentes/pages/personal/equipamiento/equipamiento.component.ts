import { Component, OnInit } from '@angular/core';
import { Title } from "@angular/platform-browser";

import Swal from 'sweetalert2'
import { MiscellaneousService } from 'src/app/services/miscellaneous_service/miscellaneous.service';

@Component({
  selector: 'app-equipamiento',
  templateUrl: './equipamiento.component.html',
  styleUrls: ['./equipamiento.component.css']
})
export class EquipamientoComponent implements OnInit {

  equipamientos: any = [];

  constructor(private titleService: Title, private miscellaneousService: MiscellaneousService) {
     this.titleService.setTitle("SIR - Personal - Equipamientos"); }

  ngOnInit(): void {

    this.miscellaneousService.getEquipments()
      .subscribe({
        next: (v) => {
          this.equipamientos = v
        },
        error: (e) => { console.log(e) },
        complete: () => console.info('complete')
      })
  }

  updateEquipment(id: string){
    Swal.fire({
      title: '¿Seguro que deseas renovar este equipamiento? (8 meses) ',
      text: "",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#AEB6BF',
      confirmButtonText: 'Sí, renobar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.miscellaneousService.renewEquipment(id)
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

  deleteEquipment(id: string){
    Swal.fire({
      title: '¿Seguro que desea eliminar a este equipamiento?',
      text: "",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#AEB6BF',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.miscellaneousService.deleteEquipment(id)
          .subscribe({
            next: (v) => {
              Swal.fire(
                'Eliminado',
                'El Equipo ha sido eliminado del registro',
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

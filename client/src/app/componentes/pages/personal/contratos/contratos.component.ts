import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { MiscellaneousService } from 'src/app/services/miscellaneous_service/miscellaneous.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-contratos',
  templateUrl: './contratos.component.html',
  styleUrls: ['./contratos.component.css']
})
export class ContratosComponent implements OnInit {

  contratos: any = [];

  constructor(private titleService: Title, private miscellaneousService: MiscellaneousService) {
    this.titleService.setTitle("SIR - Personal - Contratos"); }

  ngOnInit(): void {

    this.miscellaneousService.getContrats()
      .subscribe({
        next: (v) => {
          this.contratos = v
        },
        error: (e) => { console.log(e) },
        complete: () => console.info('complete')
      })
  }


  deleteContrat(id: string){
    Swal.fire({
      title: '¿Seguro que desea eliminar a este Contrato?',
      text: "",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#AEB6BF',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.miscellaneousService.deleteContrat(id)
          .subscribe({
            next: (v) => {
              Swal.fire(
                'Eliminado',
                'El Contrato ha sido eliminado del registro',
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

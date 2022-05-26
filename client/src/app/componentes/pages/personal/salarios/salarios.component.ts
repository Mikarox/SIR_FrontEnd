import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { MiscellaneousService } from 'src/app/services/miscellaneous_service/miscellaneous.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-salarios',
  templateUrl: './salarios.component.html',
  styleUrls: ['./salarios.component.css']
})
export class SalariosComponent implements OnInit {

  salarios: any = [];

  constructor(private titleService: Title, private miscellaneousService: MiscellaneousService) {
    this.titleService.setTitle("SIR - Personal - Salarios"); }

  ngOnInit(): void {

    this.miscellaneousService.getSalarys()
      .subscribe({
        next: (v) => {
          this.salarios = v
        },
        error: (e) => { console.log(e) },
        complete: () => console.info('complete')
      })
  }


  deleteSalary(id: string){
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
        this.miscellaneousService.deleteSalary(id)
          .subscribe({
            next: (v) => {
              Swal.fire(
                'Eliminado',
                'El Salario ha sido eliminado del registro',
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

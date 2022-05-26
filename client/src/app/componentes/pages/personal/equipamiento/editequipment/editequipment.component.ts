import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Equipament } from 'src/app/models/Equipament';
import { MiscellaneousService } from 'src/app/services/miscellaneous_service/miscellaneous.service';
import Swal from 'sweetalert2';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-editequipment',
  templateUrl: './editequipment.component.html',
  styleUrls: ['./editequipment.component.css']
})
export class EditequipmentComponent implements OnInit {

  e: any = [];
  ide: any;
  form!: FormGroup; //Formulario reactivo
  updateEquipament!: Equipament;
  date = true;

  fechavenci: any;



  constructor(private formBuilder: FormBuilder, private router: Router, private route: ActivatedRoute, private Miscellaneous: MiscellaneousService, private titleService: Title) {
    this.buildForm();
  }

  ngOnInit(): void {
    this.ide = this.route.snapshot.paramMap.get('id');
    this.Miscellaneous.getEquipment(this.ide)
      .subscribe({
        next: (v) => {
          this.e = v;
          this.titleService.setTitle("SIR - Equipamiento - " + this.e.EqNom);

          this.form.controls['Nombre'].setValue(this.e.EqNom);
          this.form.controls['Detalles'].setValue(this.e.EqDetalles);
          this.form.controls['UltimaFecha'].setValue(formatDate(this.e.EqUltima, 'yyyy-MM-dd', 'en_US'));
          // formatDate(value, 'yyyy-MM-dd', 'en_US')

        },
        error: (e) => { console.log(e) },
        complete: () => console.info('complete')
      });
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      Nombre: ['', [Validators.required]],
      Detalles: ['', [Validators.required]],
      UltimaFecha: ['', [Validators.required]]
    });
  }

  editEquipament(event: Event){
    event.preventDefault();
    Swal.fire({
      title: '¿Seguro que desea actualizar este Equipamiento?',
      text: "",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ffc107',
      cancelButtonColor: '#AEB6BF',
      confirmButtonText: 'Sí, editar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        const value = this.form.value;


        this.updateEquipament = {
          ID_Equipo: this.ide,
          Nombre: value.Nombre,
          detalles: value.Detalles,
          UltimaEntrega: value.UltimaFecha
        };

        console.log(this.updateEquipament);
        this.Miscellaneous.saveEquipment(this.ide, this.updateEquipament)
          .subscribe({
            next: (v) => {
              console.log(v)
              Swal.fire(
                'Los nuevos cambios se han efectuado en el equipamiento',
                '',
                'success'
              ).then((result) => {
                location.reload();
              })
            },
            error: (e) => { console.error(e) },
            complete: () => console.info('complete')
          })
      }
    })
  }

}

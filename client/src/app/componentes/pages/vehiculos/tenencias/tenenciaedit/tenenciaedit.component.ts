import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { MiscellaneousService } from 'src/app/services/miscellaneous_service/miscellaneous.service';
import Swal from 'sweetalert2';
import { Tenencia } from 'src/app/models/Tenencia';

@Component({
  selector: 'app-tenenciaedit',
  templateUrl: './tenenciaedit.component.html',
  styleUrls: ['./tenenciaedit.component.css']
})
export class TenenciaeditComponent implements OnInit {
  idT: any;
  t: any;
  form!: FormGroup; //Formulario reactivo
  seedate = true;
  updateTenencia! : Tenencia;

  constructor(private formBuilder: FormBuilder, private router: Router, private route: ActivatedRoute, private Miscellaneous: MiscellaneousService, private titleService: Title) {
    this.buildForm();
  }

  ngOnInit(): void{
    this.idT = this.route.snapshot.paramMap.get('id');
    this.Miscellaneous.getTenencia(this.idT)
      .subscribe({
        next: (v) => {
          this.t = v;
          // formatDate(value, 'yyyy-MM-dd', 'en_US')
          this.t.UltimoPago = formatDate(this.t.UltimoPago, 'yyyy-MM-dd', 'en_US')
          this.t.Fecha = formatDate(this.t.Fecha, 'yyyy-MM-dd', 'en_US')
          this.titleService.setTitle("SIR - Editar Tenencia - " + v.Modelo );

          this.form.controls['UltimaFecha'].setValue(this.t.UltimoPago);
          this.form.controls['ProximaFecha'].setValue(this.t.Fecha);

        },
        error: (e) => { console.log(e) },
        complete: () => console.info('complete')
      });
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      UltimaFecha: ['', [Validators.required]],
      ProximaFecha: ['', [Validators.required]],
    });
  }

  updateProxima(valor: any){
    this.seedate = false;

    let year = valor.substring(0,4);
    let Months = valor.substring(5,7);
    let Days =  valor.substring(8,11);

    var Yint = parseInt(year);
    Yint+=1;

    let newvalor = Yint.toString() + '-'+ Months+ '-' + Days;

    this.form.controls['ProximaFecha'].setValue(newvalor);

    this.seedate = true;
  }

  editTenencia(event:Event){
    Swal.fire({
      title: '¿Seguro que desea actualizar esta Tenencia?',
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

        this.updateTenencia = {
          ID_Tenencia: this.idT,
          UltimoPago: value.UltimaFecha,
          ProximoPago: value.ProximaFecha,
        };

        this.Miscellaneous.saveTenencia(this.idT,this.updateTenencia)
        .subscribe({
          next: (v) => {
            console.log(v)
            Swal.fire(
              'Los nuevos cambios se han efectuado en la Tenencia',
              '',
              'success'
            ).then((result) => {
              location.reload();
            })
          },
          error: (e) => {console.error(e)},
          complete: () => console.info('complete')
        })
      }
    })




  }

}

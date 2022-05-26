import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Verificacion } from 'src/app/models/Verificacion';
import { MiscellaneousService } from 'src/app/services/miscellaneous_service/miscellaneous.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-verificacion',
  templateUrl: './edit-verificacion.component.html',
  styleUrls: ['./edit-verificacion.component.css']
})
export class EditVerificacionComponent implements OnInit {
  idV: any;
  v: any;
  form!: FormGroup; //Formulario reactivo
  seedate = true;
  updateVerificacion!: Verificacion;

  constructor(private formBuilder: FormBuilder, private router: Router, private route: ActivatedRoute, private Miscellaneous: MiscellaneousService, private titleService: Title) {
    this.buildForm();
  }

  ngOnInit(): void {
    this.idV = this.route.snapshot.paramMap.get('id');
    this.Miscellaneous.getVerificacion(this.idV)
      .subscribe({
        next: (r) => {
          this.v = r;
          // formatDate(value, 'yyyy-MM-dd', 'en_US')
          this.v.Ultima = formatDate(this.v.Ultima, 'yyyy-MM-dd', 'en_US')
          this.v.Prox = formatDate(this.v.Prox, 'yyyy-MM-dd', 'en_US')
          this.titleService.setTitle("SIR - Editar Verificacion - " + r.Modelo);

          this.form.controls['UltimaFecha'].setValue(this.v.Ultima);
          this.form.controls['ProximaFecha'].setValue(this.v.Prox);

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

  updateProxima(valor: any) {
    this.seedate = false;

    let Years = valor.substring(0, 4);
    let Months = valor.substring(5, 7);
    let Days = valor.substring(8, 11);

    var Yint = parseInt(Years);
    var Mint = parseInt(Months);
    var Dint = parseInt(Days);

    Mint += 6;
    if (Mint > 12) {
      Yint += 1;
      Mint -= 12;
    }

    let hall = Yint.toString().concat('-');
    if (Mint < 10){
      hall = hall.concat('0');
      hall = hall.concat(Mint.toString());
    }else{
      hall = hall.concat(Mint.toString());
    }
    hall = hall.concat('-');

    hall = hall.concat(Days);


    this.form.controls['ProximaFecha'].setValue(hall);

    this.seedate = true;
  }

  editVerificacion(event: Event) {
    Swal.fire({
      title: '¿Seguro que desea actualizar esta Verificacion?',
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

        this.updateVerificacion = {
          ID_Verificacion: this.idV,
          UltimoPago: value.UltimaFecha,
          ProximoPago: value.ProximaFecha,
        }

        this.Miscellaneous.saveVerificacion(this.idV, this.updateVerificacion)
          .subscribe({
            next: (v) => {
              console.log(v)
              Swal.fire(
                'Los nuevos cambios se han efectuado en la Verificacion',
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

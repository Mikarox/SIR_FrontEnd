import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Seguro } from 'src/app/models/Seguro';
import { MiscellaneousService } from 'src/app/services/miscellaneous_service/miscellaneous.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-seguro-edit',
  templateUrl: './seguro-edit.component.html',
  styleUrls: ['./seguro-edit.component.css']
})
export class SeguroEditComponent implements OnInit {
  idS: any;
  s: any = [];
  form!: FormGroup; //Formulario reactivo
  seedate = true;
  updateSeguro!: Seguro;

  constructor(private formBuilder: FormBuilder, private router: Router, private route: ActivatedRoute, private Miscellaneous: MiscellaneousService, private titleService: Title) {
    this.buildForm();
  }

  ngOnInit(): void {
    this.idS = this.route.snapshot.paramMap.get('id');
    this.Miscellaneous.getSeguro(this.idS)
      .subscribe({
        next: (r) => {
          this.s = r;
          this.titleService.setTitle("SIR - Editar Verificacion - " + r.Modelo);
          let fecha = formatDate(this.s.Fvencimiento, 'yyyy-MM-dd', 'en_US')
          let Years = fecha.substring(0, 4);
          let Months = fecha.substring(5, 7);
          let Days = fecha.substring(8, 11);

          var Yint = parseInt(Years) - 1;
          let hall = Yint.toString().concat('-');
          hall = hall.concat(Months);
          hall = hall.concat('-');
          hall = hall.concat(Days);

          console.log(this.s)
          this.form.controls['Inicio'].setValue(hall);
          this.form.controls['Vencimiento'].setValue(formatDate(this.s.Fvencimiento, 'yyyy-MM-dd', 'en_US'));
          this.form.controls['Provedor'].setValue(this.s.Provedor);
          this.form.controls['NoPoliza'].setValue(this.s.NoPoliza);

        },
        error: (e) => { console.log(e) },
        complete: () => console.info('complete')
      });
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      Provedor: ['', [Validators.required]],
      NoPoliza: ['', [Validators.required]],
      Inicio: ['', [Validators.required]],
      Vencimiento: ['', [Validators.required]],
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

    Mint += 12;
    if (Mint > 12) {
      Yint += 1;
      Mint -= 12;
    }

    let hall = Yint.toString().concat('-');
    if (Mint < 10) {
      hall = hall.concat('0');
      hall = hall.concat(Mint.toString());
    } else {
      hall = hall.concat(Mint.toString());
    }
    hall = hall.concat('-');

    hall = hall.concat(Days);


    this.form.controls['Vencimiento'].setValue(hall);

    this.seedate = true;
  }

  editSeguro(event: Event) {
    Swal.fire({
      title: '¿Seguro que desea actualizar esta seguro?',
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

        // ID_Seguro ?: number;
        // Provedor ?: Text;
        // NoPoliza ?: Text;
        // ProximoPago ?: Date;

        this.updateSeguro = {
          ID_Seguro: this.idS,
          Provedor: value.Provedor,
          NoPoliza: value.NoPoliza,
          ProximoPago: value.Vencimiento
        }

        this.Miscellaneous.saveSeguro(this.idS, this.updateSeguro)
          .subscribe({
            next: (v) => {
              console.log(v)
              Swal.fire(
                'Los nuevos cambios se han efectuado en el seguro',
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

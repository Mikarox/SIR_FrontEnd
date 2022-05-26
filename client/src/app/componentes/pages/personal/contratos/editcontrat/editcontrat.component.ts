import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Contrat } from 'src/app/models/Contrat';
import { MiscellaneousService } from 'src/app/services/miscellaneous_service/miscellaneous.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editcontrat',
  templateUrl: './editcontrat.component.html',
  styleUrls: ['./editcontrat.component.css']
})
export class EditcontratComponent implements OnInit {
  c: any = [];
  idc: any;
  form!: FormGroup; //Formulario reactivo
  updateContrat!: Contrat;
  date = true;

  fechavenci: any;



  constructor(private formBuilder: FormBuilder, private router: Router, private route: ActivatedRoute, private Miscellaneous: MiscellaneousService, private titleService: Title) {
    this.buildForm();
  }

  ngOnInit(): void {
    this.idc = this.route.snapshot.paramMap.get('id');
    this.Miscellaneous.getContrat(this.idc)
      .subscribe({
        next: (v) => {
          this.c = v;
          this.titleService.setTitle("SIR - Contrato - " + this.c.Nombres);
          this.form.controls['Type'].setValue(this.c.type);
          this.form.controls['Cantidad'].setValue(this.c.cantidad);
          this.fechavenci = this.c.Terminacion;

          if(this.c.type == 2){
            this.date=false;
          }

        },
        error: (e) => { console.log(e) },
        complete: () => console.info('complete')
      });
  }



  private buildForm() {
    this.form = this.formBuilder.group({
      Type: ['', [Validators.min(0), Validators.max(2), Validators.required]],
      Cantidad: ['', [Validators.min(0), Validators.required]],
    });


  }

  changetipo(event: any, valor: any) {

    if(valor!=2){
      this.changedate(event.value, valor);
      this.date = false;
    }

    if(event.value == 2){
      this.form.controls['Cantidad'].setValue(0);
      this.date = false;
    }else{
      this.date = true;
    }




  }


  changedate(tipo: any, valor: any) {

    let Years = this.c.Ingreso.substring(0, 4)
    let Months = this.c.Ingreso.substring(5, 7)
    let Days = this.c.Ingreso.substring(8, 10)

    var Yint = parseInt(Years);
    var Mint = parseInt(Months);
    var Dint = parseInt(Days);
    var hall;


    if (tipo == '0') {
      console.log("entro tipo")
      Mint = Mint + parseInt(valor);
      Yint += Math.trunc((Mint-1) / 12);
      console.log("-1: " + Math.trunc((Mint-1) / 12) );
      if (Mint > 12) {
        if (Mint % 12 != 0) {
          Mint = Mint % 12;
        } else {
          if(Math.trunc((Mint) / 12) > 1)
          {
            Mint = 12;
          }else{
            Mint = 1;
          }

        }
      }

      hall = Yint.toString().concat('/');
      hall = hall.concat(Mint.toString());
      hall = hall.concat('/');
      hall = hall.concat(Dint.toString());

      this.fechavenci = hall;
    } else if (tipo == '1') {
      console.log("entro 111")
      Yint = Yint + parseInt(valor);

      hall = Yint.toString().concat('/');
      hall = hall.concat(Mint.toString());
      hall = hall.concat('/');
      hall = hall.concat(Dint.toString());

      this.fechavenci = hall;

    } else if (tipo == '2') {
      console.log("entro tipo2")
      this.fechavenci = this.c.Ingreso;
    }


  }

  editContrat(event: Event) {
    event.preventDefault();
    Swal.fire({
      title: '¿Seguro que desea actualizar este Contrato?',
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



        this.updateContrat = {
          type: value.Type,
          cantidad: value.Cantidad,
          ingreso: this.c.Ingreso.substring(0,10)
        };

        console.log(this.updateContrat);
        this.Miscellaneous.saveContrat(this.idc, this.updateContrat)
          .subscribe({
            next: (v) => {
              console.log(v)
              Swal.fire(
                'Los nuevos cambios se han efectuado en el Contrato',
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

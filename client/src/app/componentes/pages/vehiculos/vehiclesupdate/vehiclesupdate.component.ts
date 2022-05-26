import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { VehiculosService } from 'src/app/services/vehiculo_service/vehiculos.service';
import { formatDate } from '@angular/common';
import { debounceTime } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Vehiculos } from 'src/app/models/Vehiculos';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
@Component({
  selector: 'app-vehiclesupdate',
  templateUrl: './vehiclesupdate.component.html',
  styleUrls: ['./vehiclesupdate.component.css']
})
export class VehiclesupdateComponent implements OnInit {
  vh: any = [];
  idv: any;
  form!: FormGroup; //Formulario reactivo
  type: any = [];
  typeoption: any;
  propety1: any = [];
  propety2: any = [];
  propety3: any = [];
  p1 = "";
  p2 = "";
  p3 = "";
  tp1 = "text";
  tp2 = "text";
  tp3 = "text";
  see1 = false;
  see2 = false;
  see3 = false;
  typelistsee = true;
  canAddPropety = false;
  canUpdate = false;
  typePropetyList: string[] = ["Tenencia", "Verificacion", "Seguro"];
  updateVehiculo!: Vehiculos;
  datesee = true;


  typeList: any = [];
  IDList: any = [];
  propetyList1: any = [];
  propetyList2: any = [];
  propetyList3: any = [];


  constructor(private formBuilder: FormBuilder, private router: Router, private route: ActivatedRoute, private VhService: VehiculosService, private titleService: Title) {
    this.buildForm();
  }
  ngOnInit(): void {
    this.idv = this.route.snapshot.paramMap.get('id');
    this.VhService.getVehiculo(this.idv)
      .subscribe({
        next: (v) => {
          this.vh = v;
          this.vh = this.vh[0];
          this.titleService.setTitle("SIR - Vehiculo - " + this.vh.Modelo);
          // setter form value
          this.form.controls['Modelo'].setValue(this.vh.Modelo);
          this.form.controls['Placas'].setValue(this.vh.Placas);
          this.form.controls['Propietario'].setValue(this.vh.Propietario);
          this.form.controls['NoSerie'].setValue(this.vh.NoSerie);
          //Tenencia propety

          const typeArray: FormArray = this.form.get('typeList') as FormArray;
          const propetyArray1: FormArray = this.form.get('propetyList1') as FormArray;
          const propetyArray2: FormArray = this.form.get('propetyList2') as FormArray;
          const propetyArray3: FormArray = this.form.get('propetyList3') as FormArray;

          console.log(this.vh.T)

          if (this.vh.T) {
            this.type.push('Tenencia')
            this.propety1.push(formatDate(this.vh.UltimoPago, 'yyyy-MM-dd', 'en_US'));
            this.propety2.push(formatDate(this.vh.FechaTenencia, 'yyyy-MM-dd', 'en_US'));
            this.propety3.push('');
            this.IDList.push(this.vh.T)

            typeArray.push(new FormControl('Tenencia'));
            propetyArray1.push(new FormControl(formatDate(this.vh.UltimoPago, 'yyyy-MM-dd', 'en_US')));
            propetyArray2.push(new FormControl(formatDate(this.vh.FechaTenencia, 'yyyy-MM-dd', 'en_US')));
            propetyArray3.push(new FormControl(''));
          }

          console.log(this.vh.V)
          //Verificacion propery
          if (this.vh.V) {
            this.type.push('Verificacion')
            this.propety1.push(formatDate(this.vh.UltimaV, 'yyyy-MM-dd', 'en_US'));
            this.propety2.push(formatDate(this.vh.FechaVerificacion, 'yyyy-MM-dd', 'en_US'));
            this.propety3.push('');
            this.IDList.push(this.vh.V)

            typeArray.push(new FormControl('Verificacion'));
            propetyArray1.push(new FormControl(formatDate(this.vh.UltimaV, 'yyyy-MM-dd', 'en_US')));
            propetyArray2.push(new FormControl(formatDate(this.vh.FechaVerificacion, 'yyyy-MM-dd', 'en_US')));
            propetyArray3.push(new FormControl(''));
          }
          console.log(this.vh.S)
          //seguro propety
          if (this.vh.S) {
            this.type.push('Seguro')
            this.propety1.push(this.vh.Provedor);
            this.propety2.push(this.vh.NoPoliza);
            this.propety3.push(formatDate(this.vh.ProxPagoSeguro, 'yyyy-MM-dd', 'en_US'));
            this.IDList.push(this.vh.S)

            typeArray.push(new FormControl('Seguro'));
            propetyArray1.push(new FormControl(this.vh.Provedor));
            propetyArray2.push(new FormControl(this.vh.NoPoliza));
            propetyArray3.push(new FormControl(formatDate(this.vh.ProxPagoSeguro, 'yyyy-MM-dd', 'en_US')));
          }

        },
        error: (e) => { console.log(e) },
        complete: () => console.info('complete')
      });
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      Modelo: ['', [Validators.required]],
      Placas: ['', [Validators.required]],
      Propietario: ['', [Validators.required]],
      NoSerie: ['', [Validators.required]],
      typeform: ['',],
      prop1: ['',],
      prop2: ['',],
      prop3: ['',],
      typeList: new FormArray([], [Validators.required]),
      propetyList1: new FormArray([], [Validators.required]),
      propetyList2: new FormArray([], [Validators.required]),
      propetyList3: new FormArray([], [Validators.required]),
    });

    this.form.valueChanges
      .pipe(
        debounceTime(500)
      )
      .subscribe(value => {

        if (value.typeform == "") {
          this.canAddPropety = false
        }
        else {
          this.canAddPropety = true
        }
        //Verificar si existen coincidencias en la base de dat

        if (value.Placas) {
          this.updateVehiculo = {
            id: this.idv,
            Placas: value.Placas
          };
          this.VhService.verifyUpdateVehiculo(this.updateVehiculo)
            .subscribe({
              next: (v) => {
                if (JSON.parse(JSON.stringify(v)).message == 'Existe') {
                  this.canUpdate = true;
                } else if (JSON.parse(JSON.stringify(v)).message == 'No existe') {
                  this.canUpdate = false;
                }
              },
              error: (e) => { },
              complete: () => console.info('complete')
            })
        }



        if (this.type.some((x: string) => x == 'Tenencia') && this.type.some((x: string) => x == 'Verificacion') && this.type.some((x: string) => x == 'Seguro')) {
          this.typelistsee = false;
          this.typePropetyList = [""];
          this.typelistsee = true;
        } else if (this.type.some((x: string) => x == 'Verificacion') && this.type.some((x: string) => x == 'Seguro')) {
          this.typelistsee = false;
          this.typePropetyList = ["Tenencia"];
          this.typelistsee = true;
        } else if (this.type.some((x: string) => x == 'Tenencia') && this.type.some((x: string) => x == 'Seguro')) {
          this.typelistsee = false;
          this.typePropetyList = ["Verificacion"];
          this.typelistsee = true;
        } else if (this.type.some((x: string) => x == 'Tenencia') && this.type.some((x: string) => x == 'Verificacion')) {
          this.typelistsee = false;
          this.typePropetyList = ["Seguro"];
          this.typelistsee = true;
        } else if (!this.type.some((x: string) => x == 'Tenencia') && !this.type.some((x: string) => x == 'Verificacion') && this.type.some((x: string) => x == 'Seguro')) {
          this.typelistsee = false;
          this.typePropetyList = ["Tenencia", "Verificacion"];
          this.typelistsee = true;
        } else if (this.type.some((x: string) => x == 'Tenencia') && !this.type.some((x: string) => x == 'Verificacion') && !this.type.some((x: string) => x == 'Seguro')) {
          this.typelistsee = false;
          this.typePropetyList = ["Verificacion", "Seguro"];
          this.typelistsee = true;
        } else if (!this.type.some((x: string) => x == 'Tenencia') && this.type.some((x: string) => x == 'Verificacion') && !this.type.some((x: string) => x == 'Seguro')) {
          this.typelistsee = false;
          this.typePropetyList = ["Tenencia", "Seguro"];
          this.typelistsee = true;
        } else {
          this.typelistsee = false;
          this.typePropetyList = ["Tenencia", "Verificacion", "Seguro"];
          this.typelistsee = true;
        }


      })

  }//end form

  select() {
    switch (this.form.value.typeform) {
      case "Seguro":
        this.typeoption = "Seguro";
        this.see1 = false;
        this.see2 = false;
        this.see3 = false;
        this.p1 = "Provedor de Seguro";
        this.p2 = "No. Poliza";
        this.p3 = "Fecha Vencimiento de Seguro";
        this.tp1 = "text";
        this.tp2 = "text";
        this.tp3 = "date";
        this.form.get('prop1')?.setValue("");
        this.form.get('prop2')?.setValue("");
        this.form.get('prop3')?.setValue("");
        this.see1 = true;
        this.see2 = true;
        this.see3 = true;
        break;
      case "Tenencia":
        this.typeoption = "Tenencia";
        this.see1 = false;
        this.see2 = false;
        this.see3 = false;
        this.tp1 = "date";
        this.tp2 = "date";
        this.tp3 = "text";
        this.p1 = "Ultima Tenencia Realizada";
        this.p2 = "Proxima Tenencia"
        this.p3 = "";
        this.form.get('prop1')?.setValue("");
        this.form.get('prop2')?.setValue("");
        this.see1 = true;
        this.see2 = true;
        this.see3 = false;
        break;
      case "Verificacion":
        this.typeoption = "Verifiacion";
        this.see1 = false;
        this.see2 = false;
        this.see3 = false;

        this.tp1 = "date";
        this.tp2 = "date";
        this.tp3 = "date";
        this.p1 = "Ultima Verificacion Realizada";
        this.p2 = "Proxima Verificacion";
        this.p3 = "";
        this.form.get('prop1')?.setValue("");
        this.form.get('prop2')?.setValue("");
        this.see1 = true;
        this.see2 = true;
        this.see3 = false;
        break;
      case "":
        this.see1 = false;
        this.see2 = false;
        this.see3 = false;
        this.form.get('prop1')?.setValue("");
        this.form.get('prop2')?.setValue("");
        this.form.get('prop3')?.setValue("");
        break;
    }
  }

  Update(event: Event) {
    event.preventDefault();
    Swal.fire({
      title: '¿Seguro que desea actualizar a este Vehiculo?',
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



        this.updateVehiculo = {
          Placas: value.Placas,
          Modelo: value.Modelo,
          Propietario: value.Propietario,
          NoSerie: value.NoSerie,
          type: this.type,
          propety1: this.propety1,
          propety2: this.propety2,
          propety3: this.propety3,
          propetyid: this.IDList,
        };
        this.VhService.updateVehiculo(this.idv, this.updateVehiculo)
          .subscribe({
            next: (v) => {

              Swal.fire(
                'Los nuevos cambios se han efectuado en el vehiculo',
                '',
                'success'
              ).then((result) => {
                location.reload();
              })
            },
            error: (e) => { console.error(e) },
            complete: () => location.reload()
          })
      }
    })
  }

  UpdateFechaInput(inputvalue : any ){
      console.log(inputvalue)
      console.log(this.typeoption)
      switch (this.typeoption) {
        case "Tenencia":
          this.see2 = false;
          let newfech: any = this.updatefecha(inputvalue, 12)
          this.form.get('prop2')?.setValue(newfech);
          this.see2 = true;
          break;
        case "Verificacion":
          this.see2 = false;
          let fech2: any =  this.updatefecha(inputvalue, 6)
          this.form.get('prop2')?.setValue(fech2);
          this.see2 = true;
          break;
      }

  }

  addpropety() {
    this.type.push(this.form.value.typeform);
    this.propety1.push(this.form.value.prop1);
    this.propety2.push(this.form.value.prop2);
    this.propety3.push(this.form.value.prop3);
    this.IDList.push('-1');
    this.canAddPropety = false;


    const typeArray: FormArray = this.form.get('typeList') as FormArray;
    const propetyArray1: FormArray = this.form.get('propetyList1') as FormArray;
    const propetyArray2: FormArray = this.form.get('propetyList2') as FormArray;
    const propetyArray3: FormArray = this.form.get('propetyList3') as FormArray;

    typeArray.push(new FormControl(this.form.value.type));
    propetyArray1.push(new FormControl(this.form.value.prop1));
    propetyArray2.push(new FormControl(this.form.value.prop3));
    propetyArray3.push(new FormControl(this.form.value.prop3));


    this.form.get('typeform')?.setValue("");
    this.form.get('prop1')?.setValue("");
    this.form.get('prop2')?.setValue("");
    this.form.get('prop3')?.setValue("");

    this.see1 = false;
    this.see2 = false;
    this.see3 = false;
  }

  deletePropety(i: number) {
    this.type.splice(i, 1);
    this.propety1.splice(i, 1);
    this.propety2.splice(i, 1);
    this.propety3.splice(i, 1);
    this.IDList.splice(i, 1);

    //control de cambio que activa el reactform
    const typeArray: FormArray = this.form.get('typeList') as FormArray;
    const propetyArray1: FormArray = this.form.get('propetyList1') as FormArray;
    const propetyArray2: FormArray = this.form.get('propetyList2') as FormArray;
    const propetyArray3: FormArray = this.form.get('propetyList3') as FormArray;
    typeArray.removeAt(i);
    propetyArray1.removeAt(i);
    propetyArray2.removeAt(i);
    propetyArray3.removeAt(i);
  }

  funpropety(i: number, value: any) {
    console.log(value)
    console.log(i)
    this.propety1[i] = this.propetyList1[i] = value;
    if (this.typePropetyList[i] != 'Seguro') {
      switch (this.type[i]) {
        case "Verificacion":
          this.propety2[i] = this.propetyList2[i] = this.updatefecha(value, 6)
          break;
        case "Tenencia":
          this.propety2[i] = this.propetyList2[i] = this.updatefecha(value, 12)
          break;
      }
    }

    this.datesee=true;

  }

  funpropety2(i: number, value: any) {
    this.propety2[i] = this.propetyList2[i] = value;
  }

  funpropety3(i: number, value: any) {
    this.propety3[i] = this.propetyList3[i] = value;
  }

  updatefecha(d: String, mv: any) {
    this.datesee = false;
    let Years = d.substring(0, 4)
    let Months = d.substring(5, 7)
    let Days = d.substring(8, 11)

    var Yint: any = parseInt(Years);
    var Mint: any = parseInt(Months);
    var Dint: any = parseInt(Days);

    Mint = Mint + parseInt(mv);
    if (Mint > 12) {
      Yint += 1;
      Mint -= 12;
    }

    if(Mint < 10)
      Mint = '0'+Mint.toString()

    if(Dint < 10)
      Dint = '0'+Dint.toString()

    if(Yint < 10){
      Yint = "000"+Yint.toString()
    }else if(Yint > 10 && Yint < 100){
      Yint = "00"+Yint.toString()
    }else if(Yint > 100 && Yint < 1000){
      Yint = "0"+Yint.toString()
    }

    let hall = Yint.toString().concat('-');
    hall = hall.concat(Mint.toString());
    hall = hall.concat('-');
    hall = hall.concat(Dint.toString());
    console.log(hall)
    return hall



  }

}

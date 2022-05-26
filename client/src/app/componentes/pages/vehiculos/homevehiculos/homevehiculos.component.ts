import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import Swal from 'sweetalert2'
import { Vehiculos } from 'src/app/models/Vehiculos'
import {Title} from "@angular/platform-browser";
import { VehiculosService } from 'src/app/services/vehiculo_service/vehiculos.service';


@Component({
  selector: 'app-homevehiculos',
  templateUrl: './homevehiculos.component.html',
  styleUrls: ['./homevehiculos.component.css']
})
export class HomevehiculosComponent implements OnInit {
  userId = ""
  typePropetyList: string[] = ["","Verificacion", "Tenencia", "Seguro"];
  isformShow = false //Para determinar si se muestra o no el formulario
  canAddPropety = false //Variable que deshabilita el botón de añadir contacto
  @ViewChild('type') type?: ElementRef;
  @ViewChild('propety1') propety1?: ElementRef;
  @ViewChild('propety2') propety2?: ElementRef;
  @ViewChild('propety3') propety3?: ElementRef;
  p1 = "";
  p2 = "";
  p3 = "";
  typeList: any = [];
  propetyList1: any = [];
  propetyList2: any = [];
  propetyList3: any = [];
  form!: FormGroup; //Formulario reactivo
  newVehiculo!: Vehiculos;
  vehiculosLits: any = [];
  existeName: boolean = false;
  canAdd: boolean = true;
  existeAp: boolean = false;
  existeAm: boolean = false;
  see1: boolean = false;
  see2: boolean = false;
  see3: boolean = false;
  ingreso: boolean = true;

  constructor(private formBuilder: FormBuilder, private vehiculosService: VehiculosService, private titleService:Title) {
    this.titleService.setTitle("SIR - Vehiculos - Home");
    this.buildForm();
  }

  //Optenemos vehiculos registrados para mostrar debajo
  ngOnInit(): void {
    if (localStorage.getItem('sesion')) {
      const sesion = localStorage.getItem('sesion');
      let value = " " + sesion + " ";
      this.userId = JSON.parse(value)["id"];
      this.vehiculosService.getVehiculos()
        .subscribe({
          next: (v) => {
            this.vehiculosLits = v
          },
          error: (e) => { console.log(e) },
          complete: () => {console.info('complete'); console.log(this.vehiculosLits)}
        })
    } else {
      location.replace('');
    }

  }

  private buildForm() {
    this.form = this.formBuilder.group({
      Placas: ['', [Validators.required]],
      Modelo: ['', [Validators.required]],
      Propietario: ['', [Validators.required]],
      NoSerie: ['', [Validators.required]],
      type: ['',],
      propety1: ['',],
      propety2: ['',],
      propety3: ['',],
      propety4: ['',],
      typeList: new FormArray([]),
      propetyList1: new FormArray([]),
      propetyList2: new FormArray([]),
      propetyList3: new FormArray([]),
    });
    //Evaluación reactiva
    this.form.valueChanges
      .pipe(
        debounceTime(500)
      )
      .subscribe(value => {

        if (value.type == "") {
          this.canAddPropety = false
        }
        else {
          this.canAddPropety = true
        }



        if(value.Placas){
          this.newVehiculo = {
            Placas: value.Placas,
          };
          this.vehiculosService.verifyVehiculo(this.newVehiculo)
            .subscribe({
              next: (v) => {
                if (JSON.parse(JSON.stringify(v)).message == 'Existe') {
                  this.existeName = true;
                  this.canAdd=true;

                } else if (JSON.parse(JSON.stringify(v)).message == 'No existe') {
                  this.existeName = false;
                  this.canAdd=false;

                }
              },
              error: (e) => { },
              complete: () => console.info('complete')
            })
        }


        if (this.typeList.some((x: string) => x == 'Verificacion') && this.typeList.some((x: string) => x == 'Tenencia') && this.typeList.some((x: string) => x == 'Seguro')) {
          this.ingreso = false;
          this.typePropetyList = [];
          this.ingreso = true;
        } else if (!this.typeList.some((x: string) => x == 'Verificacion') && this.typeList.some((x: string) => x == 'Tenencia') && this.typeList.some((x: string) => x == 'Seguro')) {
          this.ingreso = false;
          this.typePropetyList = ["Verificacion"];
          this.ingreso = true;
        } else if (this.typeList.some((x: string) => x == 'Verificacion') && this.typeList.some((x: string) => x == 'Tenencia')) {
          this.ingreso = false;
          this.typePropetyList = ["Seguro"];
          this.ingreso = true;
        } else if (this.typeList.some((x: string) => x == 'Verificacion') && this.typeList.some((x: string) => x == 'Seguro')) {
          this.ingreso = false;
          this.typePropetyList = ["Tenencia"];
          this.ingreso = true;
        } else if (this.typeList.some((x: string) => x == 'Verificacion')) {
          this.ingreso = false;
          this.typePropetyList = ["Seguro", "Tenencia"];
          this.ingreso = true;
        } else if (this.typeList.some((x: string) => x == 'Seguro')) {
          this.ingreso = false;
          this.typePropetyList = ["Verificacion", "Tenencia"];
          this.ingreso = true;
        } else if (this.typeList.some((x: string) => x == 'Tenencia')) {
          this.ingreso = false;
          this.typePropetyList = ["Verificacion", "Seguro"];
          this.ingreso = true;
        } else {
          this.ingreso = false;
          this.typePropetyList = ["Verificacion", "Seguro", "Tenencia"];
          this.ingreso = true;
        }

      })
  //end subscribe


  }//end build form

  select() {
    switch (this.form.value.type) {
      case "Verificacion":
        this.p3 = "Fecha Ultima Verificacion";
        this.see1 = false;
        this.see2 = false;
        this.see3 = true;
        this.form.get('propety1')?.setValue("");
        this.form.get('propety2')?.setValue("");
        break;
      case "Seguro":
        this.see1 = true;
        this.p1= "Nombre del Provedor";
        this.see2 = true;
        this.p2 = "No. Poliza";
        this.see3 = true;
        this.p3 = "Ultimo Pago Renovacion";
        this.form.get('propety3')?.setValue("");
        break;
      case "Tenencia":
        this.p3 = "Fecha Ultimo Tenencia";
        this.see1 = false;
        this.see2 = false;
        this.see3 = true;
        this.form.get('propety1')?.setValue("");
        this.form.get('propety2')?.setValue("");
        break;
      case "":
        this.see1 = false;
        this.see2 = false;
        this.see3 = false;
        this.form.get('propety1')?.setValue("");
        this.form.get('propety2')?.setValue("");
        this.form.get('propety3')?.setValue("");
        break;
    }
  }


  showForm() {

    if (this.isformShow) {
      this.isformShow = false
    } else {
      this.isformShow = true
    }
  }

  addPropety() {
    const typeArray: FormArray = this.form.get('typeList') as FormArray;
    const propetyArray1: FormArray = this.form.get('propetyList1') as FormArray;
    const propetyArray2: FormArray = this.form.get('propetyList2') as FormArray;
    const propetyArray3: FormArray = this.form.get('propetyList3') as FormArray;
    typeArray.push(new FormControl(this.form.value.type));

    this.canAddPropety = false;


    propetyArray1.push(new FormControl(this.form.value.propety1));
    propetyArray2.push(new FormControl(this.form.value.propety2));
    propetyArray3.push(new FormControl(this.form.value.propety3));
    this.typeList.push(this.form.value.type)
    this.propetyList1.push(this.form.value.propety1)
    this.propetyList2.push(this.form.value.propety2)
    this.propetyList3.push(this.form.value.propety3)

    this.form.get('type')?.setValue("");
    this.form.get('propety1')?.setValue("");
    this.form.get('propety2')?.setValue("");
    this.form.get('propety3')?.setValue("");
    this.see1 = false;
    this.see2 = false;
    this.see3 = false;
    this.type!.nativeElement.value = "";
  }

  deletePropety(i: number) {
    this.typeList.splice(i, 1);
    this.propetyList1.splice(i, 1);
    this.propetyList2.splice(i, 1);
    this.propetyList3.splice(i, 1);
    const typeArray: FormArray = this.form.get('typeList') as FormArray;
    const propetyArray1: FormArray = this.form.get('propetyList1') as FormArray;
    const propetyArray2: FormArray = this.form.get('propetyList2') as FormArray;
    const propetyArray3: FormArray = this.form.get('propetyList3') as FormArray;
    typeArray.removeAt(i);
    propetyArray1.removeAt(i);
    propetyArray2.removeAt(i);
    propetyArray3.removeAt(i);
  }

  deleteVehiculo(id: string) {
    Swal.fire({
      title: '¿Seguro que desea eliminar a este Vehiculo?',
      text: "",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#AEB6BF',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.vehiculosService.deleteVehiculo(id)
          .subscribe({
            next: (v) => {
              Swal.fire(
                'Eliminado',
                'El Vehiculo ha sido eliminado del registro',
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

  sendvehiculo(event: Event) {
    event.preventDefault();
    const value = this.form.value;
    console.log(this.typeList);
    this.newVehiculo = {
      Modelo: value.Modelo,
      Placas: value.Placas,
      Propietario: value.Propietario,
      NoSerie: value.NoSerie,
      type: value.typeList,
      propety1: value.propetyList1,
      propety2: value.propetyList2,
      propety3: value.propetyList3,
    };
    this.vehiculosService.saveVehiculo(this.newVehiculo)
      .subscribe({
        next: (v) => {
          Swal.fire(
            'Vehiculo registrado con éxito',
            '',
            'success'
          ).then((result) => {
            this.isformShow = false
            location.reload();

          })
        },
        error: (e) => { console.error(e) },
        complete: () => console.info('complete')
      })
  }
}

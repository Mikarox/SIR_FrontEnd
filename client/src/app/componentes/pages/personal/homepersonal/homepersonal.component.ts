import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import Swal from 'sweetalert2'
import { Personal } from 'src/app/models/Personal';
import { PersonalService } from 'src/app/services/personal_service/personal.service';
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-homepersonal',
  templateUrl: './homepersonal.component.html',
  styleUrls: ['./homepersonal.component.css']
})
export class HomepersonalComponent implements OnInit {
  userId = ""

  typePropetyList: string[] = ["Ingreso", "Contrato", "Equipamiento", "Salario"];
  opList: string[] = ["Meses", "Años ", "Indefinido"];
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
  newPersonal!: Personal;
  personalLits: any = [];
  existeName: boolean = false;
  canAdd: boolean = true;
  existeAp: boolean = false;
  existeAm: boolean = false;
  see1: boolean = false;
  see2: boolean = false;
  see3: boolean = false;
  see4: boolean = false;
  ingreso: boolean = true;

  constructor(private formBuilder: FormBuilder, private personalservice: PersonalService, private titleService:Title) {
    this.titleService.setTitle("SIR - Personal - Home");
    this.buildForm();
  }

  ngOnInit(): void {
    if (localStorage.getItem('sesion')) {
      const sesion = localStorage.getItem('sesion');
      let value = " " + sesion + " ";
      this.userId = JSON.parse(value)["id"];
      this.personalservice.getPersonals()
        .subscribe({
          next: (v) => {
            this.personalLits = v
          },
          error: (e) => { console.log(e) },
          complete: () => console.info('complete')
        })
    } else {
      location.replace('');
    }

  }

  private buildForm() {
    this.form = this.formBuilder.group({
      Nombres: ['', [Validators.required]],
      A_paterno: ['', [Validators.required]],
      A_materno: ['', [Validators.required]],
      birthday: ['', [Validators.required]],
      type: ['',],
      propety1: ['',],
      propety2: ['',],
      propety3: ['',],
      propety4: ['',],
      typeList: new FormArray([], [Validators.required]),
      propetyList1: new FormArray([], [Validators.required]),
      propetyList2: new FormArray([], [Validators.required]),
      propetyList3: new FormArray([], [Validators.required]),
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
        //Verificar si existen coincidencias en la base de dat

        if (value.Nombres) {
          this.newPersonal = {
            Nombres: value.Nombres,
            A_paterno: value.A_paterno,
            A_materno: value.A_materno
          };
          this.personalservice.verifyPersonal(this.newPersonal)
            .subscribe({
              next: (v) => {
                if (JSON.parse(JSON.stringify(v)).message == 'Existe') {
                  this.existeName = true;
                  this.existeAm = true;
                  this.existeAp = true;
                  if (this.typeList.some((x: string) => x == 'Ingreso')){
                    this.canAdd = true;
                  }
                } else if (JSON.parse(JSON.stringify(v)).message == 'No existe') {
                  this.existeName = false;
                  this.existeAm = false;
                  this.existeAp = false;
                  if (this.typeList.some((x: string) => x == 'Ingreso')){
                    this.canAdd = false;
                  }
                }
              },
              error: (e) => { },
              complete: () => console.info('complete')
            })
        }




        if (this.typeList.some((x: string) => x == 'Ingreso') && this.typeList.some((x: string) => x == 'Salario') && this.typeList.some((x: string) => x == 'Contrato')) {
          this.ingreso = false;
          this.typePropetyList = ["Equipamiento"];
          this.ingreso = true;
          this.canAdd = false;
        } else if (!this.typeList.some((x: string) => x == 'Ingreso') && this.typeList.some((x: string) => x == 'Salario') && this.typeList.some((x: string) => x == 'Contrato')) {
          this.ingreso = false;
          this.typePropetyList = ["Ingreso", "Equipamiento"];
          this.ingreso = true;
          this.canAdd = true;
        } else if (this.typeList.some((x: string) => x == 'Ingreso') && this.typeList.some((x: string) => x == 'Contrato')) {
          this.ingreso = false;
          this.typePropetyList = ["Salario", "Equipamiento"];
          this.ingreso = true;
          this.canAdd = false;
        } else if (this.typeList.some((x: string) => x == 'Ingreso') && this.typeList.some((x: string) => x == 'Salario')) {
          this.ingreso = false;
          this.typePropetyList = ["Contrato", "Equipamiento"];
          this.ingreso = true;
          this.canAdd = false;
        } else if (this.typeList.some((x: string) => x == 'Ingreso')) {
          this.ingreso = false;
          this.typePropetyList = ["Contrato", "Equipamiento", "Salario"];
          this.ingreso = true;
          this.canAdd = false;
        } else if (this.typeList.some((x: string) => x == 'Salario')) {
          this.ingreso = false;
          this.typePropetyList = ["Ingreso", "Contrato", "Equipamiento"];
          this.ingreso = true;
          this.canAdd = true;
        } else if (this.typeList.some((x: string) => x == 'Contrato')) {
          this.ingreso = false;
          this.typePropetyList = ["Ingreso", "Salario", "Equipamiento"];
          this.ingreso = true;
          this.canAdd = true;
        } else {
          this.ingreso = false;
          this.typePropetyList = ["Ingreso", "Contrato", "Equipamiento", "Salario"];
          this.ingreso = true;
          this.canAdd = true;
        }


      })



  }

  select() {
    switch (this.form.value.type) {
      case "Ingreso":
        this.p3 = "Fecha De Ingreso";
        this.see1 = false;
        this.see2 = false;
        this.see3 = true;
        this.see4 = false;
        this.form.get('propety1')?.setValue("");
        this.form.get('propety2')?.setValue("");
        break;
      case "Contrato":
        this.see4 = true;
        this.see1 = false;
        this.see2 = false;
        this.see3 = false;
        this.form.get('propety2')?.setValue("");
        this.form.get('propety3')?.setValue("");
        break;
      case "Equipamiento":
        this.see1 = true;
        this.see2 = true;
        this.see3 = true;
        this.see4 = false;
        this.p1 = "Nombre Equipamiento";
        this.p2 = "Detalles";
        this.p3 = "Fecha Ultima Entrega";
        break;
      case "Salario":
        this.p1 = "Cantidad";
        this.see1 = true;
        this.see2 = false;
        this.see3 = false;
        this.see4 = false;
        this.form.get('propety2')?.setValue("");
        this.form.get('propety3')?.setValue("");
        break;
      case "":
        this.see1 = false;
        this.see2 = false;
        this.see3 = false;
        this.see4 = false;
        this.form.get('propety1')?.setValue("");
        this.form.get('propety2')?.setValue("");
        this.form.get('propety3')?.setValue("");
        break;
    }
  }


  sel2() {
    this.see1 = false;
    switch (this.form.value.propety4) {
      case '0':
        this.p1 = "Cantidad Meses (numero)";
        this.see1 = true;
        break;
      case '1':
        this.p1 = "Cantidad Años (numero)";
        this.see1 = true;
        break;
      case '2':
        this.p1 = "NUll";
        this.see1 = false;
        break;

      default:
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

    if (this.form.value.type == 'Contrato') {
      propetyArray2.push(new FormControl(this.form.value.propety4));
    } else {
      propetyArray2.push(new FormControl(this.form.value.propety2));
    }

    propetyArray1.push(new FormControl(this.form.value.propety1));
    propetyArray3.push(new FormControl(this.form.value.propety3));
    this.typeList.push(this.form.value.type)
    this.propetyList1.push(this.form.value.propety1)
    this.propetyList2.push(this.form.value.propety2)
    this.propetyList3.push(this.form.value.propety3)
    console.log("otro:")
    console.log(this.typeList);
    console.log(this.propetyList1);


    this.form.get('type')?.setValue("");
    this.form.get('propety1')?.setValue("");
    this.form.get('propety2')?.setValue("");
    this.form.get('propety3')?.setValue("");
    this.see1 = false;
    this.see2 = false;
    this.see3 = false;
    this.see4 = false;
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

  deletePersonal(id: string) {
    Swal.fire({
      title: '¿Seguro que desea eliminar a este personal?',
      text: "",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#AEB6BF',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.personalservice.deletePersonal(id)
          .subscribe({
            next: (v) => {
              Swal.fire(
                'Eliminado',
                'El personal ha sido eliminado del registro',
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

  sendpersonal(event: Event) {
    event.preventDefault();
    const value = this.form.value;
    console.log(this.typeList);
    this.newPersonal = {
      Nombres: value.Nombres,
      A_paterno: value.A_paterno,
      A_materno: value.A_materno,
      birthday: value.birthday,
      type: value.typeList,
      propety1: value.propetyList1,
      propety2: value.propetyList2,
      propety3: value.propetyList3,
    };
    this.personalservice.savePersonal(this.newPersonal)
      .subscribe({
        next: (v) => {
          Swal.fire(
            'personal registrado con éxito',
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

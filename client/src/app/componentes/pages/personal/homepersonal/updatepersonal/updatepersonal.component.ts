import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Personal } from 'src/app/models/Personal';
import { PersonalService } from 'src/app/services/personal_service/personal.service';
import { Title } from '@angular/platform-browser';
import { formatDate } from '@angular/common';
import { concat } from 'rxjs';

@Component({
  selector: 'app-updatepersonal',
  templateUrl: './updatepersonal.component.html',
  styleUrls: ['./updatepersonal.component.css']
})
export class UpdatepersonalComponent implements OnInit {
  personalInfo: any = [];
  eqs: any = [];
  eqid: any = [];
  eqfechas: any = [];
  eqdetalles: any = [];
  eqprox: any = [];
  Amotivos: any = [];
  ADetalles: any = [];
  AFechas: any = [];
  AIds: any = [];

  idPerson: any;

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
  propetyListID: any = [];
  form!: FormGroup; //Formulario reactivo
  updatePersonal!: Personal;
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
  ingresodate: any;
  datesee = true;


  constructor(private formBuilder: FormBuilder, private router: Router, private route: ActivatedRoute, private personalService: PersonalService, private titleService: Title) {
    this.titleService.setTitle("SIR - Personal - Edit");
    this.buildForm();


  }



  ngOnInit(): void {
    this.idPerson = this.route.snapshot.paramMap.get('id');
    this.personalService.getPersonal(this.idPerson)
      .subscribe({
        next: (v) => {
          this.personalInfo = v;

          this.form.controls['Nombres'].setValue(this.personalInfo.Nombres);
          this.form.controls['A_paterno'].setValue(this.personalInfo.A_paterno);
          this.form.controls['A_materno'].setValue(this.personalInfo.A_materno);
          this.form.controls['birthday'].setValue(formatDate(this.personalInfo.birthday, 'yyyy-MM-dd', 'en_US'));

          if (this.personalInfo.EqID)
            this.eqid = this.personalInfo.EqID.split(";");
          if (this.personalInfo.EqNom)
            this.eqs = this.personalInfo.EqNom.split(";");
          if (this.personalInfo.LastDelivery)
            this.eqfechas = this.personalInfo.LastDelivery.split(";");
          if (this.personalInfo.EqDetalles)
            this.eqdetalles = this.personalInfo.EqDetalles.split(';');
          if (this.personalInfo.ProxFecha)
            this.eqprox = this.personalInfo.ProxFecha.split(";");
          if (this.personalInfo.AAMotivo)
            this.Amotivos = this.personalInfo.AAMotivo.split(";");
          if (this.personalInfo.AADetalles)
            this.ADetalles = this.personalInfo.AADetalles.split(";");
          if (this.personalInfo.AAFecha)
            this.AFechas = this.personalInfo.AAFecha.split(";");
          if (this.personalInfo.AAId)
            this.AIds = this.personalInfo.AAId.split(";");


          const typeArray: FormArray = this.form.get('typeList') as FormArray;
          const propetyArray1: FormArray = this.form.get('propetyList1') as FormArray;
          const propetyArray2: FormArray = this.form.get('propetyList2') as FormArray;
          const propetyArray3: FormArray = this.form.get('propetyList3') as FormArray;

          //si existe contrato agregamos la propiedad al ingreso
          if (this.personalInfo.FK_Fecha_Ingreso) {
            this.typeList.push(this.personalInfo.FPasunto);
            this.propetyList1.push('');
            this.propetyList2.push('');
            this.propetyList3.push(formatDate(this.personalInfo.Ingreso,'yyyy-MM-dd', 'en_US'));
            this.propetyListID.push(this.personalInfo.FK_Fecha_Ingreso);
            this.ingresodate = formatDate(this.personalInfo.Ingreso,'yyyy-MM-dd', 'en_US');

            typeArray.push(new FormControl(this.personalInfo.FPasunto));
            propetyArray1.push(new FormControl(''));
            propetyArray2.push(new FormControl(''));
            propetyArray3.push(new FormControl(this.personalInfo.Ingreso));
          }


          //propiedad de contrato
          if (this.personalInfo.FK_ID_Contrato) {
            this.typeList.push(this.personalInfo.FCAsunto);
            this.propetyList1.push(this.personalInfo.cantidad);
            this.propetyList2.push(this.personalInfo.CType);
            this.propetyList3.push(formatDate(this.personalInfo.FechaContratoEND, 'yyyy-MM-dd', 'en_US'));
            this.propetyListID.push(this.personalInfo.FK_ID_Contrato);

            typeArray.push(new FormControl(this.personalInfo.FCAsunto));
            propetyArray1.push(new FormControl(this.personalInfo.cantidad));
            propetyArray2.push(new FormControl(this.personalInfo.CType));
            propetyArray3.push(new FormControl(this.personalInfo.FechaContratoEND));
          }

          //propiedad de Salario
          if (this.personalInfo.FK_ID_Vacaciones) {
            this.typeList.push('Salario');
            this.propetyList1.push(this.personalInfo.Salario);
            this.propetyList2.push('');
            this.propetyList3.push('');

            this.propetyListID.push(this.personalInfo.FK_ID_Vacaciones);

            typeArray.push(new FormControl('Salario'));
            propetyArray1.push(new FormControl(this.personalInfo.Salario));
            propetyArray2.push(new FormControl(''));
            propetyArray3.push(new FormControl(''));
          }


          //for agregar equipos a arreglo
          for (var i = 0; i < this.eqs.length; i++) {
            typeArray.push(new FormControl('Equipamiento'));
            propetyArray1.push(new FormControl(this.eqs[i]));
            propetyArray2.push(new FormControl(this.eqdetalles[i]));
            propetyArray3.push(new FormControl(this.eqfechas[i]));


            this.typeList.push('Equipamiento');
            this.propetyList1.push(this.eqs[i]);
            this.propetyList2.push(this.eqdetalles[i]);
            this.propetyList3.push(this.eqfechas[i]);
            this.propetyListID.push(this.eqid[i]);
          }

          //for agregar cartas administrativas
          for (var i = 0; i < this.ADetalles.length; i++) {
            typeArray.push(new FormControl('ActaAdministrativa'));
            propetyArray1.push(new FormControl(this.Amotivos[i]));
            propetyArray2.push(new FormControl(this.ADetalles[i]));
            propetyArray3.push(new FormControl(this.AFechas[i]));

            this.typeList.push('ActaAdministrativa');
            this.propetyList1.push(this.Amotivos[i]);
            this.propetyList2.push(this.ADetalles[i]);
            this.propetyList3.push(this.AFechas[i]);
            this.propetyListID.push(this.AIds[i]);
          }

        },
        error: (e) => { console.log(e) },
        complete: () => console.info('complete')
      });



  }//en oninit

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
          this.updatePersonal = {
            ID_Personal: this.personalInfo.ID_Personal,
            Nombres: value.Nombres,
            A_paterno: value.A_paterno,
            A_materno: value.A_materno
          };
          this.personalService.verifyPersonalUpdate(this.updatePersonal)
            .subscribe({
              next: (v) => {
                if (JSON.parse(JSON.stringify(v)).message == 'Existe') {
                  this.existeName = true;
                  this.existeAm = true;
                  this.existeAp = true;
                    this.canAdd = true;
                } else if (JSON.parse(JSON.stringify(v)).message == 'No existe') {
                  this.existeName = false;
                  this.existeAm = false;
                  this.existeAp = false;
                    this.canAdd = false;

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



  }//end form

  addPropety() {
    const typeArray: FormArray = this.form.get('typeList') as FormArray;
    const propetyArray1: FormArray = this.form.get('propetyList1') as FormArray;
    const propetyArray2: FormArray = this.form.get('propetyList2') as FormArray;
    const propetyArray3: FormArray = this.form.get('propetyList3') as FormArray;
    typeArray.push(new FormControl(this.form.value.type));

    this.canAddPropety = false;

    if (this.form.value.type == 'Contrato') {
      console.log(this.form.value.propety4)
      propetyArray2.push(new FormControl(this.form.value.propety4));
    } else {
      propetyArray2.push(new FormControl(this.form.value.propety2));
    }

    propetyArray1.push(new FormControl(this.form.value.propety1));
    propetyArray3.push(new FormControl(this.form.value.propety3));
    this.typeList.push(this.form.value.type)
    this.propetyList1.push(this.form.value.propety1)


    if (this.form.value.type == 'Contrato') {
      this.propetyList2.push(this.form.value.propety4)
    } else {
      this.propetyList2.push(this.form.value.propety2)
    }

    this.propetyList3.push(this.form.value.propety3)
    this.propetyListID.push('-1');
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
    this.propetyListID.splice(i, 1);
    const typeArray: FormArray = this.form.get('typeList') as FormArray;
    const propetyArray1: FormArray = this.form.get('propetyList1') as FormArray;
    const propetyArray2: FormArray = this.form.get('propetyList2') as FormArray;
    const propetyArray3: FormArray = this.form.get('propetyList3') as FormArray;
    typeArray.removeAt(i);
    propetyArray1.removeAt(i);
    propetyArray2.removeAt(i);
    propetyArray3.removeAt(i);

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

  funpropety(i: number, valor:any){
    this.propetyList1[i]=valor;
    if(this.typeList[i] == 'Contrato'){
      this.fechaupdate(i,valor);
    }
  }

  funpropety2(i: number, valor:any){
    if(this.typeList[i] == 'Contrato'){
      this.propetyList2[i]=valor.value;
      this.fechaupdate(i,this.propetyList1[i]);
    }else{
      this.propetyList2[i]=valor;
    }

  }

  funpropety3(i: number, valor:any){
    this.propetyList3[i]=valor;
    if(this.typeList[i] == 'Ingreso'){
      this.ingresodate = valor;
    }

    if(this.typeList[i] == 'Ingreso'){
      this.fechaupdate(this.typeList.indexOf('Contrato'),this.propetyList1[this.typeList.indexOf('Contrato')]);
    }

  }

  fechaupdate(i: number, valor: any){
    if(this.typeList[i] == 'Contrato'){
      this.datesee = false;
      let Years = this.ingresodate.substring(0,4)
      let Months = this.ingresodate.substring(5,7)
      let Days = this.ingresodate.substring(8,11)

      var Yint = parseInt(Years);
      var Mint = parseInt(Months);
      var Dint = parseInt(Days);


      if(this.propetyList2[i] == '0'){
        Mint =  Mint + parseInt(valor);
        if(Mint>12){
          Yint+=1;
          Mint-=12;
        }
        let hall = Yint.toString().concat('-');

        if (Mint < 10) {
          hall = hall.concat('0');
        }
        hall = hall.concat(Mint.toString());

        hall = hall.concat('-');

        if (Dint < 10) {
          hall = hall.concat('0');
        }

        hall = hall.concat(Dint.toString());


        this.propetyList3[i] = hall;
      }else if (this.propetyList2[i] == '1'){
        Yint = Yint + parseInt(valor);

        let hall = Yint.toString().concat('-');
        hall = hall.concat(Mint.toString());
        hall = hall.concat('-');
        hall = hall.concat(Dint.toString());


        this.propetyList3[i] = hall;
      }else{
        this.propetyList3[i] = '';
      }


      this.datesee = false;
      this.datesee = true;
    }


    if(this.typeList[i] == 'Ingreso'){

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

  editpersonal(event: Event){event.preventDefault();
    Swal.fire({
      title: '¿Seguro que desea actualizar a este personal?',
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

        console.log(this.propetyList1)
        console.log(this.propetyList2)
        console.log(this.propetyList3)
        console.log(this.propetyListID)

        console.log(value.typeList)

        this.updatePersonal = {
          Nombres: value.Nombres,
          A_paterno: value.A_paterno,
          A_materno: value.A_materno,
          birthday: value.birthday,
          type: this.typeList,
          propety1: this.propetyList1,
          propety2: this.propetyList2,
          propety3: this.propetyList3,
          propetyid: this.propetyListID,
        };
        this.personalService.updatePersonal(this.idPerson,this.updatePersonal)
        .subscribe({
          next: (v) => {
            console.log(v)
            Swal.fire(
              'Los nuevos cambios se han efectuado en el personal',
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

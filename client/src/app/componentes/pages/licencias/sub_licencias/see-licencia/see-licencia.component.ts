import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { LicenciasService } from 'src/app/services/licencias_service/licencias.service';
import { Licencia } from 'src/app/models/Licencia';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-see-licencia',
  templateUrl: './see-licencia.component.html',
  styleUrls: ['./see-licencia.component.css']
})
export class SeeLicenciaComponent implements OnInit {
  allLicence: any;

  newlicencia!: Licencia;
  isformShow = false;
  form!: FormGroup;
  userID: any;
  TypeList: String[] = ["Garantias", "Servicios", "Licencias", "Fecha"];
  TypeListFecha: String[] = ["Meses", "Años"];
  institucionsee = false;
  datallesee = false;
  fechasee = false;
  proxfechasee = false;
  tiposee = false;
  cantidadsee = false;

  titleinstitucion = "";
  titledetalles = "";
  titlefecha = "";
  titletipo = "";
  titlecantidad = "";
  titleproxfecha = "";

  Fecha: String = "";
  typeFecha: any = "";
  cantidadfecha: any;
  id: any;
  titulo = "";

  Institucion:any;
  detalles:any;
  fechaadqui:any;
  tipo:any;
  cantidad:any;
  proximafecha:any;


  constructor(private formbuilder: FormBuilder,private router: Router, private route: ActivatedRoute, private licenciaService: LicenciasService, private titleService: Title) {
    this.titleService.setTitle("SIR - Licencias - HOME");
    this.buildForm();
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.licenciaService.getLicenciaOne(this.id)
      .subscribe({
        next: (r) => {
          this.allLicence = r;
          this.allLicence = this.allLicence[0];

          this.titleService.setTitle("SIR - Editar Licencia - " + this.allLicence.categoria);
          // let fecha = formatDate(this.s.Fvencimiento, 'yyyy-MM-dd', 'en_US')

          this.cantidad = this.allLicence.cantidad;
          this.titulo = this.allLicence.categoria;
          this.Institucion =this.allLicence.Institucion;

          this.detalles =this.allLicence.detalles;

          this.fechaadqui = formatDate(this.allLicence.FechaAdquirida, 'yyyy-MM-dd', 'en_US');
          this.Fecha = formatDate(this.allLicence.FechaAdquirida, 'yyyy-MM-dd', 'en_US');
          this.typeFecha = this.allLicence.tipo;
          this.tipo = this.allLicence.tipo;
          this.cantidadfecha = this.allLicence.cantidad;

          this.proximafecha = formatDate(this.allLicence.Fecha, 'yyyy-MM-dd', 'en_US');

          console.log(this.Fecha);
          console.log(this.typeFecha);
          console.log(this.cantidadfecha);
          this.tipeselect(this.allLicence.categoria);

        },
        error: (e) => { console.log(e) },
        complete: () => console.info('complete')
      });


  }

  private buildForm() {
    this.form = this.formbuilder.group({
      Categoria: ['', [Validators.required]],
      Institucion: ['', [Validators.required]],
      Detalles: ['', [Validators.required]],
      Fecha: ['',],
      Tipo: ['',],
      Cantidad: ['',],
      Vencimiento: ['',[Validators.required]]
    })
  }

  showForm() {
    if (this.isformShow) {
      this.isformShow = false;
    } else {
      this.isformShow = true;
    }

  }

  tipeselect(type: any) {

    switch (type) {
      case "Garantias":
        this.institucionsee = false;
        this.datallesee = false;
        this.fechasee = false;
        this.tiposee = false;
        this.cantidadsee = false;
        this.proxfechasee = false;

        this.titleinstitucion = "Fabricante Responsable:";
        this.titledetalles = "Detalles De Garantia:";
        this.titlefecha = "Adquicision Garantia:";
        this.titletipo = "Sucede cada (Tiempo)";
        this.titlecantidad = "Sucede cada (Numero)";
        this.titleproxfecha = "Vencimiento de Garantia:";

        this.institucionsee = true;
        this.fechasee = true;
        this.datallesee = true;
        this.proxfechasee = true;
        this.tiposee = true;
        this.cantidadsee = true;
        break;
      case "Servicios":
        this.institucionsee = false;
        this.datallesee = false;
        this.fechasee = false;
        this.tiposee = false;
        this.cantidadsee = false;
        this.proxfechasee = false;

        this.titleinstitucion = "Provedor de Servicio:";
        this.titledetalles = "Detalles De Servicio:";
        this.titlefecha = "Fecha Limite de Pago:";
        this.titletipo = "Sucede cada (Tiempo)";
        this.titlecantidad = "Sucede cada (Numero)";
        this.titleproxfecha = "Proxima Fecha de Pago:";

        this.institucionsee = true;
        this.fechasee = true;
        this.datallesee = true;
        this.proxfechasee = true;
        this.tiposee = true;
        this.cantidadsee = true;
        break;

      case "Licencias":
        this.institucionsee = false;
        this.datallesee = false;
        this.fechasee = false;
        this.tiposee = false;
        this.cantidadsee = false;
        this.proxfechasee = false;

        this.titleinstitucion = "Provedor de Licencia:";
        this.titledetalles = "Detalles De Licencia:";
        this.titleproxfecha = "Vencimiento de Licencia:";


        this.institucionsee = true;
        this.datallesee = true;
        this.proxfechasee = true;
        break;
      case "Fecha":
        this.institucionsee = false;
        this.datallesee = false;
        this.fechasee = false;
        this.tiposee = false;
        this.cantidadsee = false;
        this.proxfechasee = false;

        this.titleinstitucion = "Titulo Fecha :";
        this.titledetalles = "Detalles de fecha:";
        this.titleproxfecha = "Fecha Aniversario:";

        this.institucionsee = true;
        this.proxfechasee = true;
        this.datallesee = true;
        break;
      default:
        this.institucionsee = false;
        this.datallesee = false;
        this.fechasee = false;
        this.tiposee = false;
        this.cantidadsee = false;
        this.proxfechasee = false;
        break;
    }


  }

  sendlicencia(event: Event) {
    event.preventDefault();
    const value = this.form.value;

    this.newlicencia = {
      Categoria: value.Categoria,
      Institucion: value.Institucion,
      Detalles: value.Detalles,
      FechaAdquirida: value.Fecha,
      Tipo: value.Tipo,
      Cantidad: value.Cantidad,
      ProximaFecha: value.Vencimiento,
    };

    this.licenciaService.updateLicencia(this.id ,this.newlicencia)
      .subscribe({
        next: (v) => {
          Swal.fire(
            value.Categoria + ' actualizada con éxito',
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

  savedate(fecha: any) {
    this.Fecha = fecha;

      this.UpdateFecha();
  }

  savetipe(tipe: any) {
    this.typeFecha = tipe;

      this.UpdateFecha();

  }

  UpdateVencimiento(cantidad: any) {
    this.cantidadfecha = parseInt(cantidad);

    if (this.Fecha != "" && this.typeFecha != "") {
      this.UpdateFecha();
    }
  }

  deleteLicencia(id: any){
    Swal.fire({
      title: '¿Seguro que desea eliminar a este evento?',
      text: "",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#AEB6BF',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.licenciaService.deleteLicencia(id)
          .subscribe({
            next: (v) => {
              Swal.fire(
                'Eliminado',
                'El Evento ha sido eliminado del registro',
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

  UpdateFecha() {
    console.log(this.Fecha);
    console.log(this.typeFecha);
    console.log(this.cantidadfecha);

    this.proxfechasee = false;
    let Years = this.Fecha.substring(0, 4)
    let Months = this.Fecha.substring(5, 7)
    let Days = this.Fecha.substring(8, 11)

    var Yint = parseInt(Years);
    var Mint = parseInt(Months);
    var Dint = parseInt(Days);


    if (this.typeFecha == '0') {
      Mint = Mint + parseInt(this.cantidadfecha);
      if (Mint > 12) {
        Yint += 1;
        Mint -= 12;
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






      this.form.controls['Vencimiento'].setValue(hall);
    } else if (this.typeFecha == '1') {
      Yint = Yint + parseInt(this.cantidadfecha);

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


      this.form.controls['Vencimiento'].setValue(hall);
    } else {
      this.form.controls['Vencimiento'].setValue("");
    }


    this.proxfechasee = false;
    this.proxfechasee = true;
  }


}

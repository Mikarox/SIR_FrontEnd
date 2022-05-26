import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { User } from 'src/app/models/User';
import { UserService } from 'src/app/services/user_service/user.service';
import { debounceTime } from 'rxjs/operators';
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form!: FormGroup; //Formulario reactivo
  newUser!: User;
  msjErr="";
  match: boolean = false; //Para encontrar coincidencias en las
  check: boolean = false; //Para encontrar coincidencias en las
  existeEmail: boolean = false;

  constructor(private formBuilder: FormBuilder, private userService: UserService, private titleService:Title) {
    this.titleService.setTitle("SIR - NEW ACCOUNT");
    this.buildForm();
  }

  ngOnInit(): void {
  }

  private buildForm(){
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email, Validators.pattern("^\\S*$")]],
      nick: ['', [Validators.required, Validators.pattern("^\\S*$")]],
      password: ['', [Validators.required, Validators.pattern("^\\S*$")]],
      pass_conf: ['', [Validators.required]],
      nombres: ['', [Validators.required, Validators.pattern("^\\S*$")]],
      admin: [false],
      A_paterno: ['', [Validators.required, Validators.pattern("^\\S*$")]],
      A_materno: ['', [Validators.required, Validators.pattern("^\\S*$")]],
      birthday: ['', [Validators.required]],
    });
    //Evaluacion reactiva, de email no exista coincidencia y los pasw
    //Evaluación reactiva
    this.form.valueChanges
    .pipe(
      debounceTime(500)
    )
    .subscribe(value => {
      //Busca coincidencias en las contraseñas
      if(value.password !='' && value.pass_conf !=''){
        if((value.password != value.pass_conf)){
          this.match=true;
        }else{
          this.match=false;
        }
      }
      else{
        this.match=false;
      }
      //Verificar si existen coincidencias en la base de datos

      if(value.admin){
        this.check=true;
      }else{
        this.check=false;
      }
      //modo administrador

      if(value.email){
        this.userService.verifyEmail(value.email)
        .subscribe({
          next: (v) =>  {
                if(JSON.parse(JSON.stringify(v)).message =='Existe'){
                  this.existeEmail=true;
                }else if(JSON.parse(JSON.stringify(v)).message=='No existe'){
                  this.existeEmail=false;
                }
            },
          error: (e) => {},
          complete: () => console.info('complete')
        })
      }
    })

  }

  senduser(event: Event) {
    event.preventDefault();
    const value = this.form.value;
    this.newUser = {
      email: value.email,
      nick: value.nick,
      password: value.password,
      birthday: value.birthday,
      admin: value.admin,
      nombres: value.nombres,
      A_paterno: value.A_paterno,
      A_materno: value.A_materno,
    };

    console.log(this.newUser);

    this.userService.saveUser(this.newUser)
      .subscribe({
        next: (v) => {
          Swal.fire(
            'Cuenta creada con éxito',
            'gracias y bienvenido a SIRAGS',
            'success'
          ).then((result) => {
            this.newUser = v;
            //localStorage.setItem('sesion', JSON.stringify(this.newUser));
            location.replace('../SirHomeAdmin/register');
          })
        },
        error: (e) => {console.error(e)},
        complete: () => console.info('complete')
      })
  }

}

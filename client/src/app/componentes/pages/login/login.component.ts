import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from 'src/app/models/User';
import { UserService } from 'src/app/services/user_service/user.service';
import { debounceTime } from 'rxjs';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  form!: FormGroup; //Formulario reactivo
  login!: User;
  msjErr="";
  existe = false;

  constructor(private router: ActivatedRoute, private formBuilder: FormBuilder, private userService: UserService) {
    //Validar la localStorage por si ya hay una sesión iniciada
    if (localStorage.getItem('sesion')) {
      //hace falta meter comprobacion de admin

      var type = localStorage.getItem('type');
      console.log(type);
      if(type == '1')
        location.replace('SirHomeAdmin')
      else
        location.replace('SirHome');


    } else {
      console.log('no hay sesion activa');
    }
    this.buildForm();
  }

  ngOnInit(): void {
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern("^\\S*$")]],
      password: ['', [Validators.required, Validators.pattern("^\\S*$")]],
    });
    //Evaluación reactiva
    this.form.valueChanges
    .pipe(
      debounceTime(500)
    )
    .subscribe(value => {

      if(value.email){
        this.userService.verifyEmail(value.email)
        .subscribe({
          next: (v) =>  {
                if(JSON.parse(JSON.stringify(v)).message =='Existe'){
                  this.existe=true;
                }else if(JSON.parse(JSON.stringify(v)).message=='No existe'){
                  this.existe=false;
                }
            },
          error: (e) => {},
          complete: () => console.info('complete')
        })
      }
    })
  }

  sendlogin(event: Event) {
    event.preventDefault();
    const value = this.form.value;
    this.login = {
      email: value.email,
      password: value.password,
    };

    this.userService.login(this.login)
      .subscribe({
        next: (v) => {
            this.login = v;
            localStorage.setItem('sesion', JSON.stringify(this.login));
            localStorage.setItem('type', JSON.stringify(this.login.admin));

            location.replace('/SIR/welcome');
          },
        error: (e) => {
            this.msjErr="El email o la contraseña ingresados son erróneos. Por favor, inténtelo de nuevo.";
            console.error(e)},
        complete: () => console.info('complete')
      })
  }

}


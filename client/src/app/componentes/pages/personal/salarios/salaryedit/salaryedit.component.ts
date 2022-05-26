import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Salary } from 'src/app/models/Salary';
import { MiscellaneousService } from 'src/app/services/miscellaneous_service/miscellaneous.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-salaryedit',
  templateUrl: './salaryedit.component.html',
  styleUrls: ['./salaryedit.component.css']
})
export class SalaryeditComponent implements OnInit {
  s: any = [];
  isa: any;
  form!: FormGroup; //Formulario reactivo
  updateSalary!: Salary;


  constructor(private formBuilder: FormBuilder, private router: Router, private route: ActivatedRoute, private Miscellaneous: MiscellaneousService, private titleService: Title) {
    this.buildForm();
  }

  ngOnInit(): void {
    this.isa = this.route.snapshot.paramMap.get('id');
    this.Miscellaneous.getSalary(this.isa)
      .subscribe({
        next: (v) => {
          this.s = v;
          this.titleService.setTitle("SIR - Salario - " + this.s.Nombres);
          this.form.controls['Salario'].setValue(this.s.Salario);


        },
        error: (e) => { console.log(e) },
        complete: () => console.info('complete')
      });
  }



  private buildForm() {
    this.form = this.formBuilder.group({

      Salario: ['', [Validators.min(0), Validators.required]],
    });


  }


  editSalary(event: Event) {
    event.preventDefault();
    Swal.fire({
      title: '¿Seguro que desea actualizar el Salario?',
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



        this.updateSalary = {
          salario: value.Salario,
        };

        console.log(this.updateSalary);
        this.Miscellaneous.saveSalary(this.isa, this.updateSalary)
          .subscribe({
            next: (v) => {
              console.log(v)
              Swal.fire(
                'Los nuevos cambios se han efectuado',
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

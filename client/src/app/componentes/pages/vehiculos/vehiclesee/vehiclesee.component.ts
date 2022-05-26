import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { VehiculosService } from 'src/app/services/vehiculo_service/vehiculos.service';

@Component({
  selector: 'app-vehiclesee',
  templateUrl: './vehiclesee.component.html',
  styleUrls: ['./vehiclesee.component.css']
})
export class VehicleseeComponent implements OnInit {
  vehiculo:any = [];
  idVehicle: any;

  constructor(private router: Router, private  route: ActivatedRoute, private vehicleService: VehiculosService) { }

  ngOnInit(): void {
    this.idVehicle = this.route.snapshot.paramMap.get('id');
    this.vehicleService.getVehiculo(this.idVehicle)
    .subscribe({
        next: (v) =>  {
          this.vehiculo=v;
          this.vehiculo = this.vehiculo[0];
          console.log(v);
        },
        error: (e) => {console.log(e)},
        complete: () => console.info('complete')
      });

    }
}

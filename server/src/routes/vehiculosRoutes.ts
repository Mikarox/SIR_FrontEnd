import { Router } from 'express';
import { vehiculoController } from '../controllers/vehiculosController';

//Ruta para trabajar con la tabla providers de la base de datos
class VehiculoRoutes{
  public router:Router = Router();

  constructor(){
    this.config();
  }
  config(): void{//Se definen las peticiones
    this.router.get('/list', vehiculoController.list); //listar todos los vehiculo
    this.router.get('/one/:id', vehiculoController.getOne); //mostrar un vehiculo por su id
    this.router.post('/',vehiculoController.register); //registrar un vehiculo
    this.router.put('/:id', vehiculoController.update); //actualizar vehiculo por su id
    this.router.delete('/:id', vehiculoController.delete); //eliminar vehiculo por su id
    this.router.post('/verify-isExistVehiculo/', vehiculoController.isExistVehiculo); //Validar las placas del vehiculo
    this.router.post('/verify-isUpdateVehiculo/', vehiculoController.isUpdateVehiculo); //Validar el nombre de personal al cambiar
  }
}

const vehiculoRoutes = new VehiculoRoutes;
export default vehiculoRoutes.router;

import { Router } from 'express';
import { licenciasController } from '../controllers/licenciasController';

//Ruta para trabajar con la tabla usrs de la base de datos
class LicencesRoutes{
  public router:Router = Router();

  constructor(){
    this.config();
  }
  config(): void{//Se definen las peticiones
    this.router.get('/list', licenciasController.list); //listar todos los licenciass
    this.router.get('/listS', licenciasController.listS); //listar todos los licenciass
    this.router.get('/listG', licenciasController.listG); //listar todos los licenciass
    this.router.get('/listL', licenciasController.listL); //listar todos los licenciass
    this.router.get('/listF', licenciasController.listF); //listar todos los licenciass
    this.router.get('/:id', licenciasController.getOne); //mostrar un licencias por su id
    this.router.post('/',licenciasController.register); //registrar un licencias
    this.router.put('/:id', licenciasController.update); //actualizar un licencias por su id
    this.router.delete('/:id', licenciasController.delete); //eliminar un licencias por su id
  }
}

const licenciasRoutes = new LicencesRoutes;
export default licenciasRoutes.router;

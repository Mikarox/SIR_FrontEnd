import { Router } from 'express';
import { personalController } from '../controllers/personalController';

//Ruta para trabajar con la tabla providers de la base de datos
class PersonalRoutes{
  public router:Router = Router();

  constructor(){
    this.config();
  }
  config(): void{//Se definen las peticiones
    this.router.get('/list', personalController.list); //listar todo el persanol
    this.router.get('/one/:id', personalController.getOne); //mostrar un personal por su id
    this.router.post('/',personalController.register); //registrar un personal
    this.router.put('/:id', personalController.update); //actualizar personal por su id
    this.router.delete('/:id', personalController.delete); //eliminar personal por su id
    this.router.post('/verify-isExistPersonal/', personalController.isExistPersonal); //Validar el nombre de persoanl
    this.router.post('/verify-isUpdatePersonal/', personalController.isUpdatePersonal); //Validar el nombre de personal al cambiar

  }
}

const providersRoutes = new PersonalRoutes;
export default providersRoutes.router;

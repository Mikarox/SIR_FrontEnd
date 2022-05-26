import { Router } from 'express';
import { miscellaneousController } from '../controllers/miscellaneousController';

//Ruta para trabajar con la tabla providers de la base de datos
class MiscellaneusRoutes{
  public router:Router = Router();

  constructor(){
    this.config();
  }
  config(): void{//Se definen las peticiones
    this.router.get('/birthday', miscellaneousController.birthday); //listar todo el persanol
    this.router.get('/eventlist', miscellaneousController.event); //mostrar un personal por su id
    this.router.get('/renew', miscellaneousController.renew);
    //equipamientos
    this.router.get('/equipments', miscellaneousController.equipamientos); //mostrar equipamientos
    this.router.get('/equipments/:id', miscellaneousController.getEquipament); //mostrar equipamientos
    this.router.delete('/equipments/:id', miscellaneousController.deleteEquipament);
    this.router.get('/equipments/renew/:id', miscellaneousController.renewEquipament);
    this.router.put('/equipments/:id', miscellaneousController.updateEquipament); //actualizar personal por su id
    //Contratos
    this.router.delete('/contrats/:id', miscellaneousController.deleteContrat); //eliminar contrato
    this.router.get('/contrats/:id', miscellaneousController.getContrat); // Mostrar contrato solo
    this.router.get('/contrats', miscellaneousController.getContratos); //mostrar equipamientos
    this.router.put('/contrats/:id', miscellaneousController.updateContrat); //actualizar personal por su id
    //salarios
    this.router.delete('/salarys/:id', miscellaneousController.deleteSalary); //eliminar salarys
    this.router.get('/salarys/:id', miscellaneousController.getSalary); // Mostrar salarys solo
    this.router.get('/salarys', miscellaneousController.getSalarys); //mostrar salarys
    this.router.put('/salarys/:id', miscellaneousController.updateSalary); //actualizar salarys por su id
    //tenencia  Tenencias
    this.router.delete('/Tenencias/:id', miscellaneousController.deleteTenencia); //eliminar Tenencia
    this.router.get('/Tenencias/:id', miscellaneousController.getTenencia); // Mostrar Tenencia solo
    this.router.get('/Tenencias/renew/:id', miscellaneousController.renewTenencia); // Renovar Tenencia 1 anio
    this.router.get('/Tenencias', miscellaneousController.getTenencias); //mostrar Todas las Tenencias
    this.router.put('/Tenencias/:id', miscellaneousController.updateTenencia); //actualizar Tenencia por su id
    //verificacion Verificacion
    this.router.delete('/Verificacion/:id', miscellaneousController.deleteVerificacion); //eliminar Verificacion
    this.router.get('/Verificacion/:id', miscellaneousController.getVerificacion); // Mostrar Verificacion solo
    this.router.get('/Verificacion', miscellaneousController.getVerificaciones); //mostrar todas las verificaciones
    this.router.put('/Verificacion/:id', miscellaneousController.updateVerificacion); //actualizar verificacion por su id
    this.router.get('/Verificacion/renew/:id', miscellaneousController.renewVerificacion); // Renovar Tenencia 1 anio
    //seguros Seguro
    this.router.delete('/Seguro/:id', miscellaneousController.deleteSeguro); //eliminar Seguros
    this.router.get('/Seguro/:id', miscellaneousController.getSeguro); // Mostrar Seguros solo
    this.router.get('/Seguro', miscellaneousController.getSeguros); //mostrar todos los Seguros
    this.router.put('/Seguro/:id', miscellaneousController.updateSeguro); //actualizar Seguros por su id
    this.router.get('/Seguro/renew/:id', miscellaneousController.renewSeguro); // Renovar Tenencia 1 anio
  }
}

const miscellaneusRoutes = new MiscellaneusRoutes;
export default miscellaneusRoutes.router;

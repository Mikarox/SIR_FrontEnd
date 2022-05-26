"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const miscellaneousController_1 = require("../controllers/miscellaneousController");
//Ruta para trabajar con la tabla providers de la base de datos
class MiscellaneusRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/birthday', miscellaneousController_1.miscellaneousController.birthday); //listar todo el persanol
        this.router.get('/eventlist', miscellaneousController_1.miscellaneousController.event); //mostrar un personal por su id
        this.router.get('/renew', miscellaneousController_1.miscellaneousController.renew);
        //equipamientos
        this.router.get('/equipments', miscellaneousController_1.miscellaneousController.equipamientos); //mostrar equipamientos
        this.router.get('/equipments/:id', miscellaneousController_1.miscellaneousController.getEquipament); //mostrar equipamientos
        this.router.delete('/equipments/:id', miscellaneousController_1.miscellaneousController.deleteEquipament);
        this.router.get('/equipments/renew/:id', miscellaneousController_1.miscellaneousController.renewEquipament);
        this.router.put('/equipments/:id', miscellaneousController_1.miscellaneousController.updateEquipament); //actualizar personal por su id
        //Contratos
        this.router.delete('/contrats/:id', miscellaneousController_1.miscellaneousController.deleteContrat); //eliminar contrato
        this.router.get('/contrats/:id', miscellaneousController_1.miscellaneousController.getContrat); // Mostrar contrato solo
        this.router.get('/contrats', miscellaneousController_1.miscellaneousController.getContratos); //mostrar equipamientos
        this.router.put('/contrats/:id', miscellaneousController_1.miscellaneousController.updateContrat); //actualizar personal por su id
        //salarios
        this.router.delete('/salarys/:id', miscellaneousController_1.miscellaneousController.deleteSalary); //eliminar salarys
        this.router.get('/salarys/:id', miscellaneousController_1.miscellaneousController.getSalary); // Mostrar salarys solo
        this.router.get('/salarys', miscellaneousController_1.miscellaneousController.getSalarys); //mostrar salarys
        this.router.put('/salarys/:id', miscellaneousController_1.miscellaneousController.updateSalary); //actualizar salarys por su id
        //tenencia  Tenencias
        this.router.delete('/Tenencias/:id', miscellaneousController_1.miscellaneousController.deleteTenencia); //eliminar Tenencia
        this.router.get('/Tenencias/:id', miscellaneousController_1.miscellaneousController.getTenencia); // Mostrar Tenencia solo
        this.router.get('/Tenencias/renew/:id', miscellaneousController_1.miscellaneousController.renewTenencia); // Renovar Tenencia 1 anio
        this.router.get('/Tenencias', miscellaneousController_1.miscellaneousController.getTenencias); //mostrar Todas las Tenencias
        this.router.put('/Tenencias/:id', miscellaneousController_1.miscellaneousController.updateTenencia); //actualizar Tenencia por su id
        //verificacion Verificacion
        this.router.delete('/Verificacion/:id', miscellaneousController_1.miscellaneousController.deleteVerificacion); //eliminar Verificacion
        this.router.get('/Verificacion/:id', miscellaneousController_1.miscellaneousController.getVerificacion); // Mostrar Verificacion solo
        this.router.get('/Verificacion', miscellaneousController_1.miscellaneousController.getVerificaciones); //mostrar todas las verificaciones
        this.router.put('/Verificacion/:id', miscellaneousController_1.miscellaneousController.updateVerificacion); //actualizar verificacion por su id
        this.router.get('/Verificacion/renew/:id', miscellaneousController_1.miscellaneousController.renewVerificacion); // Renovar Tenencia 1 anio
        //seguros Seguro
        this.router.delete('/Seguro/:id', miscellaneousController_1.miscellaneousController.deleteSeguro); //eliminar Seguros
        this.router.get('/Seguro/:id', miscellaneousController_1.miscellaneousController.getSeguro); // Mostrar Seguros solo
        this.router.get('/Seguro', miscellaneousController_1.miscellaneousController.getSeguros); //mostrar todos los Seguros
        this.router.put('/Seguro/:id', miscellaneousController_1.miscellaneousController.updateSeguro); //actualizar Seguros por su id
        this.router.get('/Seguro/renew/:id', miscellaneousController_1.miscellaneousController.renewSeguro); // Renovar Tenencia 1 anio
    }
}
const miscellaneusRoutes = new MiscellaneusRoutes;
exports.default = miscellaneusRoutes.router;

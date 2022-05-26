"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const licenciasController_1 = require("../controllers/licenciasController");
//Ruta para trabajar con la tabla usrs de la base de datos
class LicencesRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/list', licenciasController_1.licenciasController.list); //listar todos los licenciass
        this.router.get('/listS', licenciasController_1.licenciasController.listS); //listar todos los licenciass
        this.router.get('/listG', licenciasController_1.licenciasController.listG); //listar todos los licenciass
        this.router.get('/listL', licenciasController_1.licenciasController.listL); //listar todos los licenciass
        this.router.get('/listF', licenciasController_1.licenciasController.listF); //listar todos los licenciass
        this.router.get('/:id', licenciasController_1.licenciasController.getOne); //mostrar un licencias por su id
        this.router.post('/', licenciasController_1.licenciasController.register); //registrar un licencias
        this.router.put('/:id', licenciasController_1.licenciasController.update); //actualizar un licencias por su id
        this.router.delete('/:id', licenciasController_1.licenciasController.delete); //eliminar un licencias por su id
    }
}
const licenciasRoutes = new LicencesRoutes;
exports.default = licenciasRoutes.router;

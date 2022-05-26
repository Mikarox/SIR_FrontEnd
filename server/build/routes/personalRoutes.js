"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const personalController_1 = require("../controllers/personalController");
//Ruta para trabajar con la tabla providers de la base de datos
class PersonalRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/list', personalController_1.personalController.list); //listar todo el persanol
        this.router.get('/one/:id', personalController_1.personalController.getOne); //mostrar un personal por su id
        this.router.post('/', personalController_1.personalController.register); //registrar un personal
        this.router.put('/:id', personalController_1.personalController.update); //actualizar personal por su id
        this.router.delete('/:id', personalController_1.personalController.delete); //eliminar personal por su id
        this.router.post('/verify-isExistPersonal/', personalController_1.personalController.isExistPersonal); //Validar el nombre de persoanl
        this.router.post('/verify-isUpdatePersonal/', personalController_1.personalController.isUpdatePersonal); //Validar el nombre de personal al cambiar
    }
}
const providersRoutes = new PersonalRoutes;
exports.default = providersRoutes.router;

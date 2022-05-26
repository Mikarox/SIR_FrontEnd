"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const providersController_1 = require("../controllers/providersController");
//Ruta para trabajar con la tabla providers de la base de datos
class ProvidersRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/list/:id_user', providersController_1.providersController.list); //listar todos los proveedores
        this.router.get('/one/:id', providersController_1.providersController.getOne); //mostrar un proveedor por su id
        this.router.post('/', providersController_1.providersController.register); //registrar un proveedor
        this.router.put('/:id', providersController_1.providersController.update); //actualizar un proveedor por su id
        this.router.delete('/:id', providersController_1.providersController.delete); //eliminar un proveedor por su id
        this.router.post('/verify-isExistProvider/', providersController_1.providersController.isExistProvider); //Validar el nombre de proveedor
    }
}
const providersRoutes = new ProvidersRoutes;
exports.default = providersRoutes.router;

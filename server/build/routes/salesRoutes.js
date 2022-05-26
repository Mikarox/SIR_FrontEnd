"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const salesController_1 = require("../controllers/salesController");
//Ruta para trabajar con la tabla sales de la base de datos
class SalesRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/list/:id_user', salesController_1.salesController.list); //listar todas las ventas
        this.router.get('/listToday/:id_user', salesController_1.salesController.listToday); //listar todas las ventas de hoy
        this.router.get('/one/:id', salesController_1.salesController.getOne); //mostrar una venta por su id
        this.router.get('/customerList/:id_user', salesController_1.salesController.customerList); //mostrar una la lista de clientes 
        this.router.post('/', salesController_1.salesController.register); //registrar una venta
        this.router.put('/:id', salesController_1.salesController.update); //actualizar una venta por su id
        this.router.delete('/:id', salesController_1.salesController.delete); //eliminar una venta por su id
    }
}
const salesRoutes = new SalesRoutes;
exports.default = salesRoutes.router;

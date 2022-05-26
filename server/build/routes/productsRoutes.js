"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const productsController_1 = require("../controllers/productsController");
//Ruta para trabajar con la tabla products de la base de datos
class ProductsRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/list/:id_user', productsController_1.productsController.list); //listar todos los productos
        this.router.get('/listStock/:id_user', productsController_1.productsController.listStock); //listar todos los productos en stock
        this.router.get('/one/:id', productsController_1.productsController.getOne); //mostrar un producto por su id
        this.router.post('/', productsController_1.productsController.register); //registrar un producto
        this.router.put('/:id', productsController_1.productsController.update); //actualizar un producto por su id
        this.router.delete('/:id', productsController_1.productsController.delete); //eliminar un producto por su id
        this.router.post('/get-providersList/:id_user', productsController_1.productsController.providersList); //enviar lista de proveedores
        this.router.post('/get-categoriesList', productsController_1.productsController.categoriesList); //enviar lista de categorías
    }
}
const productsRoutes = new ProductsRoutes;
exports.default = productsRoutes.router;

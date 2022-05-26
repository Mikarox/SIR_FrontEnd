"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const vehiculosController_1 = require("../controllers/vehiculosController");
//Ruta para trabajar con la tabla providers de la base de datos
class VehiculoRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/list', vehiculosController_1.vehiculoController.list); //listar todos los vehiculo
        this.router.get('/one/:id', vehiculosController_1.vehiculoController.getOne); //mostrar un vehiculo por su id
        this.router.post('/', vehiculosController_1.vehiculoController.register); //registrar un vehiculo
        this.router.put('/:id', vehiculosController_1.vehiculoController.update); //actualizar vehiculo por su id
        this.router.delete('/:id', vehiculosController_1.vehiculoController.delete); //eliminar vehiculo por su id
        this.router.post('/verify-isExistVehiculo/', vehiculosController_1.vehiculoController.isExistVehiculo); //Validar las placas del vehiculo
        this.router.post('/verify-isUpdateVehiculo/', vehiculosController_1.vehiculoController.isUpdateVehiculo); //Validar el nombre de personal al cambiar
    }
}
const vehiculoRoutes = new VehiculoRoutes;
exports.default = vehiculoRoutes.router;

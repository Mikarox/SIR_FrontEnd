"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.providersController = void 0;
const database_1 = __importDefault(require("../database"));
//Se definen lo que realizarán las peticiones 
class ProvidersController {
    //Se ejecuta la query para listar todos los proveedores
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id_user } = req.params;
            yield database_1.default.query('SELECT * FROM providers WHERE id_user = ?', [id_user], function (err, result, fields) {
                if (err)
                    throw err;
                if (result.length > 0) {
                    return res.json(result);
                }
                res.status(404).json({ message: 'Este usario no tiene proveedores' });
            });
        });
    }
    //Se ejecuta la query para mostrar un proveedor por su id
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query(`
                      SELECT p.id, p.name, p.description, p.registered_at, l.country, l.state, l.city, l.postal, l.address, GROUP_CONCAT(c.type) AS type, GROUP_CONCAT(c.contact) AS contact 
                      FROM providers p 
                      INNER JOIN locations l 
                      ON p.id=l.id_provider 
                      INNER JOIN contacts c 
                      ON p.id=c.id_provider
                      WHERE p.id = ?`, [id], function (err, result, fields) {
                if (err)
                    throw err;
                if (result.length > 0) {
                    return res.json(result[0]);
                }
                res.status(404).json({ message: 'Proveedor no encontrado' });
            });
        });
    }
    //Se ejecuta la query para registrar un proveedore
    register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var idP;
            //Se realiza la consulta de registro en la tabla providers 
            yield database_1.default.query('INSERT INTO providers(id_user,name,description) VALUES ("' + req.body.id_user + '","' + req.body.name + '", "' + req.body.description + '");', function (err, result, fields) {
                return __awaiter(this, void 0, void 0, function* () {
                    if (err)
                        throw err;
                    if (result.affectedRows == 1) {
                        yield database_1.default.query('SELECT id FROM providers WHERE name = "' + req.body.name + '" AND id_user = "' + req.body.id_user + '" ;', function (err, result, fields) {
                            return __awaiter(this, void 0, void 0, function* () {
                                if (err)
                                    throw err;
                                idP = Object.values(JSON.parse(JSON.stringify(result)));
                                //Se realiza la consulta de registro en la tabla locations
                                yield database_1.default.query('INSERT INTO locations(id_provider,country,state,city,postal,address) VALUES (' + idP[0].id + ', "' + req.body.country + '", "' + req.body.state + '", "' + req.body.city + '", "' + req.body.postal + '", "' + req.body.address + '");', function (err, result, fields) {
                                    return __awaiter(this, void 0, void 0, function* () {
                                        if (err)
                                            throw err;
                                        if (result.affectedRows == 1) {
                                            //Consulta para insertar los contactos en la tabla de contacts
                                            for (var i = 0; i < req.body.type.length; i++) {
                                                yield database_1.default.query('INSERT INTO contacts(id_provider, type, contact) VALUES (' + idP[0].id + ',"' + req.body.type[i] + '","' + req.body.contact[i] + '");', function (err, result, fields) {
                                                    return __awaiter(this, void 0, void 0, function* () {
                                                        if (err)
                                                            throw err;
                                                    });
                                                });
                                            }
                                        }
                                    });
                                });
                            });
                        });
                    }
                });
            });
            res.json({ message: 'Proveedor registrado' });
        });
    }
    //Se ejecuta la query para actualizar un proveedor por su id
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query('SELECT * FROM providers WHERE id = ?', [id], function (err, result, fields) {
                return __awaiter(this, void 0, void 0, function* () {
                    if (err)
                        throw err;
                    if (result[0]) { //Si existe el proveedor
                        //Se ejecuta la query para actualizar al proveedor
                        yield database_1.default.query('UPDATE providers SET name="' + req.body.name + '", description="' + req.body.description + '" WHERE id = ?', [id], function (err, result, fields) {
                            return __awaiter(this, void 0, void 0, function* () {
                                if (err)
                                    throw err;
                                if (result.affectedRows == 1) {
                                    //Se realiza la consulta de actualización en la tabla locations
                                    yield database_1.default.query('UPDATE locations SET country= "' + req.body.country + '", state="' + req.body.state + '", city="' + req.body.city + '", postal=  "' + req.body.postal + '", address="' + req.body.address + '" WHERE id_provider = ?', [id], function (err, result, fields) {
                                        return __awaiter(this, void 0, void 0, function* () {
                                            if (err)
                                                throw err;
                                            if (result.affectedRows == 1) {
                                                //Se elimina los registros de la tabla contacts para volver a insertarlos con la nueva información 
                                                yield database_1.default.query('DELETE FROM contacts WHERE id_provider = ?', [id], function (err, result, fields) {
                                                    return __awaiter(this, void 0, void 0, function* () {
                                                        //Consulta para insertar los contactos en la tabla de contacts
                                                        for (var i = 0; i < req.body.type.length; i++) {
                                                            yield database_1.default.query('INSERT INTO contacts(id_provider, type, contact) VALUES ("' + id + '","' + req.body.type[i] + '","' + req.body.contact[i] + '");', function (err, result, fields) {
                                                                return __awaiter(this, void 0, void 0, function* () {
                                                                    if (err)
                                                                        throw err;
                                                                });
                                                            });
                                                        }
                                                    });
                                                });
                                            }
                                        });
                                    });
                                    res.json({ message: 'El proveedor fue actualizado' });
                                }
                                else {
                                    res.status(404).json({ message: 'Proveedor no actualizado' });
                                }
                            });
                        });
                    }
                    else {
                        res.status(404).json({ message: 'Proveedor no encontrado' });
                    }
                });
            });
        });
    }
    //Se ejecuta la query para eliminar un proveedor por su id
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            //Consulta para eleiminar al usuairo 
            yield database_1.default.query('DELETE FROM providers WHERE id = ?', [id], function (err, result, fields) {
                if (err)
                    throw err;
                if (result.affectedRows == 1) {
                    res.json({ message: 'El proveedor fue eliminado' });
                }
                else {
                    res.status(404).json({ message: 'Proveedor no encontrado' });
                }
            });
        });
    }
    //Se ejecuta la query que verifica si ya existe el proveedores
    isExistProvider(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query('SELECT * FROM providers WHERE name = "' + req.body.name + '" AND id_user = "' + req.body.id_user + '";', function (err, result, fields) {
                if (err)
                    throw err;
                if (result.length > 0) {
                    return res.json({ message: 'Existe' });
                }
                return res.json({ message: 'No existe' });
            });
        });
    }
}
exports.providersController = new ProvidersController();

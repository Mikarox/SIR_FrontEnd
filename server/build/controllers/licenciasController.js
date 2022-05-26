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
exports.licenciasController = void 0;
const database_1 = __importDefault(require("../database"));
//Se definen lo que realizarán las peticiones
class LicencesController {
    //Se ejecuta la query para listar todos los usuarios
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query('SELECT l.ID_Licencia, l.categoria, l.Institucion, l.detalles, l.FechaAdquirida, l.tipo, l.cantidad, F.Fecha, F.Asunto  FROM licencias as l RIGHT JOIN fecha AS F ON l.FK_Fecha_ProxPago=F.ID_Fecha WHERE FK_Fecha_ProxPago is not null and ID_Licencia=?', [id], function (err, result, fields) {
                if (err)
                    throw err;
                if (result.length > 0) {
                    return res.json(result);
                }
                res.status(404).json({ message: 'No existe licencias registrada' });
            });
        });
    }
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query('SELECT l.ID_Licencia AS ID, l.categoria, l.Institucion, l.detalles, l.FechaAdquirida, l.tipo, l.cantidad, F.Fecha, F.Asunto FROM licencias AS l RIGHT JOIN fecha AS F ON l.FK_Fecha_ProxPago=F.ID_Fecha WHERE FK_Fecha_ProxPago is not null;', function (err, result, fields) {
                if (err)
                    throw err;
                if (result.length > 0) {
                    return res.json(result);
                }
                res.status(404).json({ message: 'No existe licencias registrada' });
            });
        });
    }
    listG(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query('SELECT l.ID_Licencia AS ID, l.categoria, l.Institucion, l.detalles, l.FechaAdquirida, l.tipo, l.cantidad, F.Fecha, F.Asunto FROM licencias AS l RIGHT JOIN fecha AS F ON l.FK_Fecha_ProxPago=F.ID_Fecha WHERE FK_Fecha_ProxPago is not null AND l.categoria="Garantias";', function (err, result, fields) {
                if (err)
                    throw err;
                if (result.length > 0) {
                    return res.json(result);
                }
                res.status(404).json({ message: 'No existe licencias registrada' });
            });
        });
    }
    listS(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query('SELECT l.ID_Licencia AS ID, l.categoria, l.Institucion, l.detalles, l.FechaAdquirida, l.tipo, l.cantidad, F.Fecha, F.Asunto FROM licencias AS l RIGHT JOIN fecha AS F ON l.FK_Fecha_ProxPago=F.ID_Fecha WHERE FK_Fecha_ProxPago is not null AND l.categoria="Servicios";', function (err, result, fields) {
                if (err)
                    throw err;
                if (result.length > 0) {
                    return res.json(result);
                }
                res.status(404).json({ message: 'No existe licencias registrada' });
            });
        });
    }
    listL(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query('SELECT l.ID_Licencia AS ID, l.categoria, l.Institucion, l.detalles, l.FechaAdquirida, l.tipo, l.cantidad, F.Fecha, F.Asunto FROM licencias AS l RIGHT JOIN fecha AS F ON l.FK_Fecha_ProxPago=F.ID_Fecha WHERE FK_Fecha_ProxPago is not null AND l.categoria="Licencias";', function (err, result, fields) {
                if (err)
                    throw err;
                if (result.length > 0) {
                    return res.json(result);
                }
                res.status(404).json({ message: 'No existe licencias registrada' });
            });
        });
    }
    // Fecha
    listF(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query('SELECT l.ID_Licencia AS ID, l.categoria, l.Institucion, l.detalles, l.FechaAdquirida, l.tipo, l.cantidad, F.Fecha, F.Asunto FROM licencias AS l RIGHT JOIN fecha AS F ON l.FK_Fecha_ProxPago=F.ID_Fecha WHERE FK_Fecha_ProxPago is not null AND l.categoria="Fecha";', function (err, result, fields) {
                if (err)
                    throw err;
                if (result.length > 0) {
                    return res.json(result);
                }
                res.status(404).json({ message: 'No existe licencias registrada' });
            });
        });
    }
    register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let Cat = req.body.Categoria;
            let Inst = req.body.Institucion;
            let Deta = req.body.Detalles;
            let FechaI = req.body.FechaAdquirida;
            let Tipo = req.body.Tipo;
            let Can = req.body.Cantidad;
            let Prox = req.body.ProximaFecha;
            switch (Cat) {
                case '0':
                    Cat = "Garantias";
                    break;
                case '1':
                    Cat = "Servicios";
                    break;
                case '2':
                    Cat = "Licencias";
                    Tipo = 0;
                    Can = 0;
                    FechaI = Prox;
                    break;
                case '3':
                    Cat = "Fecha";
                    Tipo = 0;
                    Can = 0;
                    FechaI = Prox;
                    break;
            }
            yield database_1.default.query('INSERT INTO licencias (ID_Licencia, categoria, Institucion, detalles, FechaAdquirida, tipo, cantidad, FK_Fecha_ProxPago) VALUES (NULL, ?, ?,?,?,?, ?, NULL);', [Cat, Inst, Deta, FechaI, Tipo, Can], function (err, result, fuelds) {
                return __awaiter(this, void 0, void 0, function* () {
                    if (err)
                        throw err;
                    var idlic = result.insertId;
                    yield database_1.default.query('INSERT INTO `fecha` (`ID_Fecha`, `Fecha`, `Asunto`, `FK_Ingreso`, `FK_Vacaciones`, `FK_Contrato`, `FK_Equipo`, `FK_Licencia`, `FK_Seguro`, `FK_Tenencia`, `Fk_Verificacion`)  VALUES (NULL, ?, ?, NULL, NULL, NULL, NULL, ?, NULL, NULL, NULL);', [Prox, Cat, idlic], function (err, res, fiellds) {
                        return __awaiter(this, void 0, void 0, function* () {
                            if (err)
                                throw err;
                            var idfecha = res.insertId;
                            yield database_1.default.query('UPDATE licencias SET FK_Fecha_ProxPago = ? WHERE ID_Licencia=?', [idfecha, idlic], function (err, res, fiellds) {
                                return __awaiter(this, void 0, void 0, function* () {
                                    if (err)
                                        throw err;
                                });
                            });
                        });
                    });
                });
            });
            res.json({ message: 'Licencia registrado' });
        });
    }
    // await pool.query('', [], async function(err,res,fiellds) {
    //   if (err) throw err;
    // });
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            console.log(req.body);
            let Cat = req.body.Categoria;
            let Inst = req.body.Institucion;
            let Deta = req.body.Detalles;
            let FechaI = req.body.FechaAdquirida;
            let Tipo = req.body.Tipo;
            let Can = req.body.Cantidad;
            let Prox = req.body.ProximaFecha;
            switch (Cat) {
                case "Licencias":
                    Tipo = 0;
                    Can = 0;
                    FechaI = Prox;
                    break;
                case "Fecha":
                    Tipo = 0;
                    Can = 0;
                    FechaI = Prox;
                    break;
            }
            yield database_1.default.query('UPDATE `licencias` SET `categoria` = ?, `Institucion` = ?, `detalles` = ?, `FechaAdquirida` = ?, `tipo` = ?, `cantidad` = ? WHERE `licencias`.`ID_Licencia` = ?;', [Cat, Inst, Deta, FechaI, Tipo, Can, id], function (err, res, fiellds) {
                return __awaiter(this, void 0, void 0, function* () {
                    if (err)
                        throw err;
                    database_1.default.query('UPDATE fecha SET Fecha = ? WHERE FK_Licencia   = ?;', [Prox, id], function (err, result, fields) {
                        return __awaiter(this, void 0, void 0, function* () {
                            if (err)
                                throw err;
                            console.log("Update completo");
                        });
                    });
                });
            });
            res.json({ message: 'Licencia actualizada' });
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query('DELETE FROM licencias WHERE ID_Equipo=?', [id], function (err, result, fields) {
                if (err)
                    throw err;
                if (result.affectedRows == 1) {
                    res.json({ message: 'la licencia fue eliminado' });
                }
                else {
                    res.status(404).json({ message: 'licencia no encontrado' });
                }
            });
        });
    }
}
exports.licenciasController = new LicencesController();

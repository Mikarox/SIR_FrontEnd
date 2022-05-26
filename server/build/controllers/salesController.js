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
exports.salesController = void 0;
const database_1 = __importDefault(require("../database"));
//Se definen lo que realizarán las peticiones 
class SalesController {
    //Se ejecuta la query para listar todas las ventas
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id_user } = req.params;
            yield database_1.default.query(`SELECT i.customer, i.amount, i.quantity, i.price, i.sale_date, p.name AS nameProduct FROM info_sales i 
                      INNER JOIN products p ON i.id_product = p.id 
                      WHERE i.id_user = ? ORDER BY i.sale_date DESC`, [id_user], function (err, result, fields) {
                if (err)
                    throw err;
                if (result.length > 0) {
                    return res.json(result);
                }
                res.status(404).json({ message: 'Venta no encontrado' });
            });
        });
    }
    //Se ejecuta la query para listar todas las ventas de hoy
    listToday(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id_user } = req.params;
            yield database_1.default.query(`SELECT i.id_sales, i.id_product, i.id_provider, i.customer, i.amount, i.quantity, i.price, i.sale_date, p.name AS nameProduct FROM info_sales i 
                      INNER JOIN products p ON i.id_product = p.id 
                      WHERE sale_date >= CURDATE() AND sale_date < CURDATE() + INTERVAL 1 DAY AND i.id_user = ?`, [id_user], function (err, result, fields) {
                if (err)
                    throw err;
                if (result.length > 0) {
                    return res.json(result);
                }
                res.status(404).json({ message: 'Venta no encontrado' });
            });
        });
    }
    //Se ejecuta la query para mostrar una venta por su id
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
    //Se ejecuta la query para mostrar la lista de clientes
    customerList(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id_user } = req.params;
            yield database_1.default.query(`SELECT id_sales, customer FROM info_sales WHERE id_user = ? GROUP BY customer`, [id_user], function (err, result, fields) {
                if (err)
                    throw err;
                if (result.length > 0) {
                    return res.json(result);
                }
                res.status(404).json({ message: 'Venta no encontrado' });
            });
        });
    }
    //Se ejecuta la query para registrar una venta
    register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var idS;
            var customer;
            //Se realiza la consulta de registro en la tabla sales 
            yield database_1.default.query('SELECT id_sales, customer FROM info_sales WHERE  customer = "' + req.body.customer + '"  AND id_user = "' + req.body.id_user + '" AND customer != ""', function (err, result, fields) {
                return __awaiter(this, void 0, void 0, function* () {
                    if (err)
                        throw err;
                    if (result.length > 0) {
                        idS = result[0].id_sales;
                        customer = result[0].customer;
                        yield database_1.default.query('INSERT INTO info_sales(id_sales,id_user,id_product,id_provider,customer,amount,quantity,price) VALUES ("' + idS + '","' + req.body.id_user + '","' + req.body.id_product + '","' + req.body.id_provider + '","' + customer + '","' + req.body.amount + '","' + req.body.quantity + '","' + req.body.price + '");', function (err, result, fields) {
                            return __awaiter(this, void 0, void 0, function* () {
                                if (err)
                                    throw err;
                                yield database_1.default.query('UPDATE products set stock = (SELECT(SELECT stock FROM products WHERE id = "' + req.body.id_product + '" ) - ' + req.body.quantity + ') WHERE id = "' + req.body.id_product + '" ', function (err, result, fields) {
                                    return __awaiter(this, void 0, void 0, function* () {
                                        if (err)
                                            throw err;
                                        res.json({ message: 'Venta registrada' });
                                    });
                                });
                            });
                        });
                    }
                    else {
                        yield database_1.default.query('INSERT INTO sales(id_user) VALUES ("' + req.body.id_user + '");', function (err, result, fields) {
                            return __awaiter(this, void 0, void 0, function* () {
                                if (err)
                                    throw err;
                                yield database_1.default.query('SELECT (SELECT id FROM sales ORDER BY id DESC LIMIT 1) AS id;', function (err, result, fields) {
                                    return __awaiter(this, void 0, void 0, function* () {
                                        if (err)
                                            throw err;
                                        idS = Object.values(JSON.parse(JSON.stringify(result)));
                                        console.log(idS);
                                        yield database_1.default.query('INSERT INTO info_sales(id_sales,id_user,id_product,id_provider,customer,amount,quantity,price) VALUES ("' + idS[0].id + '","' + req.body.id_user + '","' + req.body.id_product + '","' + req.body.id_provider + '","' + req.body.customer + '","' + req.body.amount + '","' + req.body.quantity + '","' + req.body.price + '");', function (err, result, fields) {
                                            return __awaiter(this, void 0, void 0, function* () {
                                                if (err)
                                                    throw err;
                                                yield database_1.default.query('UPDATE products set stock = (SELECT(SELECT stock FROM products WHERE id = "' + req.body.id_product + '" ) - ' + req.body.quantity + ') WHERE id = "' + req.body.id_product + '" ', function (err, result, fields) {
                                                    return __awaiter(this, void 0, void 0, function* () {
                                                        if (err)
                                                            throw err;
                                                        res.json({ message: 'Venta registrada' });
                                                    });
                                                });
                                            });
                                        });
                                    });
                                });
                            });
                        });
                    }
                });
            });
        });
    }
    //Se ejecuta la query para actualizar una venta por su id
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
    //Se ejecuta la query para eliminar una venta por su id
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
}
exports.salesController = new SalesController();

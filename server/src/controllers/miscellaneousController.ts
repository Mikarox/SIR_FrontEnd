import { Request, response, Response } from 'express';
import { PoolCluster } from 'promise-mysql';
import pool from '../database';

//Se definen lo que realizarán las peticionesx
class MiscellaneousController {
  //Se ejecuta la query para listar todos los personales
  public async birthday(req: Request, res: Response): Promise<any> {
    await pool.query(`SELECT users.id_user AS 'Id', users.nombres AS 'Nombre', users.A_paterno AS 'ApePat', users.A_materno AS 'ApeMat', birthday.Fecha AS 'Fecha', TIMESTAMPDIFF(DAY,CURDATE(),CONCAT(YEAR(CURDATE()),"-",MONTH(Fecha),"-",DAY(Fecha))) as dif FROM users RIGHT JOIN birthday ON birthday.FK_User = users.id_user WHERE users.id_user is NOT NUll and TIMESTAMPDIFF(DAY,CURDATE(),CONCAT(YEAR(CURDATE()),"-",MONTH(Fecha),"-",DAY(Fecha))) BETWEEN 0 and 15  UNION SELECT personal.ID_Personal AS 'Id', personal.Nombres AS 'Nombre', personal.A_paterno AS 'ApePat', personal.A_materno AS 'ApeMat', birthday.Fecha AS 'Fecha', TIMESTAMPDIFF(DAY,CURDATE(),CONCAT(YEAR(CURDATE()),"-",MONTH(Fecha),"-",DAY(Fecha))) as dif FROM personal RIGHT JOIN birthday ON birthday.FK_Personal = personal.ID_Personal WHERE personal.ID_Personal and TIMESTAMPDIFF(DAY,CURDATE(),CONCAT(YEAR(CURDATE()),"-",MONTH(Fecha),"-",DAY(Fecha))) BETWEEN 0 and 15;`, function (err, result, fields) {
      if (err) throw err;
      if (result.length > 0) {
        return res.json(result);
      }
      res.status(303).json({ message: 'No existen registros' });
    });
  }

  public async event(req: Request, res: Response): Promise<any> {
    //consulta correcta
       await pool.query(`SELECT id_fecha as id, fecha, f.Asunto, TIMESTAMPDIFF(DAY,CURDATE(),fecha) as dif, e.Nombre as EqNom, e.Detalles, e.FechaEntrega as ultimo, p.Nombres, p.A_paterno, p.A_materno  from fecha as f  RIGHT JOIN equipo as e on f.FK_Equipo=e.ID_Equipo RIGHT JOIN personal as p on e.FK_ID_Personal=p.ID_Personal where f.FK_Equipo is not null and TIMESTAMPDIFF(DAY,CURDATE(),fecha) BETWEEN 0 AND 15    UNION SELECT ID_Fecha as id, fecha, f.Asunto, TIMESTAMPDIFF(DAY,CURDATE(),fecha) as dif, c.type, c.cantidad, null, p.Nombres, p.A_paterno, p.A_materno from fecha as f RIGHT JOIN contrato as c on f.FK_Contrato=c.ID_Contrato RIGHT JOIN personal AS p ON c.FK_ID_Personal=p.ID_Personal where f.FK_Contrato is not null and TIMESTAMPDIFF(DAY,CURDATE(),CONCAT(YEAR(CURDATE()),"-",MONTH(Fecha),"-",DAY(Fecha))) BETWEEN 0 and 15    UNION SELECT f.ID_Fecha, fecha, f.Asunto, TIMESTAMPDIFF(DAY,CURDATE(),fecha), null, null, null, p.Nombres, p.A_paterno, p.A_materno from fecha as f RIGHT join personal as p on f.FK_Ingreso=p.ID_Personal where f.FK_Ingreso is not null and TIMESTAMPDIFF(DAY,CURDATE(),CONCAT(YEAR(CURDATE()),"-",MONTH(Fecha),"-",DAY(Fecha))) BETWEEN 0 and 15    UNION SELECT f.ID_Fecha, fecha, f.Asunto,  TIMESTAMPDIFF(DAY,CURDATE(),fecha), l.Institucion, l.detalles ,l.FechaAdquirida, l.tipo, l.cantidad, l.categoria from fecha as f  RIGHT join licencias as l on f.FK_Licencia=l.ID_Licencia where f.FK_Licencia is not null and TIMESTAMPDIFF(DAY,CURDATE(),CONCAT(YEAR(CURDATE()),"-",MONTH(Fecha),"-",DAY(Fecha))) BETWEEN 0 and 15     UNION SELECT f.ID_Fecha,  fecha, f.Asunto, TIMESTAMPDIFF(DAY,CURDATE(),fecha), null, null, t.UltimoPago, v.Modelo, v.Placas, v.Propietario  from fecha as f RIGHT JOIN tenencia as t on f.FK_Tenencia=t.ID_Tenencia RIGHT JOIN vehiculo as v on t.FK_ID_Vehiculo=v.ID_Vehiculo WHERE f.FK_Tenencia is not null and TIMESTAMPDIFF(DAY,CURDATE(),CONCAT(YEAR(CURDATE()),"-",MONTH(Fecha),"-",DAY(Fecha))) BETWEEN 0 and 15    UNION SELECT f.ID_Fecha, fecha, f.Asunto, TIMESTAMPDIFF(DAY,CURDATE(),fecha), NULL, NULL, vr.UltimaVerificacion, vh.Modelo, vh.Placas, vh.Propietario  from fecha as f RIGHT JOIN verificacion as vr on f.Fk_Verificacion=vr.ID_Verificacion RIGHT JOIN vehiculo as vh on vr.FK_ID_Vehiculo=vh.ID_Vehiculo where f.Fk_Verificacion is not null and TIMESTAMPDIFF(DAY,CURDATE(),CONCAT(YEAR(CURDATE()),"-",MONTH(Fecha),"-",DAY(Fecha))) BETWEEN 0 and 15 UNIOn SELECT f.ID_Fecha, fecha, f.Asunto,TIMESTAMPDIFF(DAY,CURDATE(),fecha), s.ProvedorSeguro,s.NoPoliza, null, v.Modelo, v.Placas, v.Propietario from fecha as f RIGHT JOIN seguros as s on f.FK_Seguro=s.ID_Seguro RIGHT JOIN vehiculo as v on s.FK_ID_Vehiculo=v.ID_Vehiculo where f.FK_Seguro is not null and TIMESTAMPDIFF(DAY,CURDATE(),CONCAT(YEAR(CURDATE()),"-",MONTH(Fecha),"-",DAY(Fecha))) BETWEEN 0 and 15;`, function (err, result, fields) {
    //consulta provicional get all events
   //await pool.query(`SELECT id_fecha as id, fecha, f.Asunto, TIMESTAMPDIFF(DAY,CURDATE(),fecha) as dif, e.Nombre as EqNom, e.Detalles, e.FechaEntrega as ultimo, p.Nombres, p.A_paterno, p.A_materno  from fecha as f  RIGHT JOIN equipo as e on f.FK_Equipo=e.ID_Equipo RIGHT JOIN personal as p on e.FK_ID_Personal=p.ID_Personal where f.FK_Equipo is not null    UNION SELECT ID_Fecha as id, fecha, f.Asunto, TIMESTAMPDIFF(DAY,CURDATE(),fecha) as dif, c.type, c.cantidad, null, p.Nombres, p.A_paterno, p.A_materno from Fecha as f RIGHT JOIN contrato as c on f.FK_Contrato=c.ID_Contrato RIGHT JOIN personal AS p ON c.FK_ID_Personal=p.ID_Personal where f.FK_Contrato is not null  UNION SELECT f.ID_Fecha, fecha, f.Asunto, TIMESTAMPDIFF(DAY,CURDATE(),fecha), null, null, null, p.Nombres, p.A_paterno, p.A_materno from fecha as f RIGHT join personal as p on f.FK_Ingreso=p.ID_Personal where f.FK_Ingreso is not null  UNION SELECT f.ID_Fecha, fecha, f.Asunto,  TIMESTAMPDIFF(DAY,CURDATE(),fecha),  l.Institucion, l.detalles ,l.FechaAdquirida, l.tipo, l.cantidad, l.categoria from fecha as f  RIGHT join licencias as l on f.FK_Licencia=l.ID_Licencia where f.FK_Licencia is not null UNION SELECT f.ID_Fecha,  fecha, f.Asunto, TIMESTAMPDIFF(DAY,CURDATE(),fecha), null, null, t.UltimoPago, v.Modelo, v.Placas, v.Propietario  from fecha as f RIGHT JOIN tenencia as t on f.FK_Tenencia=t.ID_Tenencia RIGHT JOIN vehiculo as v on t.FK_ID_Vehiculo=v.ID_Vehiculo WHERE f.FK_Tenencia is not null   UNION SELECT f.ID_Fecha, fecha, f.Asunto, TIMESTAMPDIFF(DAY,CURDATE(),fecha), NULL, NULL, vr.UltimaVerificacion, vh.Modelo, vh.Placas, vh.Propietario  from fecha as f RIGHT JOIN verificacion as vr on f.Fk_Verificacion=vr.ID_Verificacion RIGHT JOIN vehiculo as vh on vr.FK_ID_Vehiculo=vh.ID_Vehiculo where f.Fk_Verificacion is not null UNIOn SELECT f.ID_Fecha, fecha, f.Asunto,TIMESTAMPDIFF(DAY,CURDATE(),fecha),s.ProvedorSeguro,s.NoPoliza, null, v.Modelo, v.Placas, v.Propietario from fecha as f RIGHT JOIN seguros as s on f.FK_Seguro=s.ID_Seguro RIGHT JOIN vehiculo as v on s.FK_ID_Vehiculo=v.ID_Vehiculo where f.FK_Seguro is not null;`, function (err, result, fields) {

      if (err) throw err;
      if (result.length > 0) {
        return res.json(result);
      }
      res.status(303).json({ message: 'No hay eventos' });
    });
  }

  public async equipamientos(req: Request, res: Response): Promise<any> {
    //consulta correcta
    await pool.query(`SELECT e.ID_Equipo, e.Nombre as EqNom, E.Detalles as EqDetalles , e.FechaEntrega as EqFechaU, p.Nombres, p.A_paterno, p.A_materno, F.Fecha As EqNext FROM equipo As E
   LEFT JOIN personal as p on E.FK_ID_Personal=p.ID_Personal
       LEFT JOIN fecha as F on e.FK_Fecha_Siguiente=F.ID_Fecha;`, function (err, result, fields) {

      if (err) throw err;
      if (result.length > 0) {
        return res.json(result);
      }
      res.status(404).json({ message: 'No hay equipamientos' });
    });
  }

  public async deleteEquipament(req: Request, res: Response): Promise<any> {
    const { id } = req.params;
    //Consulta para eleiminar al usuairo
    await pool.query('DELETE FROM equipo WHERE ID_Equipo=?', [id], function (err, result, fields) {
      if (err) throw err;
      if (result.affectedRows == 1) {
        res.json({ message: 'El equipo fue eliminado' });
      }
      else {
        res.status(404).json({ message: 'Equipo no encontrado' });
      }
    });
  }

  public async getEquipament(req: Request, res: Response): Promise<any> {
    const { id } = req.params;
    //Consulta para eleiminar al usuairo
    await pool.query('SELECT e.ID_Equipo, e.Nombre as EqNom, e.Detalles as EqDetalles, e.FechaEntrega as EqUltima, F.Fecha as EqProx, p.Nombres, p.A_paterno, p.A_materno FROM equipo as e LEFT JOIN fecha as f on f.ID_Fecha=e.FK_Fecha_Siguiente LEFT join personal as p on p.ID_Personal=e.FK_ID_Personal where ID_Equipo=?', [id], function (err, result, fields) {
      if (err) throw err;
      if (result.length > 0) {
        return res.json(result[0]);
      }
      res.status(404).json({ message: 'equipo no encontrado' });
    });
  }



  public async renewEquipament(req: Request, res: Response): Promise<any> {
    const { id } = req.params;
    //Consulta para eleiminar al usuairo
    await pool.query('UPDATE equipo SET FechaEntrega = CURRENT_DATE() WHERE ID_Equipo=?', [id], async function (err, result, fields) {
      if (err) throw err;

      if (result.affectedRows == 1) {
        await pool.query('UPDATE fecha SET fecha=DATE(DATE_ADD(CURRENT_DATE, INTERVAL 8 MONTH)) WHERE Fecha.FK_Equipo =?', [id], function (err, result, fields) {
          if (err) throw err;

          if (result.affectedRows == 1) {

            res.json({ message: 'El equipo fue actualizado' });

          }
          else {
            res.status(404).json({ message: 'equipo no encontrado' });
          }

        });


      }
      else {
        res.status(404).json({ message: 'equipo no encontrado' });
      }

    });
  }

  public async renew(req: Request, res: Response): Promise<any> {
    const { id } = req.params;
    //Consulta para eleiminar al usuairo
    // await pool.query('UPDATE equipo SET FechaEntrega = CURRENT_DATE() WHERE ID_Equipo=?', [id], async function (err, result, fields) {
    //   if (err) throw err;
    //   if (result.affectedRows == 1) {
    //     await pool.query('UPDATE fecha SET fecha=DATE(DATE_ADD(CURRENT_DATE, INTERVAL 8 MONTH)) WHERE Fecha.FK_Equipo =?', [id], function (err, result, fields) {
    //       if (err) throw err;
    //       if (result.affectedRows == 1) {
    //         res.json({ message: 'El equipo fue actualizado' });
    //       }
    //       else {
    //         res.status(404).json({ message: 'equipo no encontrado' });
    //       }
    //     });
    //   }
    //   else {
    //     res.status(404).json({ message: 'equipo no encontrado' });
    //   }
    // });

  }

  public async updateEquipament(req: Request, res: Response): Promise<any> {
    const { id } = req.params;
    console.log(req.body)
    console.log(id);

    let fecha = req.body.UltimaEntrega;
    await pool.query('UPDATE equipo SET Nombre = ?, Detalles = ?, FechaEntrega = ? WHERE ID_Equipo = ?', [req.body.Nombre, req.body.detalles, req.body.UltimaEntrega, id], function (err, result, fields) {
      if (err) throw err;
      if (result.affectedRows == 1) {

            pool.query('UPDATE fecha SET Fecha = DATE(DATE_ADD(?, INTERVAL 8 MONTH)) WHERE FK_Equipo  = ?;', [fecha, id], async function (err, result, fields) {
              if (err) throw err;
              console.log("Nueva fecha vencimiento")
            })

        res.json({ message: 'El Equipamiento fue actualizado' });
      } else {
        res.status(404).json({ message: 'Equipamiento no actualizado' });
      }
    });
  }

  public async deleteContrat(req: Request, res: Response): Promise<any> {
    const { id } = req.params;
    //Consulta para eleiminar al usuairo
    await pool.query('DELETE FROM contrato WHERE ID_Contrato=?', [id], function (err, result, fields) {
      if (err) throw err;
      if (result.affectedRows == 1) {
        res.json({ message: 'El Contrato fue eliminado' });
      }
      else {
        res.status(404).json({ message: 'Contrato no encontrado Delete' });
      }
    });
  }

  public async getContrat(req: Request, res: Response): Promise<any> {
    const { id } = req.params;
    //Consulta para eleiminar al usuairo
    await pool.query('SELECT c.ID_Contrato,c.type, c.cantidad, fi.Fecha AS Ingreso, F.Fecha as Terminacion, p.Nombres, p.A_paterno, p.A_materno FROM contrato as c LEFT JOIN fecha as f on f.ID_Fecha=c.FK_Fecha_Concluir LEFT join personal as p on p.ID_Personal=c.FK_ID_Personal LEFT JOIN fecha as fi on fi.FK_Ingreso=p.ID_Personal where ID_Contrato=?  ', [id], function (err, result, fields) {
      if (err) throw err;
      if (result.length > 0) {
        return res.json(result[0]);
      }
      res.status(404).json({ message: 'equipo no encontrado' });
    });
  }

  public async getContratos(req: Request, res: Response): Promise<any> {
    //consulta correcta

    //se hace un update para tener la
    await pool.query(`SELECT c.ID_Contrato, c.type, c.cantidad, fi.Fecha AS Ingreso, F.Fecha as Terminacion, p.Nombres, p.A_paterno, p.A_materno FROM contrato as c LEFT JOIN fecha as f on f.ID_Fecha=c.FK_Fecha_Concluir LEFT join personal as p on p.ID_Personal=c.FK_ID_Personal LEFT JOIN fecha as fi on fi.FK_Ingreso=p.ID_Personal;`, function (err, result, fields) {
      if (err) throw err;
      if (result.length > 0) {
        return res.json(result);
      }
      res.status(404).json({ message: 'No hay equipamientos' });
    });
  }

  public async updateContrat(req: Request, res: Response): Promise<any> {
    const { id } = req.params;
    console.log(req.body)
    console.log(id);
    let cantidad = req.body.cantidad;
    let type = req.body.type;
    let fecha = req.body.ingreso;
    await pool.query('UPDATE contrato SET type = ? , cantidad = ? where ID_Contrato = ?', [req.body.type, req.body.cantidad, id], function (err, result, fields) {
      if (err) throw err;
      if (result.affectedRows == 1) {
        //await anidado para actualizar la fecha de vencimiento
        switch (req.body.type) {
          case '0':
            pool.query('UPDATE fecha SET Fecha = DATE(DATE_ADD(?, INTERVAL ? MONTH)) WHERE FK_Contrato = ?;', [fecha, cantidad, id], async function (err, result, fields) {
              if (err) throw err;
              console.log("Nueva fecha vencimiento ehco")
            })
            break;
          case '1':
            pool.query('UPDATE fecha SET Fecha = DATE(DATE_ADD(?, INTERVAL ? YEAR)) WHERE FK_Contrato = ?;', [fecha, cantidad, id], async function (err, result, fields) {
              if (err) throw err;
              console.log("Nueva fecha vencimiento ehco")

            })
            break;
          case '2':
            pool.query('UPDATE fecha SET Fecha = ? WHERE FK_Contrato = ?;', [fecha, id], async function (err, result, fields) {
              if (err) throw err;
              console.log("Nueva fecha vencimiento ehco")

            })
            break;
        }

        res.json({ message: 'El usuario fue actualizado' });
      } else {
        res.status(404).json({ message: 'Usuario no actualizado' });
      }
    });
  }



  public async deleteSalary(req: Request, res: Response): Promise<any> {
    const { id } = req.params;
    //Consulta para eleiminar al usuairo
    await pool.query('DELETE FROM vacaciones WHERE ID_Vacaciones=?', [id], function (err, result, fields) {
      if (err) throw err;
      if (result.affectedRows == 1) {
        res.json({ message: 'El Salario fue eliminado' });
      }
      else {
        res.status(404).json({ message: 'Salario no encontrado Delete' });
      }
    });
  }

  public async getSalary(req: Request, res: Response): Promise<any> {
    const { id } = req.params;
    //Consulta para eleiminar al usuairo
    await pool.query('SELECT v.ID_Vacaciones as ID, v.Antiguedad_days as days, v.Antiguedad_months as months, v.Antiguedad_years as years, v.SalarioDiario as Salario, p.Nombres, p.A_paterno, p.A_materno FROM vacaciones as v LEFT join personal as p on p.ID_Personal=v.FK_Personal where ID_Vacaciones=?  ', [id], function (err, result, fields) {
      if (err) throw err;
      if (result.length > 0) {
        return res.json(result[0]);
      }
      res.status(404).json({ message: 'Salario no encontrado' });
    });

  }

  public async getSalarys(req: Request, res: Response): Promise<any> {
    //consulta correcta
    await pool.query('Update vacaciones as v SET Antiguedad_days = (TIMESTAMPDIFF(DAY,(SELECT Fecha from fecha, personal WHERE fecha.ID_Fecha = personal.FK_Fecha_Ingreso AND V.FK_Personal=personal.ID_Personal),CURDATE())), Antiguedad_months = (TIMESTAMPDIFF(MONTH,(SELECT Fecha from fecha, personal WHERE fecha.ID_Fecha = personal.FK_Fecha_Ingreso AND V.FK_Personal=personal.ID_Personal),CURDATE())), Antiguedad_years=(TIMESTAMPDIFF(YEAR,(SELECT Fecha from fecha, personal WHERE fecha.ID_Fecha = personal.FK_Fecha_Ingreso AND V.FK_Personal=personal.ID_Personal),CURDATE()))', async function (err, result, fields) {
      if (err) throw err;
      await pool.query(`SELECT v.ID_Vacaciones as ID, v.Antiguedad_days as days, v.Antiguedad_months as months, v.Antiguedad_years as years, v.SalarioDiario as Salario, p.Nombres, p.A_paterno, p.A_materno FROM vacaciones as v LEFT join personal as p on p.ID_Personal=v.FK_Personal ;`, function (err, result, fields) {

        if (err) throw err;
        if (result.length > 0) {
          return res.json(result);
        }
        res.status(404).json({ message: 'No hay Salarios' });
      });
    });
  }

  public async updateSalary(req: Request, res: Response): Promise<any> {
    const { id } = req.params;
    console.log(req.body)
    console.log(id);
    await pool.query('UPDATE vacaciones SET SalarioDiario = ? where ID_Vacaciones = ?', [req.body.salario, id], function (err, result, fields) {
      if (err) throw err;

      if (result.affectedRows == 1) {
        res.json({ message: 'El salario fue actualizado' });
      } else {
        res.status(404).json({ message: 'Salario no actualizado' });
      }
    });
  }
  //Tenencia
  public async renewTenencia(req: Request, res: Response): Promise<any>{
    const {id} = req.params;

    await pool.query('UPDATE fecha SET Fecha = DATE(DATE_ADD(CURRENT_DATE, INTERVAL 12 MONTH)) WHERE FK_Tenencia=?', [id], async function(err, result, fields){
      if (err) throw err;
      if (result.affectedRows == 1) {
        await pool.query('UPDATE tenencia SET UltimoPago = DATE(CURRENT_DATE) WHERE ID_Tenencia  = ?', [id], function(err, res, fields){
          if (err) throw err;

        })
        res.json({ message: 'La Tenencia Fecha siguienteactualizado' });
      }
    });

  }


  public async deleteTenencia(req: Request, res: Response): Promise<any> {
    const { id } = req.params;
    await pool.query('DELETE FROM tenencia WHERE ID_Tenencia=?', [id], function (err, result, fields) {
      if (err) throw err;
      if (result.affectedRows == 1) {
        res.json({ message: 'La Tenencia fue eliminado' });
      }
      else {
        res.status(404).json({ message: 'Tenencia no encontrado Delete' });
      }
    });
  }

  public async getTenencia(req: Request, res: Response): Promise<any> {
    const { id } = req.params;
    // Optener datos de tenencia
    await pool.query('SELECT T.ID_Tenencia, T.UltimoPago, V.Modelo, V.Placas, V.Propietario, V.NumeroSerie, F.Fecha FROM tenencia as T RIGHT JOIN fecha as f ON f.FK_Tenencia=T.ID_Tenencia RIGHT JOIN vehiculo as V on V.FK_Tenencia=t.ID_Tenencia WHERE ID_Tenencia=?', [id], function (err, result, fields) {
      if (err) throw err;
      if (result.length > 0) {
        return res.json(result[0]);
      }
      res.status(404).json({ message: 'Tenecia no encontrado' });
    });

  }

  public async getTenencias(req: Request, res: Response): Promise<any> {
    //consulta correcta

      await pool.query(`SELECT v.Modelo, v.Placas, v.Propietario, v.NumeroSerie as NoSerie, t.ID_Tenencia as ID, t.UltimoPago as Upago, f.Fecha as Prox FROM vehiculo as v LEFT JOIN tenencia as t on t.ID_Tenencia=v.FK_Tenencia LEFT JOIN fecha as f on f.FK_Tenencia=t.ID_Tenencia WHERE V.FK_Tenencia is not null;`, function (err, result, fields) {
        if (err) throw err;
        if (result.length > 0) {
          return res.json(result);
        }
        res.status(404).json({ message: 'No hay Tenencias' });
      });
  }

  public async updateTenencia(req: Request, res: Response): Promise<any> {
    const { id } = req.params;
    let fechaultimo = req.body.UltimoPago;
    let proximo = req.body.ProximoPago;
    await pool.query('UPDATE tenencia SET UltimoPago = ? where ID_Tenencia = ?', [ fechaultimo, id], async function (err, result, fields) {
      if (err) throw err;
      if (result.affectedRows == 1) {
        await pool.query('UPDATE fecha SET Fecha = ? WHERE FK_Tenencia = ?', [proximo, id], function(err, res, fields){
          console.log("Update Fecha");
        });
        res.json({ message: 'La Tenencia fue actualizado' });
      } else {
        res.status(404).json({ message: 'Tenencia no actualizado' });
      }
    });
  }
  //seguros

  public async renewSeguro(req: Request, res: Response): Promise<any>{
    const {id} = req.params;

    await pool.query('UPDATE fecha SET Fecha = DATE(DATE_ADD(CURRENT_DATE, INTERVAL 12 MONTH)) WHERE FK_Seguro =?', [id], async function(err, result, fields){
      if (err) throw err;
      if (result.affectedRows == 1) {
        res.json({ message: 'La Fecha de seguro siguiente fue actualizada' });
     }
    });

  }
  public async deleteSeguro(req: Request, res: Response): Promise<any> {
    const { id } = req.params;
    //Consulta para eleiminar un seguro
    await pool.query('DELETE FROM seguros WHERE ID_Seguro=?', [id], function (err, result, fields) {
      if (err) throw err;
      if (result.affectedRows == 1) {
        res.json({ message: 'El seguro fue eliminado' });
      }
      else {
        res.status(404).json({ message: 'seguro no encontrado Delete' });
      }
    });
  }

  public async getSeguro(req: Request, res: Response): Promise<any> {
    const { id } = req.params;
    //Consulta optener la informacion de seguro, asi como la fecha y el vehiculo
    await pool.query('SELECT s.ID_Seguro as ID, s.ProvedorSeguro as Provedor, s.NoPoliza, v.Modelo, v.Placas, v.Propietario, v.NumeroSerie, f.Fecha AS Fvencimiento FROM seguros AS s RIGHT JOIN vehiculo AS v on v.FK_Seguro=s.ID_Seguro RIGHT JOIN fecha AS F ON f.FK_Seguro=s.ID_Seguro WHERE s.FK_Fecha_Vencimiento is not null AND s.FK_ID_Vehiculo is not null AND ID_Seguro =?  ', [id], function (err, result, fields) {
      if (err) throw err;
      if (result.length > 0) {
        return res.json(result[0]);
      }
      res.status(404).json({ message: 'Salario no encontrado' });
    });

  }

  public async getSeguros(req: Request, res: Response): Promise<any> {
    //consulta correcta

      await pool.query(`SELECT s.ID_Seguro as ID, s.ProvedorSeguro as Provedor, s.NoPoliza, v.Modelo, v.Placas, v.Propietario, v.NumeroSerie, f.Fecha AS Fvencimiento FROM seguros AS s RIGHT JOIN vehiculo AS v on v.FK_Seguro=s.ID_Seguro RIGHT JOIN fecha AS F ON f.FK_Seguro=s.ID_Seguro WHERE s.FK_Fecha_Vencimiento is not null AND s.FK_ID_Vehiculo is not null;`, function (err, result, fields) {

        if (err) throw err;
        if (result.length > 0) {
          return res.json(result);
        }
        res.status(404).json({ message: 'No hay Seguros' });
      });
  }

  // ID_Seguro?: number;
  // Provedor?: Text;
  // NoPoliza?: Text;
  // ProximoPago?: Date;

  public async updateSeguro(req: Request, res: Response): Promise<any> {
    const { id } = req.params;
    let fecha = req.body.ProximoPago;
    await pool.query('UPDATE seguros SET ProvedorSeguro = ?, NoPoliza = ? WHERE ID_Seguro = ?;', [req.body.Provedor, req.body.NoPoliza,id], async function (err, result, fields) {
      if (err) throw err;
      if (result.affectedRows == 1) {
        await pool.query('UPDATE fecha SET Fecha=? WHERE FK_Seguro=?;', [fecha, id], function(err, result, fields ){
          if (err) throw err;
        });
        res.json({ message: 'El Seguro fue actualizado' });
      } else {
        res.status(404).json({ message: 'Seguro no actualizado' });
      }
    });
  }

  //Verificaciones
  public async deleteVerificacion(req: Request, res: Response): Promise<any> {
    const { id } = req.params;
    //Consulta para eleiminar al usuairo
    await pool.query('DELETE FROM verificacion WHERE ID_Verificacion=?', [id], function (err, result, fields) {
      if (err) throw err;
      if (result.affectedRows == 1) {
        res.json({ message: 'La Verificaicon fue eliminada' });
      }
      else {
        res.status(404).json({ message: 'verificacion no encontrado Delete' });
      }
    });
  }



  public async getVerificacion(req: Request, res: Response): Promise<any> {
    const { id } = req.params;
    //Consulta para eleiminar al usuairo
   await pool.query('SELECT vr.ID_Verificacion as ID, vr.UltimaVerificacion as Ultima, f.Fecha as Prox, v.Modelo, v.Placas, v.Propietario, v.NumeroSerie FROM verificacion as Vr RIGHT JOIN fecha as F on F.Fk_Verificacion=vr.ID_Verificacion RIGHT JOIN vehiculo as v ON V.FK_Verificacion =vr.ID_Verificacion WHERE  ID_Verificacion = ?', [id], function (err, result, fields) {
      if (err) throw err;
      if (result.length > 0) {
        return res.json(result[0]);
      }
      res.status(404).json({ message: 'Salario no encontrado' });
    });

  }

  public async getVerificaciones(req: Request, res: Response): Promise<any> {
    //consulta correcta
      await pool.query(`SELECT vr.ID_Verificacion as ID, vr.UltimaVerificacion as Ultima, f.Fecha as Prox, v.Modelo, v.Placas, v.Propietario, v.NumeroSerie FROM verificacion as Vr RIGHT JOIN fecha as F on F.Fk_Verificacion=vr.ID_Verificacion RIGHT JOIN vehiculo as v ON V.FK_Verificacion =vr.ID_Verificacion`, function (err, result, fields) {
        if (err) throw err;
        if (result.length > 0) {
          return res.json(result);
        }
        res.status(404).json({ message: 'No hay Salarios' });
      });
  }

  public async updateVerificacion(req: Request, res: Response): Promise<any> {
    const { id } = req.params;
    let ultima = req.body.UltimoPago;
    let prox =  req.body.ProximoPago;
    await pool.query('UPDATE verificacion SET UltimaVerificacion = ? WHERE ID_Verificacion = ?', [ultima, id], async function (err, result, fields) {
      if (err) throw err;
      if (result.affectedRows == 1) {
        await pool.query('UPDATE fecha SET Fecha= ?  WHERE Fk_Verificacion  = ?', [prox, id], async function(err, res, fields){
          if(err) throw err;
        });
        res.json({ message: 'Verificacion fue actualizado' });
      } else {
        res.status(404).json({ message: 'Verificacion no actualizado' });
      }
    });
  }

  public async renewVerificacion(req: Request, res: Response): Promise<any> {
    const{id} = req.params;

    await pool.query('UPDATE fecha SET Fecha = DATE(DATE_ADD(CURRENT_DATE, INTERVAL 6 MONTH)) WHERE Fk_Verificacion =?', [id], async function(err, result, fields){
      if (err) throw err;

      if (result.affectedRows == 1) {

        await pool.query('UPDATE verificacion SET UltimaVerificacion = DATE(CURRENT_DATE) WHERE ID_Verificacion   = ?', [id], function(err, res, fields){
          if (err) throw err;

        })

      }
      res.json({ message: 'La Tenencia Fecha siguienteactualizado' });
    });


  }


}
export const miscellaneousController = new MiscellaneousController();

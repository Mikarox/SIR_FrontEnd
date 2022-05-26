import bcryptjs from 'bcryptjs';
import { Request, Response } from 'express';
import pool from '../database';

//Se definen lo que realizarán las peticiones
class LicencesController {
  //Se ejecuta la query para listar todos los usuarios


  public async getOne(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    await pool.query('SELECT l.ID_Licencia, l.categoria, l.Institucion, l.detalles, l.FechaAdquirida, l.tipo, l.cantidad, F.Fecha, F.Asunto  FROM licencias as l RIGHT JOIN fecha AS F ON l.FK_Fecha_ProxPago=F.ID_Fecha WHERE FK_Fecha_ProxPago is not null and ID_Licencia=?', [id], function (err, result, fields) {
      if (err) throw err;
      if (result.length > 0) {
        return res.json(result);
      }
      res.status(404).json({ message: 'No existe licencias registrada' });
    });
  }

  public async list(req: Request, res: Response): Promise<void> {
    await pool.query('SELECT l.ID_Licencia AS ID, l.categoria, l.Institucion, l.detalles, l.FechaAdquirida, l.tipo, l.cantidad, F.Fecha, F.Asunto FROM licencias AS l RIGHT JOIN fecha AS F ON l.FK_Fecha_ProxPago=F.ID_Fecha WHERE FK_Fecha_ProxPago is not null;', function (err, result, fields) {
      if (err) throw err;
      if (result.length > 0) {
        return res.json(result);
      }
      res.status(404).json({ message: 'No existe licencias registrada' });
    });
  }
  public async listG(req: Request, res: Response): Promise<void> {
    await pool.query('SELECT l.ID_Licencia AS ID, l.categoria, l.Institucion, l.detalles, l.FechaAdquirida, l.tipo, l.cantidad, F.Fecha, F.Asunto FROM licencias AS l RIGHT JOIN fecha AS F ON l.FK_Fecha_ProxPago=F.ID_Fecha WHERE FK_Fecha_ProxPago is not null AND l.categoria="Garantias";', function (err, result, fields) {
      if (err) throw err;
      if (result.length > 0) {
        return res.json(result);
      }
      res.status(404).json({ message: 'No existe licencias registrada' });
    });
  }

  public async listS(req: Request, res: Response): Promise<void> {
    await pool.query('SELECT l.ID_Licencia AS ID, l.categoria, l.Institucion, l.detalles, l.FechaAdquirida, l.tipo, l.cantidad, F.Fecha, F.Asunto FROM licencias AS l RIGHT JOIN fecha AS F ON l.FK_Fecha_ProxPago=F.ID_Fecha WHERE FK_Fecha_ProxPago is not null AND l.categoria="Servicios";', function (err, result, fields) {
      if (err) throw err;
      if (result.length > 0) {
        return res.json(result);
      }
      res.status(404).json({ message: 'No existe licencias registrada' });
    });
  }

  public async listL(req: Request, res: Response): Promise<void> {
    await pool.query('SELECT l.ID_Licencia AS ID, l.categoria, l.Institucion, l.detalles, l.FechaAdquirida, l.tipo, l.cantidad, F.Fecha, F.Asunto FROM licencias AS l RIGHT JOIN fecha AS F ON l.FK_Fecha_ProxPago=F.ID_Fecha WHERE FK_Fecha_ProxPago is not null AND l.categoria="Licencias";', function (err, result, fields) {
      if (err) throw err;
      if (result.length > 0) {
        return res.json(result);
      }
      res.status(404).json({ message: 'No existe licencias registrada' });
    });
  }
  // Fecha
  public async listF(req: Request, res: Response): Promise<void> {
    await pool.query('SELECT l.ID_Licencia AS ID, l.categoria, l.Institucion, l.detalles, l.FechaAdquirida, l.tipo, l.cantidad, F.Fecha, F.Asunto FROM licencias AS l RIGHT JOIN fecha AS F ON l.FK_Fecha_ProxPago=F.ID_Fecha WHERE FK_Fecha_ProxPago is not null AND l.categoria="Fecha";', function (err, result, fields) {
      if (err) throw err;
      if (result.length > 0) {
        return res.json(result);
      }
      res.status(404).json({ message: 'No existe licencias registrada' });
    });
  }




  public async register(req: Request, res: Response): Promise<void> {
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
        Tipo=0;
        Can=0;
        FechaI = Prox;
        break;
      case '3':
        Cat = "Fecha";
        Tipo=0;
        Can=0;
        FechaI = Prox;
        break;

    }


    await pool.query('INSERT INTO licencias (ID_Licencia, categoria, Institucion, detalles, FechaAdquirida, tipo, cantidad, FK_Fecha_ProxPago) VALUES (NULL, ?, ?,?,?,?, ?, NULL);', [Cat, Inst, Deta, FechaI, Tipo, Can], async function (err, result, fuelds) {
      if (err) throw err;
      var idlic = result.insertId;
      await pool.query('INSERT INTO `fecha` (`ID_Fecha`, `Fecha`, `Asunto`, `FK_Ingreso`, `FK_Vacaciones`, `FK_Contrato`, `FK_Equipo`, `FK_Licencia`, `FK_Seguro`, `FK_Tenencia`, `Fk_Verificacion`)  VALUES (NULL, ?, ?, NULL, NULL, NULL, NULL, ?, NULL, NULL, NULL);', [Prox, Cat, idlic], async function (err, res, fiellds) {
        if (err) throw err;
        var idfecha = res.insertId;
        await pool.query('UPDATE licencias SET FK_Fecha_ProxPago = ? WHERE ID_Licencia=?', [idfecha, idlic], async function (err, res, fiellds) {
          if (err) throw err;

        });
      });

    });

    res.json({ message: 'Licencia registrado' });

  }

  // await pool.query('', [], async function(err,res,fiellds) {
  //   if (err) throw err;
  // });

  public async update(req: Request, res: Response): Promise<void> {
    const {id} = req.params;
    console.log(req.body)
    let Cat = req.body.Categoria;

    let Inst = req.body.Institucion;
    let Deta = req.body.Detalles;
    let FechaI = req.body.FechaAdquirida;
    let Tipo = req.body.Tipo;
    let Can = req.body.Cantidad;
    let Prox = req.body.ProximaFecha;

    switch (Cat) {
      case "Licencias":
        Tipo=0;
        Can=0;
        FechaI = Prox;
        break;
      case "Fecha":
        Tipo=0;
        Can=0;
        FechaI = Prox;
        break;

    }

     await pool.query('UPDATE `licencias` SET `categoria` = ?, `Institucion` = ?, `detalles` = ?, `FechaAdquirida` = ?, `tipo` = ?, `cantidad` = ? WHERE `licencias`.`ID_Licencia` = ?;', [Cat,Inst,Deta,FechaI,Tipo,Can, id], async function (err, res, fiellds) {
      if (err) throw err;
      pool.query('UPDATE fecha SET Fecha = ? WHERE FK_Licencia   = ?;', [Prox, id], async function (err, result, fields) {
        if (err) throw err;
        console.log("Update completo");
      })

    });

    res.json({ message: 'Licencia actualizada' });
  }
  public async delete(req: Request, res: Response): Promise<void> {
    const {id} = req.params;

    await pool.query('DELETE FROM licencias WHERE ID_Equipo=?', [id], function (err, result, fields) {
      if (err) throw err;
      if (result.affectedRows == 1) {
        res.json({ message: 'la licencia fue eliminado' });
      }
      else {
        res.status(404).json({ message: 'licencia no encontrado' });
      }
    });
  }


}
export const licenciasController = new LicencesController();

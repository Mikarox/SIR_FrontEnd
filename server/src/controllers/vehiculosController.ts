import { Request, response, Response } from 'express';
import pool from '../database';

//Se definen lo que realizarán las peticiones
class VehiculoController {
  //Se ejecuta la query para listar todos los personales
  public async list(req: Request, res: Response): Promise<void> {
    await pool.query('SELECT * FROM vehiculo', function (err, result, fields) {
      if (err) throw err;
      if (result.length > 0) {
        return res.json(result);
      }
      res.status(404).json({ message: 'No existe vehiculos registrado' });
    });
  }
  //Se ejecuta la query para mostrar un  vehiculo por su id

  public async getOne(req: Request, res: Response): Promise<any> {
    const { id } = req.params;
    //este es la consulta que se hara en el server y traera todos los datos
    await pool.query('SELECT V.ID_Vehiculo ,V.Modelo, V.Placas, v.Propietario, v.NumeroSerie AS NoSerie, v.FK_Tenencia AS T, v.FK_Verificacion as V, v.FK_Seguro as S, T.UltimoPago, FT.Fecha AS FechaTenencia, FT.Asunto AsuntoTenencia, VR.UltimaVerificacion as UltimaV, FV.Fecha AS FechaVerificacion, FV.Asunto AS AsuntoVerific, S.ProvedorSeguro AS Provedor, S.NoPoliza, FS.Fecha AS ProxPagoSeguro, FS.Asunto AS AsuntoSeguro FROM vehiculo AS V LEFT JOIN tenencia AS T ON T.FK_ID_Vehiculo = V.ID_Vehiculo LEFT JOIN fecha AS FT ON FT.FK_Tenencia = T.ID_Tenencia LEFT JOIN verificacion AS VR ON VR.FK_ID_Vehiculo=V.ID_Vehiculo LEFT JOIN fecha AS FV ON FV.ID_Fecha=VR.FK_Fecha_ProximoPago LEFT JOIN seguros AS S ON S.FK_ID_Vehiculo=v.ID_Vehiculo LEFT JOIN fecha as FS ON FS.ID_Fecha=S.FK_Fecha_Vencimiento WHERE ID_Vehiculo=?;', [id], function (err, result, fields) {
      if (err) throw err;
      if (result.length > 0) {
        console.log("Encontro")
        return res.json(result);
      }

      console.log("Nel")
      res.status(404).json({ message: ' vehiculo no encontrado' });
    });
  }
  //Se ejecuta la query para registrar un personale
  public async register(req: Request, res: Response): Promise<void> {

    var fecha: any, id: any;
    console.log(req.body)

    try {
      pool.query('INSERT INTO `vehiculo` (`ID_Vehiculo`, `Modelo`, `Placas`, `Propietario`, `NumeroSerie`, `FK_Tenencia`, `FK_Verificacion`, `FK_Seguro`) VALUES (NULL, ?, ?,?,?, NULL, NULL, NULL);', [req.body.Modelo, req.body.Placas, req.body.Propietario, req.body.NoSerie], async function (err, result, fields) {
        if (err) throw err;
        id = result.insertId;
        if (req.body.type.length != 0) {
          // ["Verificacion", "Seguro", "Tenencia"]

          for (var i = 0; i < req.body.type.length; i++) {
            switch (req.body.type[i]) {
              case "Verificacion":
                console.log("Verificacion i:");
                console.log(i)
                //almacenamos la fecha para evitar fallas (experiencia XDXDXD)
                //insertamos la verificacion
                let fecha = req.body.propety3[i];
                await pool.query('INSERT INTO `verificacion` (`ID_Verificacion`, `UltimaVerificacion`, `FK_Fecha_ProximoPago`, `FK_ID_Vehiculo`) VALUES (NULL, ?, NULL, ?)', [req.body.propety3[i], id], async function (err, result, fields) {
                  if (err) throw err;
                  let idveri = result.insertId;

                  console.log("inSERT VERIFI fecha:")
                  console.log(fecha)
                  //insertamso la fecha de la proxima verificacion esta es automatica cada 6 meses por que los vehiculos cuentan con logos de empresas, AGREGAREMOS meses a la ultima fecha para generar el evento
                  await pool.query('INSERT INTO `fecha` (`ID_Fecha`, `Fecha`, `Asunto`, `FK_Ingreso`, `FK_Contrato`, `FK_Equipo`, `FK_Licencia`, `FK_Seguro`, `FK_Tenencia`, `Fk_Verificacion`) VALUES (NULL, DATE(DATE_ADD(?,INTERVAL 6 MONTH)), "Verificacion", NULL, NULL, NULL, NULL, NULL, NULL, ?);', [fecha, result.insertId], async function (err, result, fields) {
                    if (err) throw err;
                    console.log("insert fecha verif" + result.insertId)
                    //podemos actualizar la tabla verificacion para aniadir como FK el id de fecha para la relacion
                    await pool.query('UPDATE `verificacion` SET `FK_Fecha_ProximoPago` = ? WHERE `verificacion`.`ID_Verificacion` = ?;', [result.insertId, idveri], async function (err, result, fields) {
                      if (err) throw err;

                      console.log("update verificaci")
                      await pool.query('UPDATE `vehiculo` SET `FK_Verificacion` = ? WHERE `vehiculo`.`ID_Vehiculo` = ?;', [idveri, id], async function (err, result, fields) {
                        if (err) throw err;
                        console.log("Fin Verificacion");
                      })
                    });
                  });

                });

                break;//en case type seguro

              //segun yo hay un error, creo que tengo que sacar los datos para evitar problemas


              case "Seguro":
                console.log("Seguro i:");
                console.log(i);
                //insertamos en tabla seguros
                let fechaseguro = req.body.propety3[i];
                await pool.query('INSERT INTO `seguros` (`ID_Seguro`, `ProvedorSeguro`, `NoPoliza`, `FK_Fecha_Vencimiento`, `FK_ID_Vehiculo`) VALUES (NULL, ?, ?, NULL, ?);', [req.body.propety1[i], req.body.propety2[i], id], async function (err, result, fields) {
                  //almacenamos el id de seguros
                  let idseguro = result.insertId;
                  //con esa linea estoy obteniendo el id de insercion
                  //ahora si puedo usar la fecha la renovacion de seguro es 1 anio puedo re usar la query
                  await pool.query('INSERT INTO `fecha` (`ID_Fecha`, `Fecha`, `Asunto`, `FK_Ingreso`, `FK_Contrato`, `FK_Equipo`, `FK_Licencia`, `FK_Seguro`, `FK_Tenencia`, `Fk_Verificacion`) VALUES (NULL, DATE(DATE_ADD(?,INTERVAL 1 YEAR)), "Seguro", NULL, NULL, NULL, NULL, ?, NULL, NULL);', [fechaseguro, idseguro], async function (err, result, fields) {

                    if (err) throw err;
                    //con eso se inserta la fecha de la proxima compra/renovacion de
                    //update a seguros para almacenarr la fk que vincula a fecha
                    await pool.query('UPDATE `seguros` SET `FK_Fecha_Vencimiento` = ? WHERE `seguros`.`ID_Seguro` = ?', [result.insertId, idseguro], async function (err, result, fields) {
                      if (err) throw err;
                      //solo faltaria actualizar la tabla principal de vehiculo para que rediriga a seguros
                      //Despues implementare trigers
                      await pool.query('UPDATE `vehiculo` SET `FK_Seguro` = ? WHERE `vehiculo`.`ID_Vehiculo` = ?;', [idseguro, id], async function (err, result, fields) {
                        if (err) throw err;
                        console.log("Fin Seguro");
                      });

                    });

                  });
                });
                break;
              case "Tenencia":
                console.log("Tenencia i:");
                console.log(i);
                let fechatenencia = req.body.propety3[i];
                await pool.query('INSERT INTO `tenencia` (`ID_Tenencia`, `UltimoPago`, `FK_Fecha_ProximoPago`, `FK_ID_Vehiculo`) VALUES (NULL, ?, NULL, ?);', [req.body.propety3[i], id], async function (err, result, fields) {
                  if (err) throw err;
                  let idtenencia = result.insertId;
                  //actualizare primero el vehiculo
                  await pool.query('UPDATE `vehiculo` SET `FK_Tenencia` = ? WHERE `vehiculo`.`ID_Vehiculo` = ?;', [idtenencia, id], async function (err, result, fields) {
                    if (err) throw err;
                    console.log("fecha tenencia:" + fechatenencia)
                    await pool.query('INSERT INTO `fecha` (`ID_Fecha`, `Fecha`, `Asunto`, `FK_Ingreso`, `FK_Contrato`, `FK_Equipo`, `FK_Licencia`, `FK_Seguro`, `FK_Tenencia`, `Fk_Verificacion`) VALUES (NULL, DATE(DATE_ADD(?, INTERVAL 1 YEAR)) , "Tenencia", NULL, NULL, NULL, NULL, NULL, ?, NULL);', [fechatenencia, idtenencia], async function (err, result, fields) {
                      if (err) throw err;
                      console.log("Result ins fec tenencia:" + result);
                      //por ultimo el update a tenencia
                      await pool.query('UPDATE `tenencia` SET `FK_Fecha_ProximoPago` = ? WHERE `tenencia`.`ID_Tenencia` = ?;', [result.insertId, idtenencia], async function (err, result, fields) {
                        if (err) throw err;
                        console.log("Fin tenencia");
                      })

                    })
                  });

                });

                break;
              default:
                console.log("No aplica:" + req.body.type[i]);
                break;

            }//end switch contrato equipo salario

          }//end for


        } else {
          console.log('Vehiculo Solo');
        }
      });
    } catch (error) {
      console.log("Valio vrga todo xDXDXD Eliminar esto!!!");
    }




    res.json({ message: ' vehiculo registrado' });

  }
  //Se ejecuta la query para actualizar un  vehiculopor su id
  public async update(req: Request, res: Response): Promise<any> {
    const { id } = req.params;
    console.log(req.body)

    await pool.query('UPDATE vehiculo SET Modelo = ?, Placas = ?, Propietario = ?, NumeroSerie = ?  WHERE ID_Vehiculo=? ', [req.body.Modelo, req.body.Placas, req.body.Propietario, req.body.NoSerie, id], async function (err, result, fields) {
      if (err) throw err;
      // Comprobamos si se elimino la tenencia, esto con el fin eliminacion en la base de datos
      if (req.body.type.indexOf('Tenencia') == -1) {
        await pool.query('DELETE FROM tenencia WHERE FK_ID_Vehiculo = ?', [id], async function (err, results, fields) {
          if (err) throw err;
          console.log('adios Tenencia from Vehiculo')
        });
      }
      //Comprobamos si aun existe verificacion, caso contrario eliminamos
      if (req.body.type.indexOf('Verificacion') == -1) {
        await pool.query('DELETE FROM verificacion WHERE FK_ID_Vehiculo = ?', [id], async function (err, results, fields) {
          if (err) throw err;
          console.log('adios Vehiculo from Vehiculo')
        });
      }
      //Comprobamos si aun existe el seguro, caso contrario eliminamos
      if (req.body.type.indexOf('Seguro') == -1) {
        await pool.query('DELETE FROM seguros WHERE FK_ID_Vehiculo = ?', [id], async function (err, results, fields) {
          if (err) throw err;
          console.log('adios Seguro from Vehiculo')
        });
      }

      for (let i = 0; i < req.body.type.length; i++) {
        switch (req.body.type[i]) {
          case "Tenencia":
            let idtenencia = req.body.propetyid[i];
            let ultimoten = req.body.propety1[i];
            let proxten = req.body.propety2[i];
            if (idtenencia == -1) {
              await pool.query('INSERT INTO `tenencia` (`ID_Tenencia`, `UltimoPago`, `FK_Fecha_ProximoPago`, `FK_ID_Vehiculo`) VALUES (NULL, ?, NULL, ?);', [ultimoten, id], async function (err, result, fields) {
                if (err) throw err;
                let newidtenencia = result.insertId;
                //actualizare primero el vehiculo
                await pool.query('UPDATE `vehiculo` SET `FK_Tenencia` = ? WHERE `vehiculo`.`ID_Vehiculo` = ?;', [newidtenencia, id], async function (err, result, fields) {
                  if (err) throw err;
                  await pool.query('INSERT INTO `fecha` (`ID_Fecha`, `Fecha`, `Asunto`, `FK_Ingreso`, `FK_Contrato`, `FK_Equipo`, `FK_Licencia`, `FK_Seguro`, `FK_Tenencia`, `Fk_Verificacion`) VALUES (NULL, ?  , "Tenencia", NULL, NULL, NULL, NULL, NULL, ?, NULL);', [proxten, newidtenencia], async function (err, result, fields) {
                    if (err) throw err;
                    console.log("Result ins fec tenencia:" + result);
                    //por ultimo el update a tenencia
                    await pool.query('UPDATE `tenencia` SET `FK_Fecha_ProximoPago` = ? WHERE `tenencia`.`ID_Tenencia` = ?;', [result.insertId, newidtenencia], async function (err, result, fields) {
                      if (err) throw err;
                      console.log("Fin tenencia");
                    })

                  })
                });

              });
            } else {
              await pool.query("UPDATE tenencia SET UltimoPago = ? WHERE ID_Tenencia = ?", [ultimoten, idtenencia], async function (err, result, fields) {
                if (err) throw err;
                await pool.query("UPDATE fecha SET Fecha = ? WHERE FK_Tenencia = ?", [proxten, idtenencia], async function (err, results, filds) {
                  if (err) throw err;
                  console.log("end update tenencia")
                });
              });
            }
            break;
          case "Seguro":
            let idseg = req.body.propetyid[i]
            let provedorname = req.body.propety1[i];
            let Nopol = req.body.propety2[i];
            let venci = req.body.propety3[i];
            if (idseg == -1) {
              await pool.query('INSERT INTO seguros (`ID_Seguro`, `ProvedorSeguro`, `NoPoliza`, `FK_Fecha_Vencimiento`, `FK_ID_Vehiculo`) VALUES (NULL, ?, ?, NULL, ?);', [provedorname, Nopol, id], async function (err, results, fields) {
                //almacenamos el id de seguros
                if (err) throw err;
                var idseguro = results.insertId;
                //con esa linea estoy obteniendo el id de insercion
                //ahora si puedo usar la fecha la renovacion de seguro es 1 anio puedo re usar la query
                await pool.query('INSERT INTO `fecha` (`ID_Fecha`, `Fecha`, `Asunto`, `FK_Ingreso`,`FK_Vacaciones`, `FK_Contrato`, `FK_Equipo`, `FK_Licencia`, `FK_Seguro`, `FK_Tenencia`, `Fk_Verificacion`) VALUES (NULL, DATE(DATE_ADD(?,INTERVAL 1 YEAR)), "Seguro", NULL, NULL, NULL, NULL, NULL, ?, NULL, NULL);', [venci, idseguro], async function (err, result, fields) {
                  if (err) throw err;
                  //con eso se inserta la fecha de la proxima compra/renovacion de
                  //update a seguros para almacenarr la fk que vincula a fecha
                  await pool.query('UPDATE `seguros` SET `FK_Fecha_Vencimiento` = ? WHERE `seguros`.`ID_Seguro` = ?', [result.insertId, idseguro], async function (err, result, fields) {
                    if (err) throw err;
                    //solo faltaria actualizar la tabla principal de vehiculo para que rediriga a seguros
                    //Despues implementare trigers
                    await pool.query("UPDATE vehiculo SET FK_Seguro = ? WHERE ID_Vehiculo  = ?", [idseguro, id], async function (err, results, filds) {
                      if (err) throw err;
                    });

                  });

                });
              });
            } else {
              await pool.query('UPDATE seguros SET ProvedorSeguro = ?, NoPoliza = ? WHERE ID_Seguro = ?', [provedorname, Nopol, idseg], async function (err, results, fields) {
                if (err) throw err;
                await pool.query("UPDATE fecha SET Fecha = ? WHERE FK_Seguro = ?", [venci, idseg], async function (err, results, filds) {
                  if (err) throw err;
                  console.log("End updte Seguro")
                });
              });
            }


            break;
          case "Verificacion":
            let idverificacion = req.body.propetyid[i];
            let UltimaVer = req.body.propety1[i];
            let proxVer = req.body.propety2[i]

            if (idverificacion == -1) {
              await pool.query('INSERT INTO `verificacion` (`ID_Verificacion`, `UltimaVerificacion`, `FK_Fecha_ProximoPago`, `FK_ID_Vehiculo`) VALUES (NULL, ?, NULL, ?)', [UltimaVer, id], async function (err, result, fields) {
                if (err) throw err;
                let idveri = result.insertId;
                //insertamso la fecha de la proxima verificacion esta es automatica cada 6 meses por que los vehiculos cuentan con logos de empresas, AGREGAREMOS meses a la ultima fecha para generar el evento
                await pool.query('INSERT INTO `fecha` (`ID_Fecha`, `Fecha`, `Asunto`, `FK_Ingreso`, `FK_Contrato`, `FK_Equipo`, `FK_Licencia`, `FK_Seguro`, `FK_Tenencia`, `Fk_Verificacion`) VALUES (NULL, DATE(DATE_ADD(?,INTERVAL 6 MONTH)), "Verificacion", NULL, NULL, NULL, NULL, NULL, NULL, ?);', [UltimaVer, result.insertId], async function (err, result, fields) {
                  if (err) throw err;
                  //podemos actualizar la tabla verificacion para aniadir como FK el id de fecha para la relacion
                  await pool.query('UPDATE `verificacion` SET `FK_Fecha_ProximoPago` = ? WHERE `verificacion`.`ID_Verificacion` = ?;', [result.insertId, idveri], async function (err, result, fields) {
                    if (err) throw err;

                    console.log("update verificaci")
                    await pool.query('UPDATE `vehiculo` SET `FK_Verificacion` = ? WHERE `vehiculo`.`ID_Vehiculo` = ?;', [idveri, id], async function (err, result, fields) {
                      if (err) throw err;
                      console.log("Fin Verificacion");
                    })
                  });
                });

              });
            } else {
              await pool.query('UPDATE verificacion SET UltimaVerificacion = ? WHERE ID_Verificacion = ?', [UltimaVer, idverificacion], async function (err, results, fields) {
                if (err) throw err;
                await pool.query("UPDATE fecha SET Fecha = ? WHERE Fk_Verificacion = ?", [proxVer, idverificacion], async function (err, results, filds) {
                  if (err) throw err;
                  console.log("End updte verifiacion")
                });
              });
            }


            break;


        }
      }



    });

    //Proceso similar al de usuario!!!






  }
  //Se ejecuta la query para eliminar un  vehiculopor su id
  public async delete(req: Request, res: Response): Promise<any> {
    const { id } = req.params;
    //Consulta para eleiminar al usuairo
    await pool.query('DELETE FROM vehiculo WHERE ID_Vehiculo = ?', [id], function (err, result, fields) {
      if (err) throw err;
      if (result.affectedRows == 1) {
        console.log("El vehiculo fue eliminado")
        res.json({ message: 'El Vehiculo fue eliminado' });
      }
      else {
        console.log('Vehiculo no encontrado')
        res.status(404).json({ message: 'vehiculo no encontrado' });
      }
    });
  }

  //Se ejecuta la query que verifica si ya existe el personales
  public async isExistVehiculo(req: Request, res: Response): Promise<any> {
    await pool.query('SELECT * FROM vehiculo where Placas=?', [req.body.Placas], function (err, result, fields) {
      if (err) throw err;
      if (result.length > 0) {
        return res.json({ message: 'Existe' });
      }
      return res.json({ message: 'No existe' });
    });
  }

  public async isUpdateVehiculo(req: Request, res: Response): Promise<any> {
    await pool.query('SELECT * FROM `vehiculo` WHERE Placas=? and ID_Vehiculo!=?;', [req.body.Placas, req.body.id], function (err, result, fields) {
      if (err) throw err;
      if (result.length > 0) {
        return res.json({ message: 'Existe' });
      }
      return res.json({ message: 'No existe' });
    });
  }

}
export const vehiculoController = new VehiculoController();

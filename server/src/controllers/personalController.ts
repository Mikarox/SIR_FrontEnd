import { Request, Response } from 'express';
import pool from '../database';

//Se definen lo que realizarán las peticiones
class PersonalController {
  //Se ejecuta la query para listar todos los personales
  public async list(req: Request, res: Response): Promise<void> {
    await pool.query('SELECT * FROM `personal`  LEFT JOIN birthday on FK_Birthday=birthday.ID_Birthday ', function (err, result, fields) {
      if (err) throw err;
      if (result.length > 0) {
        return res.json(result);
      }
      res.status(404).json({ message: 'No existe personal registrado' });
    });
  }
  //Se ejecuta la query para mostrar un personal por su id
  public async getOne(req: Request, res: Response): Promise<any> {
    const { id } = req.params;
    //SELECT * FROM `personal`  LEFT JOIN birthday on FK_Birthday=birthday.ID_Birthday LEFT JOIN vacaciones on FK_ID_Vacaciones=vacaciones.ID_Vacaciones LEFT JOIN ;

    await pool.query('Update vacaciones SET Antiguedad_days = (TIMESTAMPDIFF(DAY,(SELECT Fecha from fecha WHERE FK_Ingreso = ?),CURDATE())), Antiguedad_months = (TIMESTAMPDIFF(MONTH,(SELECT Fecha from fecha WHERE FK_Ingreso = ?),CURDATE())), Antiguedad_years =(TIMESTAMPDIFF(YEAR,(SELECT Fecha from fecha WHERE FK_Ingreso = ?),CURDATE())) WHERE FK_Personal = ?', [id, id, id, id], async function (err, result, fields) {
      await pool.query(`SELECT P.ID_Personal, P.Nombres, P.A_paterno, P.A_materno, b.Fecha as birthday, P.FK_Birthday, P.FK_ID_Vacaciones, P.FK_ID_Contrato, P.FK_Fecha_Ingreso, FP.Fecha as Ingreso , FP.Asunto as FPasunto , C.type as CType, C.cantidad, FC.Fecha as FechaContratoEND, FC.Asunto as FCAsunto, V.SalarioDiario as Salario, V.Antiguedad_days, V.Antiguedad_months, V.Antiguedad_years, GROUP_CONCAT(e.ID_Equipo SEPARATOR ';') AS EqID, GROUP_CONCAT(e.Nombre SEPARATOR ';') AS EqNom, GROUP_CONCAT(E.Detalles SEPARATOR ';') AS EqDetalles, GROUP_CONCAT(E.FechaEntrega SEPARATOR ';') AS LastDelivery, GROUP_CONCAT(FE.Fecha SEPARATOR ';') as ProxFecha, GROUP_CONCAT(DISTINCT IFNULL(AA.ID_acta ,null) SEPARATOR ';') AS AAId, GROUP_CONCAT(DISTINCT IFNULL(AA.Motivo,null) SEPARATOR ';') AS AAMotivo, GROUP_CONCAT(DISTINCT IFNULL(AA.Detalles,NULL) SEPARATOR ';') AS AADetalles, GROUP_CONCAT(DISTINCT IfNULL(AA.Fecha,NULL) SEPARATOR ';') AS AAFecha  FROM personal P
    LEFT JOIN fecha AS FP ON FP.ID_Fecha=P.FK_Fecha_Ingreso
    LEFT JOIN birthday as B ON B.ID_Birthday=P.FK_Birthday
    LEFT JOIN contrato as C ON C.ID_Contrato=P.FK_ID_Contrato
    LEFT JOIN fecha AS FC ON Fc.ID_Fecha=C.FK_Fecha_Concluir
    LEFt JOIN vacaciones as V ON V.ID_Vacaciones=P.FK_ID_Vacaciones
    LEFT JOIN equipo as E ON P.ID_Personal=e.FK_ID_Personal
    LEFT JOIN fecha AS FE ON FE.FK_Equipo=E.ID_Equipo
    LEFT JOIN actasadministrativas AS AA ON AA.FK_Personal=P.ID_Personal
 WHERE P.ID_Personal=?;`, [id], function (err, result, fields) {
        if (err) throw err;
        if (result.length > 0) {
          return res.json(result[0]);
        }
        res.status(404).json({ message: 'personal no encontrado' });
      });
    })
  }
  //Se ejecuta la query para registrar un personale
  public async register(req: Request, res: Response): Promise<void> {

    var fecha: any, id: any;
    console.log(req.body)

    try {
      pool.query('INSERT INTO personal (`ID_Personal`, `Nombres`, `A_paterno`, `A_materno`, `FK_ID_Vacaciones`, `FK_ID_Contrato`, `FK_Fecha_Ingreso`, `FK_Birthday`) VALUES (NULL, ?, ?, ?, NULL, NULL, NULL, NULL);', [req.body.Nombres, req.body.A_paterno, req.body.A_materno], async function (err, result, fields) {
        if (err) throw err;
        id = result.insertId;
        await pool.query('INSERT INTO `birthday` (`ID_Birthday`, `Fecha`, `FK_User`, `FK_Personal`) VALUES (NULL,?,NULL, ?) ', [req.body.birthday, id], async function (err, result, fields) {
          if (err) throw err;
          fecha = req.body.propety3[req.body.type.indexOf('Ingreso')];
          await pool.query('UPDATE `personal` SET `FK_Birthday` = ? WHERE `personal`.`ID_Personal` = ?;', [result.insertId, id], async function (err, result, fields) {
            if (err) throw err;
            await pool.query("INSERT INTO `fecha` (`ID_Fecha`, `Fecha`, `Asunto`, `FK_Ingreso`,  `FK_Contrato`, `FK_Equipo`, `FK_Licencia`, `FK_Seguro`, `FK_Tenencia`, `Fk_Verificacion`)  VALUES (NULL, ?, 'Ingreso', ?,  NULL, NULL, NULL, NULL, NULL, NULL);", [fecha, id], async function (err, result, fields) {
              if (err) throw err;
              await pool.query("UPDATE `personal` SET `FK_Fecha_Ingreso` =  ? WHERE `personal`.`ID_Personal` = ? ", [result.insertId, id], async function (err, result, fields) {
                if (err) throw err;
                if (req.body.type.length > 1) {
                  for (var i = 0; i < req.body.type.length; i++) {
                    switch (req.body.type[i]) {
                      case "Contrato":
                        console.log("contrato i:");
                        console.log(i)
                        let auxcant = req.body.propety1[i];
                        switch (req.body.propety2[i]) {
                          case '0':
                            await pool.query("INSERT INTO `fecha` (`ID_Fecha`, `Fecha`, `Asunto`, `FK_Ingreso`, `FK_Contrato`, `FK_Equipo`, `FK_Licencia`, `FK_Seguro`, `FK_Tenencia`, `Fk_Verificacion`)  VALUES (NULL, DATE(DATE_ADD(?, INTERVAL ? MONTH)), 'Contrato', NULL, NULL, NULL, NULL, NULL, NULL, NULL);", [fecha, req.body.propety1[i]], async function (err, result, fields) {
                              if (err) throw err;
                              let idfecha = result.insertId;
                              await pool.query('INSERT INTO `contrato` (`ID_Contrato`, `type`, `cantidad`, `FK_Fecha_Concluir`, `FK_ID_Personal`) VALUES (NULL, 0 , ?, ?, ?)', [auxcant, result.insertId, id], async function (err, result, fields) {
                                if (err) throw err;
                                let auxfkcontrato = result.insertId;
                                await pool.query('UPDATE `personal` SET `FK_ID_Contrato` = ? WHERE `personal`.`ID_Personal` = ?;', [result.insertId, id], async function (err, result, fields) {
                                  if (err) throw err;
                                  console.log("Update Contrato Months")
                                  await pool.query('UPDATE `fecha` SET `FK_Contrato` = ? WHERE `fecha`.`ID_Fecha` = ?;', [auxfkcontrato, idfecha], async function (err, result, fields) {
                                    if (err) throw err;
                                    console.log('Update fecha fk contrato!')


                                  });
                                });

                              });

                            });
                            break;
                          case '1':
                            await pool.query("INSERT INTO `fecha` (`ID_Fecha`, `Fecha`, `Asunto`, `FK_Ingreso`, `FK_Contrato`, `FK_Equipo`, `FK_Licencia`, `FK_Seguro`, `FK_Tenencia`, `Fk_Verificacion`) VALUES (NULL, DATE(DATE_ADD(?, INTERVAL ? YEAR)), 'Contrato', NULL, NULL, NULL,  NULL, NULL, NULL, NULL);", [fecha, req.body.propety1[i]], async function (err, result, fields) {
                              if (err) throw err;
                              let idfecha = result.insertId;
                              await pool.query('INSERT INTO `contrato` (`ID_Contrato`, `type`, `cantidad`, `FK_Fecha_Concluir`, `FK_ID_Personal`) VALUES (NULL, 1 , ?, ?, ?)', [auxcant, result.insertId, id], async function (err, result, fields) {
                                if (err) throw err;
                                let auxfkcontrato = result.insertId;
                                await pool.query('UPDATE personal SET FK_ID_Contrato = ? WHERE personal.ID_Personal = ?', [result.insertId, id], async function (err, result, fields) {
                                  if (err) throw err;
                                  console.log('Update Contrato Years!')
                                  await pool.query('UPDATE `fecha` SET `FK_Contrato` = ? WHERE `fecha`.`ID_Fecha` = ?;', [auxfkcontrato, idfecha], async function (err, result, fields) {
                                    if (err) throw err;
                                    console.log('Update fecha fk contrato!')


                                  });

                                });

                              });

                            });
                            break;
                          case '2':
                            await pool.query("INSERT INTO `fecha` (`ID_Fecha`, `Fecha`, `Asunto`, `FK_Ingreso`,  `FK_Contrato`, `FK_Equipo`, `FK_Licencia`, `FK_Seguro`, `FK_Tenencia`, `Fk_Verificacion`) VALUES (NULL, NULL, 'Contrato', NULL,  NULL, NULL, NULL, NULL, NULL, NULL);", async function (err, result, fields) {
                              if (err) throw err;
                              let idfecha = result.insertId;
                              await pool.query('INSERT INTO `contrato` (`ID_Contrato`, `type`, `cantidad`, `FK_Fecha_Concluir`, `FK_ID_Personal`) VALUES (NULL, 2 , ?, ?, ?)', [req.body.propety1[i], result.insertId, id], async function (err, result, fields) {
                                if (err) throw err;
                                let auxfkcontrato = result.insertId;
                                await pool.query('UPDATE personal SET FK_ID_Contrato = ? WHERE personal.ID_Personal = ?', [result.insertId, id], async function (err, result, fields) {
                                  if (err) throw err;
                                  console.log('Update Contrato Indefinidp')
                                  await pool.query('UPDATE `fecha` SET `FK_Contrato` = ? WHERE `fecha`.`ID_Fecha` = ?;', [auxfkcontrato, idfecha], async function (err, result, fields) {
                                    if (err) throw err;
                                    console.log('Update fecha fk contrato!')


                                  });

                                });

                              });
                            });
                            break;
                        }//end switch type contrat
                        break;//en case type contrato
                      case "Salario":
                        console.log("salario i:");
                        console.log(i);
                        await pool.query('INSERT INTO `vacaciones` (`ID_Vacaciones`, `SalarioDiario`,  `Antiguedad_days`, `Antiguedad_months`, `Antiguedad_years`, `FK_Personal`) VALUES (NULL, ? , TIMESTAMPDIFF(DAY,?,CURDATE()), TIMESTAMPDIFF(MONTH,?,CURDATE()), TIMESTAMPDIFF(YEAR,?,CURDATE()) , ?);', [req.body.propety1[i], fecha, fecha, fecha, id], async function (err, result, fields) {
                          if (err) throw err;
                          await pool.query('UPDATE `personal` SET `FK_ID_Vacaciones` = ? WHERE `personal`.`ID_Personal` = ?;', [result.insertId, id], async function (err, result, fields) {
                            if (err) throw err;

                          });
                        });
                        break;
                      case "Equipamiento":
                        console.log("Equipamiento i:");
                        console.log(i);

                        await pool.query('INSERT INTO `equipo` (`ID_Equipo`, `FK_Fecha_Siguiente`, `FK_ID_Personal`, `Nombre`, `Detalles`, `FechaEntrega`) VALUES (NULL, NULL, ?, ?, ?, ?);', [id, req.body.propety1[i], req.body.propety2[i], req.body.propety3[i]], async function (err, result, fields) {
                          if (err) throw err;
                          let equipaaux = result.insertId;
                          await pool.query('INSERT INTO `fecha` (`ID_Fecha`, `Fecha`, `Asunto`, `FK_Ingreso`, `FK_Contrato`, `FK_Equipo`, `FK_Licencia`, `FK_Seguro`, `FK_Tenencia`, `Fk_Verificacion`) VALUES (NULL, DATE(DATE_ADD((SELECT FechaEntrega FROM `equipo` WHERE ID_Equipo = ?), INTERVAL 8 MONTH)), "Equipamiento", NULL,  NULL, ?, NULL, NULL, NULL, NULL);', [result.insertId, result.insertId], async function (err, result, fields) {
                            if (err) throw err;
                            await pool.query('UPDATE `equipo` SET `FK_Fecha_Siguiente` = ? WHERE `equipo`.`ID_Equipo` = ?;', [result.insertId, equipaaux], async function (err, result, fields) {
                              if (err) throw err;

                            });

                          });

                        });
                        break;
                      default:
                        console.log("No aplica:" + req.body.type[i]);
                        break;

                    }//end switch contrato equipo salario

                  }//end for


                } else {
                  console.log('solo ingreso');
                }


              });


            });



          });


        });
      });
    } catch (error) {
      console.log("Valio vrga todo");
    }


    res.json({ message: 'personal registrado' });

  }
  //Se ejecuta la query para actualizar un personal por su id
  public async update(req: Request, res: Response): Promise<any> {
    const { id } = req.params;

    await pool.query('SELECT * FROM personal WHERE ID_Personal=?', [id], async function (err, result, fields) {
      if (err) throw err;
      if (result[0]) { //Si existe el personal
        //Se ejecuta la query para actualizar al personal
        await pool.query('UPDATE personal SET Nombres=?, A_paterno=?, A_materno=? WHERE ID_Personal=? ', [req.body.Nombres, req.body.A_paterno, req.body.A_materno, id], async function (err, result, fields) {
          if (err) throw err;
          if (result.affectedRows == 1) {

            if (req.body.type.indexOf('Ingreso') == -1) {
              await pool.query('DELETE FROM fecha WHERE FK_ID_Personal = ?', [id], async function (err, results, fields) {
                if (err) throw err;
                console.log('adios ingreso fecha')
              });
            }

            if (req.body.type.indexOf('Contrato') == -1) {
              await pool.query('DELETE FROM contrato WHERE FK_ID_Personal=?', [id], async function (err, results, fields) {
                if (err) throw err;
                console.log('adios contrato')
              });
            }

            if (req.body.type.indexOf('Salario') == -1) {
              await pool.query('DELETE FROM vacaciones WHERE FK_Personal=?', [id], async function (err, results, fields) {
                if (err) throw err;
                console.log('adios salario')
              });
            }

            //cartas administrativas editar
            // await pool.query('SELECT * FROM equipo WHERE FK_ID_Personal = ?', [id], async function (err, result, fields){

            //   if (result.length > 0) {
            //     await pool.query("SELECT GROUP_CONCAT(ID_Equipo SEPARATOR ';') as IDequipo FROM equipo WHERE FK_ID_Personal = ?", [id], async function (err, result, fields) {
            //       if (err) throw err;
            //       var ids = result[0].IDequipo.split(';')
            //       var eqsid: any = [];
            //       var posid: any = [];

            //       for (let i = 0; i < req.body.type.length; i++) {
            //         if (req.body.type[i] == 'Equipamiento') {
            //           eqsid.push(req.body.propetyid[i]);
            //           posid.push(i);
            //         }
            //       }

            //       var difference = ids.filter((x: any) => eqsid.indexOf(x) === -1);
            //       console.log("Diferencias:" + difference);
            //       for (let i = 0; i < difference.length; i++) {
            //         // await pool.query('DELETE FROM equipo WHERE ID_Equipo =?', [i], async function (err, results, fields) {
            //         await pool.query('SELECT * FROM equipo WHERE ID_Equipo =?', [difference[i]], async function (err, results, fields) {
            //           if (err) throw err;
            //         });
            //       }
            //     });
            //   }

            // });

            await pool.query('SELECT * FROM equipo WHERE FK_ID_Personal = ?', [id], async function (err, result, fields) {
              if (err) throw err;
              console.log(result.length);
              if (result.length > 0) {
                await pool.query("SELECT GROUP_CONCAT(ID_Equipo SEPARATOR ';') as IDequipo FROM equipo WHERE FK_ID_Personal = ?", [id], async function (err, result, fields) {
                  if (err) throw err;
                  var ids = result[0].IDequipo.split(';')
                  var eqsid: any = [];
                  var posid: any = [];

                  for (let i = 0; i < req.body.type.length; i++) {
                    if (req.body.type[i] == 'Equipamiento') {
                      eqsid.push(req.body.propetyid[i]);
                      posid.push(i);
                    }
                  }

                  var difference = ids.filter((x: any) => eqsid.indexOf(x) === -1);
                  console.log("Diferencias:" + difference);
                  for (let i = 0; i < difference.length; i++) {
                    // await pool.query('DELETE FROM equipo WHERE ID_Equipo =?', [i], async function (err, results, fields) {
                    await pool.query('SELECT * FROM equipo WHERE ID_Equipo =?', [difference[i]], async function (err, results, fields) {
                      if (err) throw err;
                    });
                  }
                });
              }

            });


            //updates info
            for (let i = 0; i < req.body.propety1.length; i++) {
              switch (req.body.type[i]) {
                case 'Equipamiento':
                  console.log("Equipamiento: ", req.body.type[i])
                  let eqnom = req.body.propety1[i];
                  let eqdetalles = req.body.propety2[i];
                  let eqlaste = req.body.propety3[i];
                  let eqid = req.body.propetyid[i];

                  if (eqid == '-1') {
                    await pool.query('INSERT INTO `equipo` (`ID_Equipo`, `FK_Fecha_Siguiente`, `FK_ID_Personal`, `Nombre`, `Detalles`, `FechaEntrega`) VALUES (NULL, NULL, ?, ?, ?, ?);', [id, req.body.propety1[i], req.body.propety2[i], req.body.propety3[i]], async function (err, result, fields) {
                      if (err) throw err;
                      let equipaaux = result.insertId;
                      await pool.query('INSERT INTO `fecha` (`ID_Fecha`, `Fecha`, `Asunto`, `FK_Ingreso`, `FK_Contrato`, `FK_Equipo`, `FK_Licencia`, `FK_Seguro`, `FK_Tenencia`, `Fk_Verificacion`) VALUES (NULL, DATE(DATE_ADD((SELECT FechaEntrega FROM `equipo` WHERE ID_Equipo = ?), INTERVAL 8 MONTH)), "Equipamiento", NULL,  NULL, ?, NULL, NULL, NULL, NULL);', [result.insertId, result.insertId], async function (err, result, fields) {
                        if (err) throw err;
                        await pool.query('UPDATE `equipo` SET `FK_Fecha_Siguiente` = ? WHERE `equipo`.`ID_Equipo` = ?;', [result.insertId, equipaaux], async function (err, result, fields) {
                          if (err) throw err;
                        });

                      });

                    });
                  } else { //actualizamos

                    await pool.query('UPDATE equipo SET Nombre = "' + eqnom + '",  Detalles = "' + eqdetalles + '", FechaEntrega = "' + eqlaste + '" WHERE ID_Equipo = ' + eqid + ' ;', async function (err, result, fields) {
                      if (err) throw err;
                      pool.query('UPDATE fecha SET Fecha = DATE(DATE_ADD((SELECT FechaEntrega FROM `equipo` WHERE ID_Equipo = ?), INTERVAL 8 MONTH)) WHERE FK_Equipo = ? ', [eqid, eqid], async function (err, result, fields) {
                        if (err) throw err;
                      });
                    });
                  }


                  break;
                case 'Contrato':
                  console.log("Contrato: ", req.body.type[i])
                  let type = req.body.propety2[i];
                  let cantidad = parseInt(req.body.propety1[i]);

                  let idcontrato = req.body.propetyid[i];
                  let fechaingre = req.body.propety3[req.body.type.indexOf('Ingreso')];

                  if (idcontrato == "-1") {
                    switch (type) {
                      case '0':
                        await pool.query("INSERT INTO `fecha` (`ID_Fecha`, `Fecha`, `Asunto`, `FK_Ingreso`, `FK_Contrato`, `FK_Equipo`, `FK_Licencia`, `FK_Seguro`, `FK_Tenencia`, `Fk_Verificacion`)  VALUES (NULL, DATE(DATE_ADD(?, INTERVAL ? MONTH)), 'Contrato', NULL, NULL, NULL, NULL, NULL, NULL, NULL);", [fechaingre, cantidad], async function (err, result, fields) {
                          if (err) throw err;
                          let idfecha = result.insertId;
                          await pool.query('INSERT INTO `contrato` (`ID_Contrato`, `type`, `cantidad`, `FK_Fecha_Concluir`, `FK_ID_Personal`) VALUES (NULL, 0 , ?, ?, ?)', [cantidad, result.insertId, id], async function (err, result, fields) {
                            if (err) throw err;
                            let auxfkcontrato = result.insertId;
                            await pool.query('UPDATE `personal` SET `FK_ID_Contrato` = ? WHERE `personal`.`ID_Personal` = ?;', [result.insertId, id], async function (err, result, fields) {
                              if (err) throw err;
                              console.log("Update Contrato Months")
                              await pool.query('UPDATE `fecha` SET `FK_Contrato` = ? WHERE `fecha`.`ID_Fecha` = ?;', [auxfkcontrato, idfecha], async function (err, result, fields) {
                                if (err) throw err;
                                console.log('Update fecha fk contrato!')
                              });
                            });
                          });
                        });
                        break;
                      case '1':
                        await pool.query("INSERT INTO `fecha` (`ID_Fecha`, `Fecha`, `Asunto`, `FK_Ingreso`, `FK_Contrato`, `FK_Equipo`, `FK_Licencia`, `FK_Seguro`, `FK_Tenencia`, `Fk_Verificacion`) VALUES (NULL, DATE(DATE_ADD(?, INTERVAL ? YEAR)), 'Contrato', NULL, NULL, NULL,  NULL, NULL, NULL, NULL);", [fechaingre, req.body.propety1[i]], async function (err, result, fields) {
                          if (err) throw err;
                          let idfecha = result.insertId;
                          await pool.query('INSERT INTO `contrato` (`ID_Contrato`, `type`, `cantidad`, `FK_Fecha_Concluir`, `FK_ID_Personal`) VALUES (NULL, 1 , ?, ?, ?)', [cantidad, result.insertId, id], async function (err, result, fields) {
                            if (err) throw err;
                            let auxfkcontrato = result.insertId;
                            await pool.query('UPDATE personal SET FK_ID_Contrato = ? WHERE personal.ID_Personal = ?', [result.insertId, id], async function (err, result, fields) {
                              if (err) throw err;
                              console.log('Update Contrato Years!')
                              await pool.query('UPDATE `fecha` SET `FK_Contrato` = ? WHERE `fecha`.`ID_Fecha` = ?;', [auxfkcontrato, idfecha], async function (err, result, fields) {
                                if (err) throw err;
                                console.log('Update fecha fk contrato!')
                              });
                            });
                          });
                        });
                        break;
                      case '2':
                        await pool.query("INSERT INTO `fecha` (`ID_Fecha`, `Fecha`, `Asunto`, `FK_Ingreso`,  `FK_Contrato`, `FK_Equipo`, `FK_Licencia`, `FK_Seguro`, `FK_Tenencia`, `Fk_Verificacion`) VALUES (NULL, NULL, 'Contrato', NULL,  NULL, NULL, NULL, NULL, NULL, NULL);", async function (err, result, fields) {
                          if (err) throw err;
                          let idfecha = result.insertId;
                          await pool.query('INSERT INTO `contrato` (`ID_Contrato`, `type`, `cantidad`, `FK_Fecha_Concluir`, `FK_ID_Personal`) VALUES (NULL, 2 , 0, ?, ?)', [ result.insertId, id], async function (err, result, fields) {
                            if (err) throw err;
                            let auxfkcontrato = result.insertId;
                            await pool.query('UPDATE personal SET FK_ID_Contrato = ? WHERE personal.ID_Personal = ?', [result.insertId, id], async function (err, result, fields) {
                              if (err) throw err;
                              console.log('Update Contrato Indefinidp')
                              await pool.query('UPDATE `fecha` SET `FK_Contrato` = ? WHERE `fecha`.`ID_Fecha` = ?;', [auxfkcontrato, idfecha], async function (err, result, fields) {
                                if (err) throw err;
                                console.log('Update fecha fk contrato!')
                              });
                            });
                          });
                        });
                        break;
                    }//end switch type contrat
                  } else {
                    await pool.query('UPDATE contrato SET `type` = ?, `cantidad` = ? WHERE `contrato`.`FK_ID_Personal` = ?;', [type, cantidad, id], async function (err, result, fields) {
                      if (err) throw err;
                      switch (type) {
                        case 0:
                          await pool.query('UPDATE fecha SET Fecha = DATE(DATE_ADD(?, INTERVAL ? MONTH)) WHERE FK_Contrato = ? ;', [fechaingre, cantidad, idcontrato], async function (err, result, fields) {
                            if (err) throw err;
                          });
                          break;
                        case 1:
                          await pool.query('UPDATE fecha SET Fecha = DATE(DATE_ADD(?, INTERVAL ? YEAR)) WHERE FK_Contrato = ? ;', [fechaingre, cantidad, idcontrato], async function (err, result, fields) {
                            if (err) throw err;
                          });
                          break;
                        case 2:
                          await pool.query('UPDATE fecha SET Fecha = "" WHERE FK_Contrato = ?; ', [idcontrato], async function (err, result, fields) {
                            if (err) throw err;
                          });
                          break;
                      }
                    });
                  }
                  break;
                case 'Ingreso':
                  console.log("Ingreso: ", req.body.type[i])
                  let ingresoid = req.body.propetyid[i];
                  let fechingr = req.body.propety3[i];


                  if (ingresoid == '-1') {
                    await pool.query("INSERT INTO `fecha` (`ID_Fecha`, `Fecha`, `Asunto`, `FK_Ingreso`,  `FK_Contrato`, `FK_Equipo`, `FK_Licencia`, `FK_Seguro`, `FK_Tenencia`, `Fk_Verificacion`)  VALUES (NULL, ?, 'Ingreso', ?,  NULL, NULL, NULL, NULL, NULL, NULL);", [fechingr, id], async function (err, result, fields) {
                      if (err) throw err;
                      await pool.query('UPDATE personal SET FK_Fecha_Ingreso = ? WHERE ID_Personal  = ?;', [result.insertId, id], async function (err, result, fields) {
                        if (err) throw err;

                      });

                    });

                  } else {
                    await pool.query('UPDATE fecha SET `Fecha` = ? WHERE FK_Ingreso = ?;', [fechingr, id], async function (err, result, fields) {
                      if (err) throw err;
                    });
                  }



                  break;
                case 'ActaAdministrativa':
                  console.log("Acta administrativa: ", req.body.type[i])

                  if (req.body.propetyid[i] == '-1') {
                    await pool.query('INSERT INTO `actasadministrativas` (`Id_Acta`, `Motivo`, `Detalles`, `Fecha`, `FK_Personal`) VALUES (NULL, ?, ?, ?, ?)', [req.body.propety1[i], req.body.propety2[i], req.body.propety3[i], id], async function (err, result, fields) {
                      if (err) throw err;
                    });
                  } else { //actualizamos
                    await pool.query('UPDATE actasadministrativas SET Motivo = "' + req.body.propety1[i] + '",  Detalles = "' + req.body.propety2[i] + '", Fecha = "' + req.body.propety3[i] + '" WHERE Id_Acta = ' + req.body.propetyid[i] + ' ;', async function (err, result, fields) {
                      if (err) throw err;
                    });
                  }

                  break;
                case 'Salario':
                  await pool.query('UPDATE vacaciones SET SalarioDiario = ? WHERE FK_Personal = ?;', [req.body.propety1[i], id], async function (err, result, fields) {
                    if (err) throw err;
                  })

                  break;

              }
            }
            //final delate cartas y equipos

            //DELETE from equipo where ID_Equipo != 22 and ID_Equipo!=23 and FK_ID_Personal=13;

          } else {
            console.log('no update');
          }
        });

      }
    });

    res.json({ message: 'personal actualizado' });
  }

  //Se ejecuta la query para eliminar un personal por su id
  public async delete(req: Request, res: Response): Promise<any> {
    const { id } = req.params;
    //Consulta para eleiminar al usuairo
    await pool.query('DELETE FROM personal WHERE ID_Personal = ?', [id], function (err, result, fields) {
      if (err) throw err;
      if (result.affectedRows == 1) {
        res.json({ message: 'El personal fue eliminado' });
      }
      else {
        res.status(404).json({ message: 'personal no encontrado' });
      }
    });
  }

  //Se ejecuta la query que verifica si ya existe el personales
  public async isExistPersonal(req: Request, res: Response): Promise<any> {
    await pool.query('SELECT * FROM `personal` where Nombres=? AND A_paterno = ? AND A_materno=?', [req.body.Nombres, req.body.A_paterno, req.body.A_materno], function (err, result, fields) {
      if (err) throw err;
      if (result.length > 0) {
        return res.json({ message: 'Existe' });
      }
      return res.json({ message: 'No existe' });
    });
  }

  public async isUpdatePersonal(req: Request, res: Response): Promise<any> {
    await pool.query('SELECT * FROM `personal` where Nombres=? AND A_paterno = ? AND A_materno=? AND ID_Personal!=?', [req.body.Nombres, req.body.A_paterno, req.body.A_materno, req.body.ID_Personal], function (err, result, fields) {
      if (err) throw err;
      if (result.length > 0) {
        return res.json({ message: 'Existe' });
      }
      return res.json({ message: 'No existe' });
    });
  }
}
export const personalController = new PersonalController();

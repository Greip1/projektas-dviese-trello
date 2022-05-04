const mysql = require('mysql2/promise');

const express = require('express');
const { dbConfig } = require('../config');

const prescripRoutes = express.Router();

// ------------------------------------------------------------
// -------------------------------------POST prescription into table
prescripRoutes.post('/prescriptions/row', async (req, res) => {
  let connection;
  try {
    const { medication_id, pet_id, comment } = req.body;
    connection = await mysql.createConnection(dbConfig);
    console.log('Prisijungem');
    const sql = `INSERT INTO  prescriptions  ( medication_id, pet_id, comment ) VALUES (?, ?, ?)`;

    const [newprescriptionsObj] = await connection.execute(sql, [
      medication_id,
      pet_id,
      comment,
    ]);
    // console.log('connected', connection);
    res.json(newprescriptionsObj);
  } catch (error) {
    console.log('error in prescriptions route', error);
    res.status(500).json('stmh wrong');
  } finally {
    await connection?.end();
    console.log('connection closed');
  }
});

// ------------------------------------- post table
prescripRoutes.post('/prescriptions/table', async (req, res) => {
  let connection;
  try {
    connection = await mysql.createConnection(dbConfig);
    console.log('Prisijungem');
    const sql =
      'CREATE TABLE slscom_vetbee7.prescriptions  (  id  INT NOT NULL AUTO_INCREMENT ,  medication_id  INT NOT NULL ,  pet_id  INT NOT NULL , comment  TEXT NOT NULL ,  timestamp   TIMESTAMP NOT NULL , PRIMARY KEY ( id )) ENGINE = InnoDB';
    const [result] = await connection.query(sql);
    // console.log('connected', connection);
    res.json(result);
  } catch (error) {
    console.log('error in prescriptions route', error);
    res.status(500).json('stmh wrong');
  } finally {
    await connection?.end();
    console.log('connection closed');
  }
});
// -------------------------------------------GET posted table
prescripRoutes.get('/prescriptions', async (req, res) => {
  let connection;
  try {
    connection = await mysql.createConnection(dbConfig);
    console.log('connected');
    const sql = 'SELECT * FROM prescriptions';
    const [result] = await connection.query(sql);
    res.json(result);
  } catch (error) {
    console.log('error in prescriptions route', error);
    res.status(500).json('stmh wrong');
  } finally {
    await connection?.end();
  }
});

// ##############################################################################
// jungiam tris lenteles
// SELECT yr,COUNT(title) FROM
//   movie JOIN casting ON movie.id=movieid
//         JOIN actor   ON actorid=actor.id

prescripRoutes.get('/prescr-pet-med', async (req, res) => {
  let connection;
  try {
    connection = await mysql.createConnection(dbConfig);
    console.log('connected');
    const sql =
      'SELECT * FROM `prescriptions`  JOIN `pets` ON prescriptions.pet_id = pets.id  JOIN medications ON prescriptions.medication_id =medications.id GROUP BY pets.name';
    const [result] = await connection.query(sql);
    res.json(result);
  } catch (error) {
    console.log('error in pets route', error);
    res.status(500).json('stmh wrong');
  } finally {
    await connection?.end();
  }
});

module.exports = prescripRoutes;

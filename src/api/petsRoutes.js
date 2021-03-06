const mysql = require('mysql2/promise');

const express = require('express');
const { dbConfig } = require('../config');

const petsRoutes = express.Router();
// --------------------------------------/pets-log
petsRoutes.get('/pets-log', async (req, res) => {
  let connection;
  try {
    connection = await mysql.createConnection(dbConfig);
    console.log('connected');
    const sql =
      'SELECT * FROM `pets` LEFT JOIN `logs` on pets.id = logs.pet_id GROUP BY pets.name;';
    const [result] = await connection.query(sql);
    res.json(result);
  } catch (error) {
    console.log('error in pets route', error);
    res.status(500).json('stmh wrong');
  } finally {
    await connection?.end();
  }
});

// ------------------------------------------------------------
// ------------------------------------------------------------
// -------------------------------------POST pet into table
petsRoutes.post('/pets/row', async (req, res) => {
  let connection;
  try {
    const { name, dod, client_email } = req.body;
    connection = await mysql.createConnection(dbConfig);
    console.log('Prisijungem');
    const sql = `INSERT INTO  pets  ( name ,  dod ,  client_email ) VALUES (?, ?, ?)`;

    const [newPetsObj] = await connection.execute(sql, [name, dod, client_email]);
    // console.log('connected', connection);
    res.json(newPetsObj);
  } catch (error) {
    console.log('error in pets route', error);
    res.status(500).json('stmh wrong');
  } finally {
    await connection?.end();
    console.log('connection closed');
  }
});
// -------------------------------------POST pet into table
petsRoutes.get('/pets/row/delete/:id', async (req, res) => {
  let connection;
  try {
    const { id } = req.params;

    connection = await mysql.createConnection(dbConfig);
    console.log('Prisijungem');
    const sql = `UPDATE  pets  SET  archived  =  1  WHERE  pets.id  = ?;`;

    const [newPetsObj] = await connection.execute(sql, [id]);
    // console.log('connected', connection);
    res.json(newPetsObj);
  } catch (error) {
    console.log('error in pets route', error);
    res.status(500).json('stmh wrong');
  } finally {
    await connection?.end();
    console.log('connection closed');
  }
});
// -------------------------------------POST pet into table
// petsRoutes.post('/pets/row', async (req, res) => {
//   let connection;
//   try {
//     connection = await mysql.createConnection(dbConfig);
//     console.log('Prisijungem');
//     const sql = `INSERT INTO  pets  ( name ,  dod ,  client_email ) VALUES ('brisius', '2022-11-11', 'brisisu@gmail.com')`;
//     const [result] = await connection.query(sql);
//     // console.log('connected', connection);
//     res.json(result);
//   } catch (error) {
//     console.log('error in pets route', error);
//     res.status(500).json('stmh wrong');
//   } finally {
//     await connection?.end();
//     console.log('connection closed');
//   }
// });
// ------------------------------------- post table
petsRoutes.post('/pets/table', async (req, res) => {
  let connection;
  try {
    connection = await mysql.createConnection(dbConfig);
    console.log('Prisijungem');
    const sql =
      'CREATE TABLE slscom_vetbee7.pets  (  id  INT NOT NULL AUTO_INCREMENT ,  name  TEXT NOT NULL ,  dod  TEXT NOT NULL ,  client_email  TEXT NOT NULL ,  archived  TINYINT NOT NULL , PRIMARY KEY ( id )) ENGINE = InnoDB';
    const [result] = await connection.query(sql);
    // console.log('connected', connection);
    res.json(result);
  } catch (error) {
    console.log('error in pets route', error);
    res.status(500).json('stmh wrong');
  } finally {
    await connection?.end();
    console.log('connection closed');
  }
});
// -------------------------------------------GET posted table
petsRoutes.get('/pets', async (req, res) => {
  let connection;
  try {
    connection = await mysql.createConnection(dbConfig);
    console.log('connected');
    const sql = 'SELECT * FROM pets';
    const [result] = await connection.query(sql);
    res.json(result);
  } catch (error) {
    console.log('error in pets route', error);
    res.status(500).json('stmh wrong');
  } finally {
    await connection?.end();
  }
});

petsRoutes.get('/pets/notArchived', async (req, res) => {
  let conn;
  try {
    conn = await mysql.createConnection(dbConfig);
    console.log('connected');

    const sql = 'SELECT * FROM pets WHERE archived = 0';
    const [rows] = await conn.execute(sql);
    res.json(rows);
  } catch (error) {
    console.log('error in home route', error);
    res.status(500).json('stmh wrong');
  } finally {
    await conn?.end();
  }
});
// ================== id selecting
petsRoutes.get('/pets/select/:id', async (req, res) => {
  let connection;
  try {
    const { id } = req.params;

    connection = await mysql.createConnection(dbConfig);
    console.log('Prisijungem');
    const sql = `SELECT * FROM pets WHERE id=${id}`;

    const [newPetsObj] = await connection.execute(sql, [id]);
    // console.log('connected', connection);
    res.json(newPetsObj);
  } catch (error) {
    console.log('error in pets route', error);
    res.status(500).json('stmh wrong');
  } finally {
    await connection?.end();
    console.log('connection closed');
  }
});

// --------------------------------------
module.exports = petsRoutes;

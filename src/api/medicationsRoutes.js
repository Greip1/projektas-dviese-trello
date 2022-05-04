const mysql = require('mysql2/promise');

const express = require('express');
const { dbConfig } = require('../config');

const medicRoutes = express.Router();

// -------------------------------------POST medication into table
medicRoutes.post('/medications/row', async (req, res) => {
  let connection;
  try {
    const { name, description } = req.body;

    connection = await mysql.createConnection(dbConfig);
    console.log('Prisijungem');
    const sql = `INSERT INTO  medications  ( name ,  description ) VALUES (?, ?)`;

    const [result] = await connection.execute(sql, [name, description]);
    // console.log('connected', connection);
    res.json(result);
  } catch (error) {
    console.log('error in medications route', error);
    res.status(500).json('stmh wrong');
  } finally {
    await connection?.end();
    console.log('connection closed');
  }
});
// // -------------------------------------POST medication into table
// medicRoutes.post('/medications/row', async (req, res) => {
//   let connection;
//   try {
//     connection = await mysql.createConnection(dbConfig);
//     console.log('Prisijungem');
//     const sql = `INSERT INTO  medications  ( name ,  description ) VALUES ('aspirinas', 'nuo skausmo ')`;
//     const [result] = await connection.query(sql);
//     // console.log('connected', connection);
//     res.json(result);
//   } catch (error) {
//     console.log('error in medications route', error);
//     res.status(500).json('stmh wrong');
//   } finally {
//     await connection?.end();
//     console.log('connection closed');
//   }
// });
// ------------------------------------- post table
medicRoutes.post('/medications/table', async (req, res) => {
  let connection;
  try {
    connection = await mysql.createConnection(dbConfig);
    console.log('Prisijungem');
    const sql =
      'CREATE TABLE slscom_vetbee7.medications  (  id  INT NOT NULL AUTO_INCREMENT ,  name  TEXT NOT NULL , description TEXT NOT NULL, PRIMARY KEY ( id )) ENGINE = InnoDB';
    const [result] = await connection.query(sql);
    // console.log('connected', connection);
    res.json(result);
  } catch (error) {
    console.log('error in medications route', error);
    res.status(500).json('stmh wrong');
  } finally {
    await connection?.end();
    console.log('connection closed');
  }
});
// -------------------------------------------GET posted table
medicRoutes.get('/medications', async (req, res) => {
  let connection;
  try {
    connection = await mysql.createConnection(dbConfig);
    console.log('connected');
    const sql = 'SELECT * FROM medications';
    const [result] = await connection.query(sql);
    res.json(result);
  } catch (error) {
    console.log('error in medications route', error);
    res.status(500).json('stmh wrong');
  } finally {
    await connection?.end();
  }
});

module.exports = medicRoutes;

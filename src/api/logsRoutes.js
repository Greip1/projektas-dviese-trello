const mysql = require('mysql2/promise');

const express = require('express');
const { dbConfig } = require('../config');

const logsRoutes = express.Router();

// -------------------------------------POST logs into table
logsRoutes.post('/logs/row', async (req, res) => {
  let connection;
  try {
    const { pet_id, description, status } = req.body;
    connection = await mysql.createConnection(dbConfig);
    console.log('Prisijungem');
    const sql = `INSERT INTO  logs  ( pet_id ,  description, status ) VALUES (?, ?, ?)`;
    const [result] = await connection.execute(sql, [pet_id, description, status]);
    // console.log('connected', connection);
    res.json(result);
  } catch (error) {
    console.log('error in logs route', error);
    res.status(500).json('stmh wrong');
  } finally {
    await connection?.end();
    console.log('connection closed');
  }
});
// // -------------------------------------POST logs into table
// logsRoutes.post('/logs/row', async (req, res) => {
//   let connection;
//   try {
//     connection = await mysql.createConnection(dbConfig);
//     console.log('Prisijungem');
//     const sql = `INSERT INTO  logs  ( pet_id ,  description, status ) VALUES ('1', 'atvaziavo su suluzusia koja', 'koja sugipsuota, bukle stabili')`;
//     const [result] = await connection.query(sql);
//     // console.log('connected', connection);
//     res.json(result);
//   } catch (error) {
//     console.log('error in logs route', error);
//     res.status(500).json('stmh wrong');
//   } finally {
//     await connection?.end();
//     console.log('connection closed');
//   }
// });
// ------------------------------------- post table
logsRoutes.post('/logs/table', async (req, res) => {
  let connection;
  try {
    connection = await mysql.createConnection(dbConfig);
    console.log('Prisijungem');
    const sql =
      'CREATE TABLE slscom_vetbee7.logs  (  id  INT NOT NULL AUTO_INCREMENT , pet_id INT NOT NULL ,  description  TEXT NOT NULL , status TEXT NOT NULL, PRIMARY KEY ( id )) ENGINE = InnoDB';
    const [result] = await connection.query(sql);
    // console.log('connected', connection);
    res.json(result);
  } catch (error) {
    console.log('error in logs route', error);
    res.status(500).json('stmh wrong');
  } finally {
    await connection?.end();
    console.log('connection closed');
  }
});
// -------------------------------------------GET posted table
logsRoutes.get('/logs', async (req, res) => {
  let connection;
  try {
    connection = await mysql.createConnection(dbConfig);
    console.log('connected');
    const sql = 'SELECT * FROM logs';
    const [result] = await connection.query(sql);
    res.json(result);
  } catch (error) {
    console.log('error in logs route', error);
    res.status(500).json('stmh wrong');
  } finally {
    await connection?.end();
  }
});

module.exports = logsRoutes;

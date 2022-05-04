const mysql = require('mysql2/promise');

const express = require('express');
const { dbConfig } = require('../config');

const petsRoutes = express.Router();

// -------------------------------------GAlb
petsRoutes.post('/pets', async (req, res) => {
  let connection;
  try {
    connection = await mysql.createConnection(dbConfig);
    console.log('Prisijungem');
    const sql = `INSERT INTO  pets  ( name ,  dod ,  client_email ) VALUES ('brisius', '2022-11-11', 'brisisu@gmail.com')`;
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
// ------------------------------------- pri
petsRoutes.post('/', async (req, res) => {
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
// -------------------------------------------GET
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
// --------------------------------------
module.exports = petsRoutes;

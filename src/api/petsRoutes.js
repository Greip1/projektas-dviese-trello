const mysql = require('mysql2/promise');

const express = require('express');
const { dbConfig } = require('../config');

const petsRoutes = express.Router();

petsRoutes.get('/', async (req, res) => {
  let connection;
  try {
    connection = await mysql.createConnection(dbConfig);
    console.log('connected', connection);
    // res.json(result);
  } catch (error) {
    console.log('error in pets route', error);
    res.status(500).json('stmh wrong');
  } finally {
    await connection?.end();
    console.log('connection closed');
  }
});
// petsRoutes.get('/', async (req, res) => {
//   let connection;
//   try {
//     connection = await mysql.createConnection(dbConfig);
//     console.log('connected');
//     const sql = 'SELECT * FROM pets';
//     const [result] = await connection.query(sql);
//     res.json(result);
//   } catch (error) {
//     console.log('error in pets route', error);
//     res.status(500).json('stmh wrong');
//   } finally {
//     await connection?.end();
//   }
// });

module.exports = petsRoutes;

const mysql = require('mysql2/promise');

const express = require('express');
const { dbConfig } = require('../config');

const prescripRoutes = express.Router();

module.exports = prescripRoutes;

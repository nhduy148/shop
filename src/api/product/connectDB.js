'use strict';
const mysql = require('mysql');
// require('dotenv').load()

const conn = mysql.createConnection({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "root",
  database: process.env.DB_NAME || "spaced_shop"
})
module.exports = conn

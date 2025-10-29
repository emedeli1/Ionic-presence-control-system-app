// db.js
'use strict'
var mysql = require('mysql');

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',      
  database: 'control_presencia'   
});

// Conectar a la base de datos
connection.connect(function(err) {
  if (err) {
    console.error('Error conectando a la base de datos: ' + err.stack);
    return;
  }
  console.log('Conexión establecida a la base de datos con ID ' + connection.threadId);
});

module.exports = connection;
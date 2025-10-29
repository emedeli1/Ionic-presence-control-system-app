'use strict';

var db = require('../db/db')

/**
 * Borrar un trabajo
 *
 * id Integer ID del trabajo a eliminar
 * returns inline_response_400
 **/
exports.trabajoDELETE = function(idTrabajo) {
  return new Promise(function(resolve, reject) {
    var query = 'DELETE FROM trabajos WHERE idTrabajo = ?'
    db.query(query, [idTrabajo], function (error, results){
      if (error){
        reject({
          message:"Error al eliminar trabajo", error: error
        });
      } else if (results.affectedRows > 0){
        resolve({
          message:"Trabajo eliminado con éxito"
        });
      } else {
        reject({
          message: "Trabajo no encontrado"
        });
      }
    })
  });
}


/**
 * Crear nuevo trabajo
 *
 * body Trabajo Información del nuevo trabajo
 * returns inline_response_400
 **/
exports.trabajoPOST = function(body) {
  return new Promise(function(resolve, reject) {
    var query = 'INSERT INTO trabajos (Nombre) VALUES (?)'
    db.query(query, [body.Nombre], function (error, results){
      if (error){
        reject({
          message:"Error al crear el trabajo", error: error
        });
      } else {
        resolve({
          message:"trabajo creado con éxito", trabajoId: results.insertId
        });
      }
    })
  });
}

exports.trabajoGET = function(idTrabajo) {
  return new Promise(function(resolve, reject) {
    var query = 'SELECT * FROM trabajos WHERE idTrabajo = ?'
    db.query(query, [idTrabajo], function (error, results){
      if (error){
        reject({
          message:"Error al obtener el trabajo", error: error
        });
      } else if (results.length > 0){
        resolve({
          message:"Trabajo obtenido con éxito", body: results
        });
      } else {
        reject({
          message: "Trabajo no encontrado"
        });
      }
    })
  });
}


/**
 * Modificar un trabajo existente
 *
 * body Trabajo Información actualizada del trabajo
 * id Integer ID del trabajo a modificar
 * returns inline_response_400
 **/
exports.trabajoPUT = function(body, id) {
  return new Promise(function(resolve, reject) {
    console.log(id)
    console.log(body)
    var query = 'UPDATE trabajos SET Nombre = ? WHERE idTrabajo = ?'
    db.query(query, [body.Nombre, id], function (error, results){
      if (error){
        reject({
          message:"Error al modificar el trabajo", error: error
        });
      } else if (results.affectedRows > 0) {
        resolve({
          message:"Trabajo modificado con éxito", body: results
        });
      } else {
        reject({
          message:"Trabajo por identificador no encontrado", body: results
        })
      }
    })
  });
}


/**
 * Obtener todos los trabajos
 *
 * returns List
 **/
exports.trabajosGET = function() {
  return new Promise(function(resolve, reject) {
    var query = 'SELECT * FROM trabajos'
    db.query(query, function (error, results){
      if (error){
        reject({
          message:"Error al obtener los trabajos", error: error
        });
      } else {
        resolve({
          message:"Trabajos obtenido con éxito", body: results
        });
      }
    })
  });
}



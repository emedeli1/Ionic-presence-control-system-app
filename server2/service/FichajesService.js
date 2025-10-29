'use strict';

var db = require('../db/db')

/**
 * Borrar un fichaje
 *
 * id Integer ID del fichaje a eliminar
 * returns inline_response_400
 **/
exports.fichajeDELETE = function(idFichaje) {
  return new Promise(function(resolve, reject) {
    var query = 'DELETE FROM fichajes WHERE idFichaje = ?'
    db.query(query, [idFichaje], function (error, results){
      if (error){
        reject({
          message:"Error al eliminar fichaje", error: error
        });
      } else if (results.affectedRows > 0){
        resolve({
          message:"Fichaje eliminado con éxito"
        });
      } else {
        reject({
          message: "Fichaje no encontrado"
        });
      }
    })
  });
}


/**
 * GET fichaje
 *
 * identificador String Nombre del Fichaje
 * returns Fichaje
 **/
exports.fichajeGET = function(idFichaje) {
  return new Promise(function(resolve, reject) {
    var query = 'SELECT * FROM fichajes WHERE idFichaje = ?'
    db.query(query, [idFichaje], function (error, results){
      if (error){
        reject({
          message:"Error al obtener fichaje", error: error
        });
      } else if (results.length > 0){
        resolve({
          message:"Fichaje obtenido con éxito", body: results
        });
      } else {
        reject({
          message: "Fichaje no encontrado"
        });
      }
    })
  });
}


/**
 * Registrar nuevo fichaje
 *
 * body Fichaje Información del nuevo fichaje
 * returns inline_response_400
 **/
exports.fichajePOST = function(body) {
  return new Promise(function(resolve, reject) {
    var query = 'INSERT INTO fichajes (FechaHoraEntrada, idTrabajo, idUsuario, GeolocalizacionLatitud, GeolocalizacionLongitud) VALUES (?, ?, ?, ?, ?)'
    db.query(query, [body.FechaHoraEntrada, body.idTrabajo, body.idUsuario, body.GeolocalizacionLatitud, body.GeolocalizacionLongitud], function (error, results){
      if (error){
        reject({
          message:"Error al crear Fichaje", error: error
        });
      } else {
        resolve({
          message:"Fichaje creado con éxito", fichajeId: results.insertId
        });
      }
    })
  });
}


/**
 * Modificación de un fichaje existente
 *
 * body Fichaje Información actualizada del fichaje
 * id Integer ID del fichaje a modificar
 * returns inline_response_400
 **/
exports.fichajePUT = function(body, id) {
  return new Promise(function(resolve, reject) {
    console.log(id)
    console.log(body)
    var query = 'UPDATE fichajes SET idTrabajo = ?, FechaHoraEntrada = ?, idUsuario = ?, FechaHoraSalida = ?, HorasTrabajadas = ? WHERE idFichaje = ?'
    db.query(query, [body.idTrabajo, body.FechaHoraEntrada, body.idUsuario, body.FechaHoraSalida, body.HorasTrabajadas, id], function (error, results){
      if (error){
        reject({
          message:"Error al modificar fichaje", error: error
        });
      } else if (results.affectedRows > 0) {
        resolve({
          message:"Fichaje modificado con éxito", body: results
        });
      } else {
        reject({
          message:"Fichaje por identificador no encontrado", body: results
        })
      }
    })
  });
}


/**
 * Obtener todos los fichajes
 *
 * returns List
 **/
exports.fichajesGET = function() {
  return new Promise(function(resolve, reject) {
    var query = 'SELECT fichajes.*, trabajos.nombre AS trabajoNombre, usuarios.Nombre AS usuarioNombre FROM fichajes LEFT JOIN trabajos ON fichajes.idTrabajo = trabajos.idTrabajo LEFT JOIN usuarios ON fichajes.idUsuario = usuarios.idUsuario'
    db.query(query, function (error, results){
      if (error){
        reject({
          message:"Error al obtener los fichajes", error: error
        });
      } else {
        resolve({
          message:"fichajes obtenido con éxito", body: results
        });
      }
    })
  });
}


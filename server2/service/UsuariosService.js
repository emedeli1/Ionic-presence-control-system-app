'use strict';

var db = require('../db/db')

/**
 * Borrado de usuario
 *
 * identificador String ID del usuario
 * returns inline_response_400
 **/
exports.usuarioDELETE = function(idUsuario) {
  return new Promise(function(resolve, reject) {
    var query = 'DELETE FROM usuarios WHERE idUsuario = ?'
    db.query(query, [idUsuario], function (error, results){
      if (error){
        reject({
          message:"Error al eliminar al usuario", error: error
        });
      } else if (results.affectedRows > 0){
        resolve({
          message:"Usuario eliminado con éxito"
        });
      } else {
        reject({
          message: "Usuario no encontrado"
        });
      }
    })
  });
}



/**
 * GET Usuario
 *
 * identificador String Nombre del usuario
 * returns Usuario
 **/
exports.usuarioGET = function(idUsuario) {
  return new Promise(function(resolve, reject) {
    var query = 'SELECT * FROM usuarios WHERE idUsuario = ?'
    db.query(query, [idUsuario], function (error, results){
      if (error){
        reject({
          message:"Error al obtener al usuario", error: error
        });
      } else if (results.length > 0){
        resolve({
          message:"Usuario obtenido con éxito", body: results
        });
      } else {
        reject({
          message: "Usuario no encontrado"
        });
      }
    })
  });
}


/**
 * Crear nuevo usuario
 *
 * body Usuario Información del nuevo usuario
 * returns inline_response_400
 **/
exports.usuarioPOST = function(body) {
  return new Promise(function(resolve, reject) {
    var query = 'INSERT INTO usuarios (Nombre, Usuario, Clave) VALUES (?, ?, ?)'
    db.query(query, [body.Nombre, body.Usuario, body.Clave], function (error, results){
      if (error){
        reject({
          message:"Error al crear al usuario", error: error
        });
      } else {
        resolve({
          message:"Usuario creado con éxito", usuarioId: results.insertId
        });
      }
    })
  });
}


/**
 * Modificación de datos de usuario
 *
 * body Usuario Información actualizada correctamente
 * id Integer ID del usuario a modificar
 * returns inline_response_400
 **/
exports.usuarioPUT = function(body, id) {
  return new Promise(function(resolve, reject) {
    console.log(id)
    console.log(body)
    var query = 'UPDATE usuarios SET Nombre = ?, Usuario = ?, Clave = ? WHERE idUsuario = ?'
    db.query(query, [body.Nombre, body.Usuario, body.Clave, id], function (error, results){
      if (error){
        reject({
          message:"Error al modificar al usuario", error: error
        });
      } else if (results.affectedRows > 0) {
        resolve({
          message:"Usuario modificado con éxito", body: results
        });
      } else {
        reject({
          message:"Usuario por identificador no encontrado", body: results
        })
      }
    })
  });
}
/*
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
*/

/**
 * Obtener todos los usuarios
 *
 * returns List
 **/
exports.usuariosGET = function() {
  return new Promise(function(resolve, reject) {
    var query = 'SELECT * FROM usuarios'
    db.query(query, function (error, results){
      if (error){
        reject({
          message:"Error al obtener los usuarios", error: error
        });
      } else {
        resolve({
          message:"Usuarios obtenido con éxito", body: results
        });
      }
    })
  });
}


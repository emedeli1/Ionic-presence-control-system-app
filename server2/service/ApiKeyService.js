'use strict';


/**
 * Borrar una ApiKey
 *
 * idKey Integer ID de la ApiKey a eliminar
 * returns inline_response_400
 **/
exports.apiKeyDELETE = function(idKey) {
  return new Promise(function(resolve, reject) {
    var query = 'DELETE FROM apikey WHERE idKey = ?'
    db.query(query, [idKey], function (error, results){
      if (error){
        reject({
          message:"Error al eliminar apikey", error: error
        });
      } else if (results.affectedRows > 0){
        resolve({
          message:"apikey eliminado con éxito"
        });
      } else {
        reject({
          message: "apikey no encontrado"
        });
      }
    })
  });
}


/**
 * Obtener todas las ApiKeys
 *
 * returns List
 **/
exports.apiKeyGET = function() {
  return new Promise(function(resolve, reject) {
    var query = 'SELECT * FROM apikey'
    db.query(query, function (error, results){
      if (error){
        reject({
          message:"Error al obtener las apikeys", error: error
        });
      } else {
        resolve({
          message:"apikeys obtenidas con éxito", body: results
        });
      }
    })
  });
}


/**
 * Crear nueva ApiKey
 *
 * body ApiKey Información de la nueva ApiKey
 * returns inline_response_400
 **/
exports.apiKeyPOST = function(body) {
  return new Promise(function(resolve, reject) {
    var query = 'INSERT INTO apikey (api_key) VALUES (?)'
    db.query(query, [body.api_key], function (error, results){
      if (error){
        reject({
          message:"Error al crear apikey", error: error
        });
      } else {
        resolve({
          message:"apikey creado con éxito", usuarioId: results.insertId
        });
      }
    })
  });
}


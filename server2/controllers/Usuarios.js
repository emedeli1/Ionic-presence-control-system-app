'use strict';

var utils = require('../utils/writer.js');
var Usuarios = require('../service/UsuariosService');

module.exports.usuarioDELETE = function usuarioDELETE (req, res, next, identificador) {
  Usuarios.usuarioDELETE(identificador)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.usuarioGET = function usuarioGET (req, res, next, identificador) {
  Usuarios.usuarioGET(identificador)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.usuarioPOST = function usuarioPOST (req, res, next, body) {
  Usuarios.usuarioPOST(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.usuarioPUT = function usuarioPUT (req, res, next, body, id) {
  Usuarios.usuarioPUT(body, id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.usuariosGET = function usuariosGET (req, res, next) {
  Usuarios.usuariosGET()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

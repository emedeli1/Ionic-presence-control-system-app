'use strict';

var utils = require('../utils/writer.js');
var Trabajos = require('../service/TrabajosService');

module.exports.trabajoDELETE = function trabajoDELETE (req, res, next, id) {
  Trabajos.trabajoDELETE(id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.trabajoPOST = function trabajoPOST (req, res, next, body) {
  Trabajos.trabajoPOST(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.trabajoPUT = function trabajoPUT (req, res, next, body, id) {
  Trabajos.trabajoPUT(body, id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.trabajosGET = function trabajosGET (req, res, next) {
  Trabajos.trabajosGET()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.trabajoGET = function trabajoGET (req, res, next, identificador) {
  Trabajos.trabajoGET(identificador)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

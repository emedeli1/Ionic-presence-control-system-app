'use strict';

var utils = require('../utils/writer.js');
var Fichajes = require('../service/FichajesService');

module.exports.fichajeDELETE = function fichajeDELETE (req, res, next, id) {
  Fichajes.fichajeDELETE(id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.fichajeGET = function fichajeGET (req, res, next, identificador) {
  Fichajes.fichajeGET(identificador)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.fichajePOST = function fichajePOST (req, res, next, body) {
  Fichajes.fichajePOST(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.fichajePUT = function fichajePUT (req, res, next, body, id) {
  Fichajes.fichajePUT(body, id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.fichajesGET = function fichajesGET (req, res, next) {
  Fichajes.fichajesGET()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

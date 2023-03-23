"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.routes = void 0;
var _index = require("../../../../modules/payment/infra/routes/index.routes");
var _routes = require("../../../../modules/users/infra/routes/routes");
var _express = require("express");
const routes = (0, _express.Router)();
exports.routes = routes;
routes.use(_routes.UserRoute);
routes.use(_index.Payment);
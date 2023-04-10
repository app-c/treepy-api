"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.routes = void 0;
var _routes = require("../../../../modules/End/http/routes");
var _index = require("../../../../modules/payment/infra/routes/index.routes");
var _routes2 = require("../../../../modules/users/infra/routes/routes");
var _express = require("express");
const routes = (0, _express.Router)();
exports.routes = routes;
routes.use(_routes2.UserRoute);
routes.use(_index.Payment);
routes.use(_routes.EndRoute);
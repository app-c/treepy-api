"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EndRoute = void 0;
var _Auth = require("../../../../shared/midle/Auth");
var _express = require("express");
var _end = require("./end");
const EndRoute = (0, _express.Router)();
exports.EndRoute = EndRoute;
EndRoute.use(_Auth.Auth);
EndRoute.use('/end', _end.end);
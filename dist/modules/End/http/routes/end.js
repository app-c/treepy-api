"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.end = void 0;
var _express = require("express");
var _EndController = require("../controller/EndController");
const end = (0, _express.Router)();
exports.end = end;
const control = new _EndController.EndController();
end.post('/create-end', control.create);
end.get('/:id/', control.findById);
end.get('/', control.listMany);
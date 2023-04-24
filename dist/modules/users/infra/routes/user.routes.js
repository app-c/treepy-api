"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.user = void 0;
var _upload = _interopRequireDefault(require("../../../../config/upload"));
var _Auth = require("../../../../shared/midle/Auth");
var _express = require("express");
var _multer = _interopRequireDefault(require("multer"));
var _UserController = require("../controllers/UserController");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const user = (0, _express.Router)();
exports.user = user;
const control = new _UserController.UserController();
const img = (0, _multer.default)(_upload.default);
user.post('/create-user', control.create);
user.post('/session', control.session);
user.get('/check-mail/:mail/:cpf', control.checkMail);
user.get('/find-user/', _Auth.Auth, control.findUser);
user.post('/send-forgot-password', control.sendForgotPassword);

// user.use(Auth);
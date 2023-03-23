"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UserController = void 0;
var _CreateUserService = require("../../service/CreateUserService");
var _findUserService = require("../../service/findUserService");
var _SendForgotPasswordEmailService = require("../../service/SendForgotPasswordEmailService");
var _SessionService = require("../../service/SessionService.service");
var _tsyringe = require("tsyringe");
/* eslint-disable @typescript-eslint/no-non-null-assertion */

class UserController {
  async create(req, res) {
    const service = _tsyringe.container.resolve(_CreateUserService.CreateUserService);
    const {
      name,
      email,
      password,
      midle_name,
      street,
      bairro,
      number_home,
      city,
      state,
      cep
    } = req.body;
    const user = await service.execute({
      name,
      midle_name,
      password,
      email,
      street,
      bairro,
      number_home,
      city,
      state,
      cep
    });
    return res.json(user);
  }
  async session(req, res) {
    const service = _tsyringe.container.resolve(_SessionService.SessionService);
    const {
      email,
      password
    } = req.body;
    const sess = await service.execute({
      email,
      password
    });
    return res.json(sess);
  }
  async sendForgotPassword(req, res) {
    const service = _tsyringe.container.resolve(_SendForgotPasswordEmailService.SendForgotPasswordEmailService);
    const {
      email
    } = req.body;
    const sess = await service.execute({
      email
    });
    return res.json(sess);
  }
  async findUser(req, res) {
    const service = _tsyringe.container.resolve(_findUserService.findUser);
    const {
      id
    } = req.user;
    const sess = await service.execute({
      id
    });
    return res.json(sess);
  }
}
exports.UserController = UserController;
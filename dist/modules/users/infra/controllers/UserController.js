"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UserController = void 0;
var _checkUserService = require("../../service/checkUserService");
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
      full_name,
      email,
      password,
      cpf,
      phone_area,
      phone_number,
      street,
      locality,
      home_number,
      city,
      state,
      region_code,
      postal_code
    } = req.body;
    const user = await service.execute({
      full_name,
      email,
      password,
      cpf,
      phone_area,
      phone_number,
      street,
      locality,
      home_number,
      city,
      state,
      region_code,
      postal_code
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
  async checkMail(req, res) {
    const service = _tsyringe.container.resolve(_checkUserService.checkMailService);
    const {
      mail,
      cpf
    } = req.params;
    const sess = await service.execute({
      email: String(mail),
      cpf: String(cpf)
    });
    return res.json(sess);
  }
}
exports.UserController = UserController;
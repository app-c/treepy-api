"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EndController = void 0;
var _endService = require("../../services/endService");
var _tsyringe = require("tsyringe");
/* eslint-disable @typescript-eslint/no-non-null-assertion */

class EndController {
  async create(req, res) {
    const service = _tsyringe.container.resolve(_endService.endService);
    const {} = req.body;
    const create = await service.create({});
    return res.json(create);
  }
  async listMany(req, res) {
    const service = _tsyringe.container.resolve(_endService.endService);
    const list = await service.listMany();
    return res.json(list);
  }
  async findById(req, res) {
    const service = _tsyringe.container.resolve(_endService.endService);
    const id = req.params;
    const list = await service.findById({
      id: String(id)
    });
    return res.json(list);
  }
}
exports.EndController = EndController;
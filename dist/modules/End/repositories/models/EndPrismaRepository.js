"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EndPrismaRepository = void 0;
var _prisma = require("../../../../utils/prisma");
/* eslint-disable @typescript-eslint/no-non-null-assertion */

class EndPrismaRepository {
  async create(data) {
    const create = await _prisma.prisma.end.create({
      data
    });
    return create;
  }
  async findById(id) {
    const list = await _prisma.prisma.end.findUnique({
      where: {
        id
      }
    });
    return list;
  }
  async listMany() {
    const list = await _prisma.prisma.end.findMany();
    return list;
  }
}
exports.EndPrismaRepository = EndPrismaRepository;
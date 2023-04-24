"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UsersRespository = void 0;
var _prisma = require("../../../utils/prisma");
/* eslint-disable @typescript-eslint/no-non-null-assertion */

class UsersRespository {
  async findUserByEmail(email) {
    const us = await _prisma.prisma.user.findFirst({
      where: {
        email
      }
    });
    return us;
  }
  async findUserById(id) {
    const us = await _prisma.prisma.user.findUnique({
      where: {
        id
      },
      include: {
        end: true,
        profile: true
      }
    });
    return us;
  }
  async create(data, end) {
    const user = await _prisma.prisma.user.create({
      data: {
        ...data,
        end: {
          create: {
            street: end.street,
            locality: end.locality,
            number_home: end.home_number,
            city: end.city,
            state: end.city,
            region_code: end.region_code,
            postal_code: end.postal_code
          }
        },
        profile: {
          create: {
            avatar: 'avatar'
          }
        }
      }
    });
    return user;
  }
  async findCpf(cpf) {
    const find = await _prisma.prisma.user.findUnique({
      where: {
        cpf
      }
    });
    return find;
  }
}
exports.UsersRespository = UsersRespository;
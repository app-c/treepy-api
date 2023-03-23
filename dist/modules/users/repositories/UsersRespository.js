"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UsersRespository = void 0;
var _client = require("@prisma/client");
/* eslint-disable @typescript-eslint/no-non-null-assertion */

class UsersRespository {
  constructor() {
    this.prisma = new _client.PrismaClient();
  }
  async findUserByEmail(email) {
    const us = await this.prisma.user.findFirst({
      where: {
        email
      }
    });
    return us;
  }
  async findUserById(id) {
    const us = await this.prisma.user.findUnique({
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
    const user = await this.prisma.user.create({
      data: {
        name: data.name,
        midle_name: data.midle_name,
        email: data.email,
        password: data.password,
        end: {
          create: {
            city: end.city,
            bairro: end.bairro,
            cep: end.cep,
            number_home: end.number_home,
            state: end.state,
            street: end.street
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
}
exports.UsersRespository = UsersRespository;
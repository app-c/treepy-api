"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.findUser = void 0;
var _ICacheProvider = _interopRequireDefault(require("../../../shared/container/providers/Cache/model/ICacheProvider"));
var _AppError = require("../../../shared/errors/AppError");
var _tsyringe = require("tsyringe");
var _IUsersRespository = require("../repositories/IUsersRespository");
var _dec, _dec2, _dec3, _dec4, _dec5, _class;
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
let findUser = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)(process.env.USER)(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)('Cache')(target, undefined, 1);
}, _dec4 = Reflect.metadata("design:type", Function), _dec5 = Reflect.metadata("design:paramtypes", [typeof _IUsersRespository.IUsersRepository === "undefined" ? Object : _IUsersRespository.IUsersRepository, typeof _ICacheProvider.default === "undefined" ? Object : _ICacheProvider.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = class findUser {
  constructor(userRepository, cache) {
    this.userRepository = userRepository;
    this.cache = cache;
  }
  async execute({
    id
  }) {
    const find = await this.userRepository.findUserById(id);
    if (!find) {
      throw new _AppError.Err('Usuário não encontrado');
    }
    return find;
  }
}) || _class) || _class) || _class) || _class) || _class);
exports.findUser = findUser;
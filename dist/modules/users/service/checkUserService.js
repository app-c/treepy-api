"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.checkMailService = void 0;
var _ICacheProvider = _interopRequireDefault(require("../../../shared/container/providers/Cache/model/ICacheProvider"));
var _AppError = require("../../../shared/errors/AppError");
var _tsyringe = require("tsyringe");
var _IUsersRespository = require("../repositories/IUsersRespository");
var _dec, _dec2, _dec3, _dec4, _dec5, _class;
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
let checkMailService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)(process.env.USER)(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)('Cache')(target, undefined, 1);
}, _dec4 = Reflect.metadata("design:type", Function), _dec5 = Reflect.metadata("design:paramtypes", [typeof _IUsersRespository.IUsersRepository === "undefined" ? Object : _IUsersRespository.IUsersRepository, typeof _ICacheProvider.default === "undefined" ? Object : _ICacheProvider.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = class checkMailService {
  constructor(userRepository, cache) {
    this.userRepository = userRepository;
    this.cache = cache;
  }
  async execute({
    email,
    cpf
  }) {
    const find = await this.userRepository.findUserByEmail(email);
    const findCpf = await this.userRepository.findCpf(cpf);
    if (find) {
      throw new _AppError.Err('Esse usuário já está cadastrado. Tente novamente com um email diferente');
    }
    if (findCpf) {
      throw new _AppError.Err('CPF já está cadastrado. Tente novamente com um CPF diferente');
    }
    await this.cache.invalidate('users');
    await this.cache.invalidatePrefix(`individualPonts`);
  }
}) || _class) || _class) || _class) || _class) || _class);
exports.checkMailService = checkMailService;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.endService = void 0;
var _ICacheProvider = _interopRequireDefault(require("../../../shared/container/providers/Cache/model/ICacheProvider"));
var _AppError = require("../../../shared/errors/AppError");
var _tsyringe = require("tsyringe");
var _IEndRepository = require("../repositories/IRepository/IEndRepository");
var _dec, _dec2, _dec3, _dec4, _dec5, _class;
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
let endService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)(process.env.End)(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)('Cache')(target, undefined, 1);
}, _dec4 = Reflect.metadata("design:type", Function), _dec5 = Reflect.metadata("design:paramtypes", [typeof _IEndRepository.IEndRepository === "undefined" ? Object : _IEndRepository.IEndRepository, typeof _ICacheProvider.default === "undefined" ? Object : _ICacheProvider.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = class endService {
  constructor(repoEnd, cache) {
    this.repoEnd = repoEnd;
    this.cache = cache;
  }
  async create({}) {}
  async findById({
    id
  }) {
    const list = await this.repoEnd.findById(id);
    if (!list) {
      throw new _AppError.Err('Nada encontrado');
    }
    return list;
  }
  async listMany() {
    const list = await this.repoEnd.listMany();
    return list;
  }
}) || _class) || _class) || _class) || _class) || _class);
exports.endService = endService;
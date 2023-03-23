"use strict";

require("dotenv/config");
var _UsersRespository = require("../../modules/users/repositories/UsersRespository");
var _S3Storage = require("../StorageProvider/implementations/S3Storage");
var _tsyringe = require("tsyringe");
require("./providers");
require("../../modules/users/providers");
var _UserTokenRepositorie = _interopRequireDefault(require("../../modules/users/repositories/UserTokenRepositorie"));
var _RedisCachProvider = _interopRequireDefault(require("./providers/Cache/implementations/RedisCachProvider"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/* eslint-disable @typescript-eslint/no-non-null-assertion */

// const providers = {
//    disk: DiskStorageProvider,
//    s3: S3StoreageProvider,
// };

const prividers = {
  redis: _RedisCachProvider.default
};
_tsyringe.container.registerSingleton(process.env.USER, _UsersRespository.UsersRespository);
_tsyringe.container.registerSingleton('token', _UserTokenRepositorie.default);
_tsyringe.container.registerSingleton(process.env.STOREGE, _S3Storage.S3Storage);
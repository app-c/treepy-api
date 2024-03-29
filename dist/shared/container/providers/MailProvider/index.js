"use strict";

var _mail = _interopRequireDefault(require("../../../../config/mail"));
var _tsyringe = require("tsyringe");
var _EtherealMailProvider = _interopRequireDefault(require("./implementations/EtherealMailProvider"));
var _SESMailProvider = _interopRequireDefault(require("./implementations/SESMailProvider"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const providers = {
  ethereal: _tsyringe.container.resolve(_EtherealMailProvider.default)
};
_tsyringe.container.registerInstance('MailProvider', _mail.default.driver === 'ethereal' ? _tsyringe.container.resolve(_EtherealMailProvider.default) : _tsyringe.container.resolve(_SESMailProvider.default));
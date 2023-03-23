"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  driver: process.env.MAIL_DRIVER || 'ses',
  defaults: {
    from: {
      email: 'william@app-com.digital',
      name: 'william'
    }
  }
};
exports.default = _default;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
class FakeMailTemplateProvider {
  async parse() {
    return 'Mail content';
  }
}
exports.default = FakeMailTemplateProvider;
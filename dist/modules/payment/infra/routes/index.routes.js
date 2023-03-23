"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Payment = void 0;
var _express = require("express");
var _payment = require("./payment.routes");
const Payment = (0, _express.Router)();
exports.Payment = Payment;
Payment.use('/pay-pag', _payment.pay);
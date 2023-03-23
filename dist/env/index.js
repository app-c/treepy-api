"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.env = void 0;
require("dotenv/config");
var _zod = require("zod");
const envScheme = _zod.z.object({
  DATABASE_URL: _zod.z.string(),
  APP_SECRET: _zod.z.string(),
  APP_API_URL: _zod.z.string(),
  APP_WEB_URL: _zod.z.string(),
  MAIL_DRIVER: _zod.z.string(),
  STORAGE_DRIVER: _zod.z.string(),
  AWS_SECRET_ACCESS_KEY: _zod.z.string(),
  AWS_ACCESS_KEY_ID: _zod.z.string(),
  AWS_BUCKET: _zod.z.string(),
  AWS_BUCKET_REGION: _zod.z.string(),
  AWS_URL: _zod.z.string(),
  REDIS_HOST: _zod.z.string(),
  REDIS_PORT: _zod.z.string(),
  REDIS_PASS: _zod.z.string(),
  USER: _zod.z.string(),
  USER_TOKEN: _zod.z.string(),
  PORT: _zod.z.string(),
  PAG_TOKEN: _zod.z.string()
});
const env = envScheme.parse(process.env);
exports.env = env;
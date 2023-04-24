"use strict";

var _app = require("./app");
_app.app.listen({
  host: '0.0.0.0',
  port: 3333
}).then(() => {
  console.log('server run');
});
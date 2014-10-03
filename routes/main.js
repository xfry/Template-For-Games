//routes/main.js
//busque controlador
var ctrl = require("../server-side/controllers/main");

module.exports = function(router) {
  router.get("/", ctrl.home);
}
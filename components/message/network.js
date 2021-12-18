const express = require("express");
const response = require("../../network/response");
const router = express.Router();

router.get("/", function (req, res) {
  console.log(req.headers);
  res.header({
    "Custom-header": "nuestro valor personalizado",
  });
  response.success(req, res, "Lista de mensajes");
});

router.post("/", function (req, res) {
  console.log(req.body);
  if (req.query.error == "ok") {
    response.error(
      req,
      res,
      "error inesperado",
      500,
      "es solo una simulaciónd de los errores"
    );
  } else {
    response.success(req, res, "creado correctamente", 201);
  }
});

module.exports = router;

const express = require("express");
const bodyParser = require("body-parser");

const response = require("./network/response");

const router = express.Router();

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(router);

router.get("/message", function (req, res) {
  console.log(req.headers);
  res.header({
    "Custom-header": "nuestro valor personalizado",
  });
  response.success(req, res, "Lista de mensajes");
});

router.post("/message", function (req, res) {
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

app.use("/app", express.static("public"));
app.listen(3000);
console.log("La aplicación está escuchando en http://localhost:3000");

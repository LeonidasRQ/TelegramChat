const express = require("express");
const bodyParser = require("body-parser");

//const router = require("./components/message/network");
const router = require("./network/routes");
const db = require("./db");
const uri =
  "mongodb+srv://db_user:isl8Xsj7X9VcFw8t@cluster0.zmg4s.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
db(uri);

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//app.use(router);
router(app);

app.use("/app", express.static("public"));
app.listen(3000);
console.log("La aplicación está escuchando en http://localhost:3000");

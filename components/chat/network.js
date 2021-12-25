const express = require("express");
const response = require("../../network/response");
const controller = require("./controller");
const router = express.Router();

router.get("/:userId", function (req, res) {
  controller
    .getChats(req.params.userId)
    .then((users) => {
      response.success(req, res, users, 200);
    })
    .catch((e) => {
      response.error(req, res, "unexpected error", 500, e);
    });
});

router.post("/", function (req, res) {
  controller
    .createChat(req.body.users)
    .then((data) => {
      response.success(req, res, data, 201);
    })
    .catch((e) => {
      response.error(req, res, "error inesperado", 500, e);
    });
});

module.exports = router;

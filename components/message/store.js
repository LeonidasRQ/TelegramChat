const db = require("mongoose");
const Model = require("./model");

db.Promise = global.Promise;
const uri =
  "mongodb+srv://db_user:isl8Xsj7X9VcFw8t@cluster0.zmg4s.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

db.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("[db] Conectada con éxito"))
  .catch((err) => console.error("[db]", err));

function addMessage(message) {
  const myMessage = new Model(message);
  myMessage.save();
}

async function getMessage() {
  const messages = await Model.find();
  return messages;
}

async function updateText(id, message) {
  const foundMessage = await Model.findOne({
    _id: id,
  });

  foundMessage.message = message;
  const newMessage = await foundMessage.save();
  return newMessage;
}

module.exports = {
  add: addMessage,
  list: getMessage,
  updateText: updateText,
};

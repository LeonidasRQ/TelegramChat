const Model = require("./model");

function addMessage(message) {
  const myMessage = new Model(message);
  myMessage.save();
}

function getMessage(filterUser) {
  return new Promise((resolve, reject) => {
    let filter = {};
    if (filterUser !== null) {
      filter = { user: filterUser };
    }
    Model.find(filter)
      .populate("user")
      .exec((error, populatedData) => {
        if (error) {
          reject(error);
          return false;
        }
        resolve(populatedData);
      });
  });
}

async function updateText(id, message) {
  const foundMessage = await Model.findOne({
    _id: id,
  });

  foundMessage.message = message;
  const newMessage = await foundMessage.save();
  return newMessage;
}

function removeMessage(id) {
  return Model.deleteOne({
    _id: id,
  });
}
module.exports = {
  add: addMessage,
  list: getMessage,
  updateText: updateText,
  remove: removeMessage,
};

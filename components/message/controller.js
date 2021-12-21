const store = require("./store");

function addMessage(user, message) {
  return new Promise((resolve, reject) => {
    if (!user || !message) {
      console.error("[message controller] No hay usuario o mensaje");
      reject("Los datos no están completos");
      return false;
    }
    const fullMessage = {
      user: user,
      message: message,
      date: new Date(),
    };
    store.add(fullMessage);
    resolve(fullMessage);
  });
}

function getMessages() {
  return new Promise((resolve, reject) => {
    resolve(store.list());
  });
}

function updateMessage(id, message) {
  return new Promise(async (resolve, reject) => {
    if (!id || !message) {
      reject("invalid data");
      return false;
    }
    const result = await store.updateText(id, message);
    return result;
  });
}

module.exports = {
  addMessage,
  getMessages,
  updateMessage,
};

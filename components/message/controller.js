const store = require("./store");
const socket = require("../../socket").socket;

function addMessage(chat, user, message, file) {
  return new Promise((resolve, reject) => {
    if (!chat || !user || !message) {
      console.error("[message controller] No hay usuario o mensaje");
      reject("Los datos no están completos");
      return false;
    }

    let fileUrl = "";
    if (file) {
      fileUrl = "http://localhost:3000/app/files/" + file.filename;
    }

    const fullMessage = {
      chat: chat,
      user: user,
      message: message,
      date: new Date(),
      file: fileUrl,
    };
    store.add(fullMessage);

    socket.io.emit("message", fullMessage);

    resolve(fullMessage);
  });
}

function getMessages(filterChat) {
  return new Promise((resolve, reject) => {
    resolve(store.list(filterChat));
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

function deleteMessage(id) {
  return new Promise((resolve, reject) => {
    if (!id) {
      reject("id invalido");
      return false;
    }
    store
      .remove(id)
      .then(() => {
        resolve();
      })
      .catch((e) => {
        reject(e);
      });
  });
}
module.exports = {
  addMessage,
  getMessages,
  updateMessage,
  deleteMessage,
};

const store = require("./store");

function createChat(users) {
  if (!users || !Array.isArray(users)) {
    return Promise.reject("invalid user list");
  }
  const chat = {
    users: users,
  };
  return store.create(chat);
}

function getChats(userId) {
  return store.list(userId);
}

module.exports = {
  createChat,
  getChats,
};

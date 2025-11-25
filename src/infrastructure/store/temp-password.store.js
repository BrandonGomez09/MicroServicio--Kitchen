const tempPasswords = {};

module.exports = {
  saveTemporaryPassword(kitchenId, password) {
    tempPasswords[kitchenId] = password;
  },

  getTemporaryPassword(kitchenId) {
    return tempPasswords[kitchenId];
  },

  clearTemporaryPassword(kitchenId) {
    delete tempPasswords[kitchenId];
  }
};

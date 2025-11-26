const tempPasswords = new Map();

function saveTemporaryPassword(kitchenId, password) {
  tempPasswords.set(kitchenId, password);
}

function getTemporaryPassword(kitchenId) {
  return tempPasswords.get(kitchenId);
}

function clearTemporaryPassword(kitchenId) {
  tempPasswords.delete(kitchenId);
}

module.exports = {
  saveTemporaryPassword,
  getTemporaryPassword,
  clearTemporaryPassword
};
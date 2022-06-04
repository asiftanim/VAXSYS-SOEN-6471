const constants = require("./../util/constants");

module.exports = class BaseException extends Error {
  constructor(message, status) {
    super(message);
    this.status = status || 500;
    this.message = message || constants.SERVER_ERROR;
  }
};

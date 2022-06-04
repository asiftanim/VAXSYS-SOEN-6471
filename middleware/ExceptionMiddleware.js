const helper = require("../util/helper");
const constants = require("../util/constants");
const message = require("../util/message");

const errorHandler = (err, req, res, next) => {
  if (!err.status) {
    err.status = constants.SERVER_ERROR;
    err.message = message.SERVER_ERROR_MESSAGE;
  }
  helper.createResponse(res, err.status, err.message);
};
module.exports = errorHandler;

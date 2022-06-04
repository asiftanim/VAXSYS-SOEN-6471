const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const constants = require("./constants");

module.exports = {
  createResponse: (res, statusCode, message, data, header) => {
    header = header ? header : {};
    data = data ? data : {};
    return res.status(statusCode).set(header).json({
      message: message,
      data: data,
    });
  },
};

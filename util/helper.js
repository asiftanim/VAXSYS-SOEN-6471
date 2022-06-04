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

  createHash: async (password) => {
    return bcrypt.hash(password, constants.PASSWORD_HASH_ROUNDS);
  },

  compareHash: async (password, hash) => {
    return bcrypt.compare(password, hash);
  },

  generateToken: (data) => {
    return jwt.sign(data, constants.JWT_SECRET, {
      algorithm: constants.JWT_ALGORITHM,
    });
  },
};

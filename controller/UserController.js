const { User } = require("./../connection/database");
const constants = require("../util/constants");
const message = require("../util/message");
const helper = require("./../util/helper");
const BaseException = require("../exception/BaseException");

module.exports = {
  register: async (req, res, next) => {
    try {
      let { firstName, lastName, email, password } = req.body;
      password = await helper.createHash(password);
      await User.create({
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
        role: 2
      });
      helper.createResponse(
        res,
        constants.SUCCESS,
        message.REGISTRATION_SUCCESSFUL,
        { firstName: firstName, lastName: lastName, email: email }
      );
    } catch (err) {
      console.log(__filename, "register()", err.message, err.stack);
      next(err);
    }
  },

  login: async (req, res, next) => {
    try {
      let { email, password } = req.body;
      let user = await User.findOne({
        where: { email: email },
      });

      if (!user) {
        throw new BaseException(message.USER_NOT_FOUND, constants.UNAUTHORIZED);
      }

      let passwordsMatch = await helper.compareHash(password, user.password);
      if (!passwordsMatch) {
        throw new BaseException(message.USER_NOT_FOUND, constants.UNAUTHORIZED);
      }

      let returnData = {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        token: helper.generateToken({ email: user.email, role: user.role }),
        role: user.role,
      };

      helper.createResponse(
        res,
        constants.SUCCESS,
        message.LOGIN_SUCCESSFUL,
        returnData
      );
    } catch (err) {
      console.log(__filename, "login()", err.message, err.stack);
      next(err);
    }
  },
};

const helper = require("./../util/helper");
const BaseException = require('./../exception/BaseException');
const message = require("./../util/message");
const constants = require("./../util/constants");

module.exports = {
    userAuthMiddleware: async (req, res, next) => {
        try {
            const { authorization } = req.headers;
            let decoded = await helper.verifyToken(authorization.split(' ')[1]);
            if (decoded && decoded.email && (decoded.role === constants.ROLE_USER || decoded.role === constants.ROLE_ADMIN)) {
                next();
            } else {
                throw new BaseException(message.UNAUTHORIZED_ACCESS, constants.UNAUTHORIZED);
            }
        } catch (err) {
            err.status = 401;
            err.message = message.UNAUTHORIZED_ACCESS;
            console.log(__filename, "userAuthMiddleware()", err.message, err.stack);
            next(err);
        }
    },

    AdminAuthMiddleware: async (req, res, next) => {
        try {
            const { authorization } = req.headers;
            let decoded = await helper.verifyToken(authorization.split(' ')[1]);
            if (decoded && decoded.email && decoded.role === constants.ROLE_ADMIN) {
                next();
            } else {
                throw new BaseException(message.UNAUTHORIZED_ACCESS, constants.UNAUTHORIZED);
            }
        } catch (err) {
            logger.error(__filename, 'AdminAuthMiddleware', err.message, err.stack)
            err.status = 401;
            err.message = message.UNAUTHORIZED_ACCESS;
            console.log(__filename, "AdminAuthMiddleware()", err.message, err.stack);
            next(err);
        }
    }
}
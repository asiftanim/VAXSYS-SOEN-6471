module.exports = {
  //Response status codes
  SUCCESS: 200,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  SERVER_ERROR: 500,

  //Hash rounds
  PASSWORD_HASH_ROUNDS: 4,

  //JWT Configuration
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_ALGORITHM: "HS256",
  TOKEN_EXPIRY: 24,

  //Role type
  ROLE_ADMIN: 1,
  ROLE_USER: 2,
};

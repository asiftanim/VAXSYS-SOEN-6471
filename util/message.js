module.exports = {
  //Entity
  CREATED_SUCCESSFULLY: (entity) => {
    return entity + " created successfully"
  },

  FETCHED_SUCCESSFULLY: (entity) => {
    return entity + " fetched successfully"
  },

  ALREADY_EXISTS: (entity) => {
    return entity + "  already exists"
  },

  DOES_NOT_EXIST: (entity) => {
    return entity + "  does not exist"
  },
  //User
  REGISTRATION_SUCCESSFUL: "User registered successfully",
  USER_NOT_FOUND: "Incorrect email/password",
  LOGIN_SUCCESSFUL: "Login Successful",

  //Error
  SERVER_ERROR_MESSAGE: "Server Error",

  //APPOINTMENT
  VACCINE_CENTRE_CLOSED: "Vaccine centre closed during the selected time"
};

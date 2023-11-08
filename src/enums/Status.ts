enum STATUS {
  INVALID_EMAIL = 'Invalid email',
  INVALID_NAME = 'Invalid name',
  INVALID_PASSWORD = 'Password must contain at least 8 characters, 1 uppercase character, and 1 digit',
  OK = 'Ok',
  REGISTRATION_ERROR = 'An error occurred while trying to register the user',
  NOT_AUTHORIZED = 'User not authorized',
}

export default STATUS;
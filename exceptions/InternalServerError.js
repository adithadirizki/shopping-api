const CustomError = require("./CustomError");

class InternalServerError extends CustomError {
  constructor(message = "sorry, server error occured.") {
    super(message);

    this.message = message;
    this.statusCode = 500;
  }
}

module.exports = InternalServerError;

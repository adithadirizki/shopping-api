const CustomError = require("./CustomError");

class BadRequestError extends CustomError {
  constructor(message = "payload did not contain needed property.") {
    super(message);

    this.message = message;
    this.statusCode = 400;
  }
}

module.exports = BadRequestError;

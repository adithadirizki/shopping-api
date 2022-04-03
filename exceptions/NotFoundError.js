const CustomError = require("./CustomError");

class NotFoundError extends CustomError {
  constructor(message = "page not found.") {
    super(message);

    this.message = message;
    this.statusCode = 404;
  }
}

module.exports = NotFoundError;

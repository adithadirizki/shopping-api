const CustomError = require("./CustomError");

class Unauthorized extends CustomError {
  constructor(message = "not authorized.") {
    super(message);

    this.message = message;
    this.statusCode = 401;
  }
}

module.exports = Unauthorized;
class CustomError extends Error {
  /**
   * @param {any} message 
   * @param {number} statusCode 
   */
  constructor(message, statusCode) {
    super(message);

    /**
     * @type {any}
     */
    this.message = message;
    
    /**
     * @type {number}
     */
    this.statusCode = statusCode;
  }
}

module.exports = CustomError;
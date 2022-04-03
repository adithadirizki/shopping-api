const express = require("express");
const jsonwebtoken = require("jsonwebtoken");
const Unauthorized = require("../exceptions/UnauthorizedError");

/**
 * Authentication Check
 *
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
const authenticationCheck = (req, res, next) => {
  const { authorization } = req.headers;
  const token = authorization?.split(" ")[1];

  try {
    jsonwebtoken.verify(token, "secretOrPrivateKey");
    next();
  } catch (error) {
    next(new Unauthorized("invalid token authorization."));
  }
};

module.exports = { authenticationCheck };

const bcrypt = require("bcrypt");
const express = require("express");
const jsonwebtoken = require("jsonwebtoken");
const connDB = require("../config/database");
const BadRequestError = require("../exceptions/BadRequestError");
const InternalServerError = require("../exceptions/InternalServerError");
const NotFoundError = require("../exceptions/NotFoundError");

/**
 * Signup
 *
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
const signup = (req, res, next) => {
  const { user } = req.body;
  const {
    username,
    email,
    encrypted_password,
    phone,
    address,
    city,
    country,
    name,
    postcode,
  } = user;

  if (
    !username ||
    !email ||
    !encrypted_password ||
    !phone ||
    !address ||
    !city ||
    !country ||
    !name ||
    !postcode
  )
    throw new BadRequestError();

  const password = bcrypt.hashSync(encrypted_password, 10);
  const query = "INSERT INTO user SET ?";
  const values = {
    username,
    password,
    email,
    phone,
    country,
    city,
    postcode,
    name,
    address,
  };

  connDB.query(query, values, (error, results) => {
    if (error || !results.insertId) throw new InternalServerError();

    const { intertId: id } = results;
    const token = jsonwebtoken.sign({ id, username }, "secretOrPrivateKey");

    return res.json({ email, token, username });
  });
};

/**
 * Signin
 *
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
const signin = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) throw new BadRequestError();

  const query =
    "SELECT id, username, password FROM user WHERE email=? ORDER BY id DESC";
  const values = [email];

  connDB.query(query, values, (error, results) => {
    if (error) return new InternalServerError();
    else if (!results.length) return new NotFoundError("user not found.");

    const { id, username, password: encrypted_password } = results[0];
    const isValidPassword = bcrypt.compareSync(password, encrypted_password);

    if (!isValidPassword) return next(new NotFoundError("user not found."));

    const token = jsonwebtoken.sign({ id, username }, "secretOrPrivateKey");

    return res.json({ email, token, username });
  });
};

/**
 * Get All Users
 *
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
const getAllUsers = (req, res, next) => {
  connDB.query("SELECT * FROM user", (error, results) => {
    if (error) throw new InternalServerError();

    return res.json({
      data: results,
    });
  });
};

module.exports = { signup, signin, getAllUsers };

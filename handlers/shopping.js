const express = require("express");
const connDB = require("../config/database");
const BadRequestError = require("../exceptions/BadRequestError");
const InternalServerError = require("../exceptions/InternalServerError");
const NotFoundError = require("../exceptions/NotFoundError");

/**
 * Add Shopping
 *
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
const addShopping = (req, res, next) => {
  const { shopping } = req.body;
  const { name, createddate } = shopping;

  if (!name || !createddate) throw new BadRequestError();

  const query = "INSERT INTO shopping SET ?";
  const values = { Name: name, CreatedDate: createddate };

  connDB.query(query, values, (error, results) => {
    if (error || !results.insertId) return next(new InternalServerError());

    const { insertId: id } = results;

    return res.json({ id, name, createddate });
  });
};

/**
 * Get All Shopping
 *
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
const getAllShopping = (req, res, next) => {
  connDB.query("SELECT * FROM shopping", (error, results) => {
    if (error) return next(new InternalServerError());

    return res.json({
      data: results.map(({ id, Name, CreatedDate }) => ({
        id: id,
        name: Name,
        createddate: CreatedDate,
      })),
    });
  });
};

/**
 * Find Shopping By Id
 *
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
const findShoppingById = (req, res, next) => {
  const { id } = req.params;

  const query = "SELECT * FROM shopping WHERE id=?";
  const values = [id];

  connDB.query(query, values, (error, results) => {
    if (error) return next(new InternalServerError());
    else if (!results.length) return next(new NotFoundError("shopping ID not found."));

    const { id, Name: name, CreatedDate: createddate } = results[0];

    return res.json({ id, name, createddate });
  });
};

/**
 * Update Shopping By Id
 *
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
const updateShoppingById = (req, res, next) => {
  const { id } = req.params;
  const { name, createddate } = req.body;

  if (!name || !createddate) throw new BadRequestError();

  const query = "UPDATE shopping SET Name=?, CreatedDate=? WHERE id=?";
  const values = [name, createddate, id];

  connDB.query(query, values, (error, results) => {
    if (error) return next(new InternalServerError());
    else if (!results.affectedRows)
      return next(new NotFoundError("shopping ID not found."));

    return res.json({ id, name, createddate });
  });
};

/**
 * Delete Shopping By Id
 *
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
const deleteShoppingById = (req, res, next) => {
  const { id } = req.params;

  const query = "DELETE FROM shopping WHERE id=?";
  const values = [id];

  connDB.query(query, values, (error, results) => {
    if (error) return next(new InternalServerError());
    else if (!results.affectedRows)
      return next(new NotFoundError("shopping ID not found."));

    return res.status(200).json();
  });
};

module.exports = {
  addShopping,
  getAllShopping,
  findShoppingById,
  updateShoppingById,
  deleteShoppingById,
};

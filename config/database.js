const mysql = require("mysql");

const connDB = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PWD,
  database: process.env.DB_NAME,
});

connDB.connect((error) => {
  if (error) return console.log(error);
  console.log("Mysql Connected!");
});

module.exports = connDB;

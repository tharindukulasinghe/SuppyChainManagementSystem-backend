const express = require("express");
const app = express();
const mysql = require("mysql");
const port = 3000 || process.env.port;

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "supplychainmanagement"
});

connection.connect(err => {
  console.log(err);
});

app.listen(port, () => {
  console.log(`Server is running at port ${port}`);
});

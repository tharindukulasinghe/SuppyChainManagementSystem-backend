const express = require("express");
const router = express.Router();
const database = require("../database/db");
const jwt = require("jsonwebtoken");
const cors = require("cors");

router.use(cors());

router.get("/shippedorders", (req, res) => {
  var appData = {};

  database.query(
    "SELECT * from orders WHERE delivery_state='shipped'",
    (err, rows, fields) => {
      if (err) {
        appData.error = 1;
        appData["data"] = err;
        res.status(400).json(appData);
      } else {
        appData.error = 0;
        appData["data"] = rows;
        res.status(200).json(appData);
      }
    }
  );
});

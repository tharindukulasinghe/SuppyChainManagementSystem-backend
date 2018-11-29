const express = require("express");
const router = express.Router();
const database = require("../database/db");
const jwt = require("jsonwebtoken");
const cors = require("cors");

router.use(cors());

router.post("/ordercomplete", (req, res) => {
  var appData = {};

  var data = {
    order_id: req.body.order_id
  };
  database.query(
    `UPDATE orders SET delivery_state = 'delivered' WHERE order_id='${
      data.order_id
    }'`,
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

module.exports = router;

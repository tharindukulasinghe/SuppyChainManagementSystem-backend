const express = require("express");
const router = express.Router();
const database = require("../database/db");
const jwt = require("jsonwebtoken");
const cors = require("cors");

router.use(cors());

//trigger
router.post("/new", (req, res) => {
  var appData = {};

  var data = {
    employee_id: req.body.employee_id,
    week_id: req.body.week_id,
    working_hours: req.body.working_hours
  };

  database.query(
    "INSERT INTO working_hours SET ?",
    data,
    (err, rows, fields) => {
      if (err) {
        appData.error = 1;
        appData["data"] = err;
        res.status(200).json(appData);
      } else {
        appData.error = 0;
        appData["data"] = rows;
        res.status(200).json(appData);
      }
    }
  );
});

module.exports = router;

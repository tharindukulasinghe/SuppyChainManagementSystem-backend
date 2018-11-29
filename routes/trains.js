const express = require("express");
const router = express.Router();
const database = require("../database/db");
const jwt = require("jsonwebtoken");
const cors = require("cors");

router.use(cors());

router.get("/all", (req, res) => {
  var appData = {};

  database.query("SELECT * from train_schedules", (err, rows, fields) => {
    if (err) {
      appData.error = 1;
      appData["data"] = err;
      res.status(200).json(appData);
    } else {
      appData.error = 0;
      appData["data"] = rows;
      res.status(200).json(appData);
    }
  });
});

router.post("/add", (req, res) => {
  var appData = {};

  var trainData = {
    schedule_number: req.body.id,
    name: req.body.name,
    time: req.body.leavingtime,
    destination: req.body.destination
  };

  database.query("INSERT INTO train_schedules SET ?", trainData, function(
    err,
    rows,
    fields
  ) {
    if (!err) {
      appData.error = 0;
      appData["data"] = "Train registered successfully!";
      res.status(201).json(appData);
    } else {
      appData.error = 1;
      appData["data"] = "Error Occured!";
      res.status(200).json(appData);
    }
  });
});

module.exports = router;

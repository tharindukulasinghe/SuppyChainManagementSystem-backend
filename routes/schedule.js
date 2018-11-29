const express = require("express");
const router = express.Router();
const database = require("../database/db");
const jwt = require("jsonwebtoken");
const cors = require("cors");

router.use(cors());

router.get("/truck_schedule", (req, res) => {
  var appData = {};

  database.query("SELECT * from truck_schedules", (err, rows, fields) => {
    if (err) {
      appData.error = 1;
      appData["data"] = err;
      res.status(400).json(appData);
    } else {
      appData.error = 0;
      appData["data"] = rows;
      res.status(200).json(appData);
    }
  });
});

//trigger
router.post("/new_truck_schedule", (req, res) => {
  var appData = {};

  var data = {
    schedule_id: req.body.schedule_id,
    truck_id: req.body.truck_id,
    driver_id: req.body.driver_id,
    driver_assistant_id: req.body.driver_assistant_id,
    route_number: req.body.route_number,
    time: req.body.time,
    date: req.body.date
  };

  database.query(
    "INSERT INTO truck_schedules SET ?",
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

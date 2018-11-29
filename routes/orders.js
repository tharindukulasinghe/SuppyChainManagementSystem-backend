const express = require("express");
const router = express.Router();
const database = require("../database/db");
const jwt = require("jsonwebtoken");
const cors = require("cors");

router.use(cors());

//trigger
router.post("/neworder", (req, res) => {
  var appData = {};
  var data = {
    order_id: req.body.order_id,
    route_number: req.body.route_number,
    customer_id: req.body.customer_id,
    date: req.body.date,
    store_id: req.body.store_id,
    time: req.body.time,
    total_cost: req.body.total_cost,
    delivery_state: req.body.delivery_state
  };

  database.query("INSERT INTO orders SET ?", data, (err, rows, fields) => {
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

router.get("/getUnassigned", (req, res) => {
  var appData = {};

  database.query(
    "SELECT * from orders WHERE delivery_state='package'",
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

router.get("/getTotalCapacity", (req, res) => {
  var appData = {};
  var id = req.query.order_id;
  console.log(id);
  database.query(
    "select sum(train_capacity_consumption*quantity) as sum from order_item natural join items where order_id=?",
    id,
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

router.post("/assign", (req, res) => {
  var appData = {};
  var order_id = req.body.order_id;
  var schedule_number = req.body.schedule_number;

  var data = {
    order_id: order_id,
    schedule_number: schedule_number,
    train_trip_number: Date.now()
  };

  database.query("INSERT INTO train_trips SET ?", data, function(
    err,
    rows,
    fields
  ) {
    if (!err) {
      appData.error = 0;
      appData["data"] = "Train registered successfully!";
      database.query(
        `UPDATE orders SET delivery_state ='processing' WHERE order_id ='${order_id}'`,
        (err, rows, fields) => {}
      );
      res.status(201).json(appData);
    } else {
      appData.error = 1;
      appData["data"] = err;
      res.status(200).json(appData);
    }
  });
});

router.post("/assignOrder", (req, res) => {
  var appData = {};
  var order_id = req.body.order_id;
  var schedule_number = req.body.schedule_number;

  var data = {
    order_id: order_id,
    schedule_number: schedule_number,
    train_trip_number: Date.now()
  };

  database.beginTransaction(function(err) {
    if (err) {
      throw err;
    }
    connection.query("INSERT INTO train_trips SET ?", data, function(
      err,
      result
    ) {
      if (err) {
        connection.rollback(function() {
          throw err;
        });
      }

      const log = result.insertId;

      connection.query(
        `UPDATE orders SET delivery_state ='processing' WHERE order_id ='${order_id}'`,
        log,
        function(err, result) {
          if (err) {
            connection.rollback(function() {
              throw err;
            });
          }
          connection.commit(function(err) {
            if (err) {
              connection.rollback(function() {
                throw err;
              });
            }
            appData.error = 0;
            appData["data"] = "Train registered successfully!";
            res.status(201).json(appData);
          });
        }
      );
    });
  });
});
module.exports = router;

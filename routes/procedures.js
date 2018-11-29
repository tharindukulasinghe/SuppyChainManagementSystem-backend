const express = require("express");
const router = express.Router();
const database = require("../database/db");
const jwt = require("jsonwebtoken");
const cors = require("cors");

router.use(cors());

router.get("/used_hours", (req, res) => {
  var sql = `CALL used_hours()`;

  database.query(sql, true, (error, results, fields) => {
    if (error) {
      return console.error(error.message);
    }
    //console.log(results[0]);
    res.status(200).json(results);
  });
});

router.get("/customer_order_report", (req, res) => {
  var sql = `CALL customer_order_report()`;

  database.query(sql, true, (error, results, fields) => {
    if (error) {
      return console.error(error.message);
    }
    //console.log(results[0]);
    res.status(200).json(results);
  });
});

router.get("/working_hours", (req, res) => {
  var sql = `CALL working_hours()`;

  database.query(sql, true, (error, results, fields) => {
    if (error) {
      return console.error(error.message);
    }
    //console.log(results[0]);
    res.status(200).json(results);
  });
});

router.get("/find_item_with_most_orders", (req, res) => {
  var sql = `CALL find_item_with_most_orders()`;

  database.query(sql, true, (error, results, fields) => {
    if (error) {
      return console.error(error.message);
    }
    //console.log(results[0]);
    res.status(200).json(results);
  });
});

router.get("/view_orders", (req, res) => {
  var id = req.query.id;

  var sql = `CALL view_orders(${id})`;

  database.query(sql, true, (error, results, fields) => {
    if (error) {
      return console.error(error.message);
    }
    //console.log(results[0]);
    res.status(200).json(results);
  });
});

router.get("/view_orders", (req, res) => {
  var id = req.query.id;

  var sql = `CALL view_orders(${id})`;

  database.query(sql, true, (error, results, fields) => {
    if (error) {
      return console.error(error.message);
    }
    //console.log(results[0]);
    res.status(200).json(results);
  });
});

router.get("/quarterly_sales_report", (req, res) => {
  var year = req.query.year;

  var sql = `CALL quarterly_sales_report(${year})`;

  database.query(sql, true, (error, results, fields) => {
    if (error) {
      return console.error(error.message);
    }
    //console.log(results[0]);
    res.status(200).json(results);
  });
});
module.exports = router;

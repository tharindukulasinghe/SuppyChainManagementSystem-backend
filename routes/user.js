const express = require("express");
const router = express.Router();
const database = require("../database/db");
const jwt = require("jsonwebtoken");
const cors = require("cors");

router.use(cors());

router.post("/login", (req, res) => {
  var appData = {};
  var input = { email: req.body.email, password: req.body.password };
  console.log(input);

  database.query("SELECT * FROM users WHERE email = ?", input.email, function(
    err,
    rows,
    fields
  ) {
    if (err) {
      appData.error = 1;
      appData["data"] = "Error Occured!";
      res.status(400).json(appData);
    } else {
      if ((rows.length = 1)) {
        if (rows[0]) {
          console.log(rows);
          if (rows[0].password == input.password) {
            var data = JSON.stringify(rows[0]);
            let token = jwt.sign(
              {
                payload: {
                  firstname: rows[0].firstname,
                  lastname: rows[0].lastname,
                  address: rows[0].Address,
                  email: rows[0].email,
                  type: rows[0].type
                }
              },
              "tharindu",
              {
                expiresIn: 1440
              }
            );
            appData.error = 0;
            appData["token"] = token;
            res.status(200).json(appData);
          } else {
            appData.error = 1;
            appData["data"] = "Email and Password does not match";
            res.status(200).json(appData);
          }
        } else {
          appData.error = 1;
          appData["data"] = "Email and Password does not match";
          res.status(200).json(appData);
        }
      } else {
        appData.error = 1;
        appData["data"] = "Email does not exists!";
        res.status(204).json(appData);
      }
    }
  });
});

module.exports = router;

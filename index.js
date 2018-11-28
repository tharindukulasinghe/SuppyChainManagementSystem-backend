const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const port = 3000 || process.env.port;
const users = require("./routes/user");
const database = require("./database/db");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/users", users);

database.connect(function(err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  console.log("connected as id " + database.threadId);
});

app.listen(port, () => {
  console.log(`Server is running at port ${port}`);
});

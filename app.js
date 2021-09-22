const express = require("express");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const mysql = require("mysql2");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;





const db = mysql.createConnection({
  host: "test4.czdxirnzvqzn.us-east-1.rds.amazonaws.com",
  port: "3306",
  user: "admin",
  password: "321Jishu",
  database: "TESTDB4",
});

db.connect((err) => {
  if (!err) {
    console.log("DB connection succeded");
  } else {
    console.log("connection failed");
  }
});




// Parsing middleware
// Parse application/x-www-form-urlencoded
// app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.urlencoded({ extended: true })); // New

// Parse application/json
// app.use(bodyParser.json());
app.use(express.json()); // New

// Static Files
app.use(express.static("public"));

// Templating Engine
app.engine("hbs", exphbs({ extname: ".hbs" }));
app.set("view engine", "hbs");

// Connection Pool
// You don't need the connection here as we have it in userController
// let connection = mysql.createConnection({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASS,
//   database: process.env.DB_NAME
// });

const routes = require("./server/routes/user");
app.use("/", routes);

app.listen(3001, () => console.log(`Listening on port ${port}`));

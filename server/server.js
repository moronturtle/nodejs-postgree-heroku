require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 4000;

const pool = require("./database");

const isProduction = process.env.NODE_ENV === "production";
const origin = {
  origin: isProduction ? "https://www.example.com" : "*",
};

app.use(cors(origin));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/authentication", require("./routes/jwtAuth"));
app.use("/dashboard", require("./routes/dashboard"));

app.get("/", (request, response) => {
  response.json({ info: "It works!" });
});

app.get("/test_query", (request, response) => {
  let q = "SELECT * FROM users ORDER BY user_id ASC";
  pool.query(q, (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
});
app.listen(port, () => {
  console.log(`running in port ${port}.`);
});

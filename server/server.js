require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3001;

const pool = require("./database");

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/authentication", require("./routes/jwtAuth"));
app.use("/dashboard", require("./routes/dashboard"));

app.get("/", (request, response) => {
  response.json({ info: "It works!" });
});

app.get("/test_query", async (request, response) => {
  try {
    const resultTestQuery = await pool.query(
      "SELECT * FROM users ORDER BY user_id ASC"
    );
    response.json(resultTestQuery.rows);
  } catch (err) {
    console.error(err.message);
  }
});

app.listen(port, () => {
  console.log(`running in port ${port}.`);
});

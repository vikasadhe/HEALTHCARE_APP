const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const db = require("./db");

const app = express();

app.use(cors());
app.use(bodyParser.json());

// API to save form data
app.post("/submit", (req, res) => {
  const { name, email, phone, role, message } = req.body;

  const sql = "INSERT INTO users (name, email, phone, role, message) VALUES (?, ?, ?, ?, ?)";

  db.query(sql, [name, email, phone, role, message], (err, result) => {
    if (err) {
      return res.status(500).send("Error saving data");
    }
    res.send("Data saved successfully");
  });
});
app.get("/summary", (req, res) => {
  const sql = "SELECT role, COUNT(*) as count FROM users GROUP BY role";

  db.query(sql, (err, result) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json(result);
  });
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
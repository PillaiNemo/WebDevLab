const express = require("express");
const path = require("path");
const { MongoClient } = require("mongodb");

const app = express();
const PORT = 3000;
const client = new MongoClient("mongodb://127.0.0.1:27017");

app.use(express.urlencoded({ extended: true }));

// Escape text before putting it in HTML
function esc(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

// Home page: registration form
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "home.html"));
});

// Form submission: store in MongoDB, then display from the database
app.post("/server", async (req, res) => {
  try {
    let skills = req.body.skills || [];
    if (!Array.isArray(skills)) skills = [skills];

    const user = {
      name: req.body.name,
      password: req.body.password,
      age: Number(req.body.age),
      mobile: req.body.mobile,
      email: req.body.email,
      gender: req.body.gender,
      state: req.body.state,
      skills: skills
    };

    const users = client.db("userDB").collection("users");
    const result = await users.insertOne(user);
    console.log("1 document inserted");

    // Read the same record back from the database
    const saved = await users.findOne({ _id: result.insertedId });

    res.send(`
<!DOCTYPE html>
<html>
<head>
  <title>User Submitted Details</title>
  <style>
    body { font-family: "Times New Roman", serif; color: #1a1aff; }
    h1 { text-align: center; text-decoration: underline; }
    table { margin: 0 auto; border-collapse: collapse; width: 400px; }
    td { border: 1px solid #999; padding: 8px 10px; }
  </style>
</head>
<body>
  <h1>User Submitted Details</h1>
  <table>
    <tr><td>Name</td><td>${esc(saved.name)}</td></tr>
    <tr><td>Password</td><td>${esc(saved.password)}</td></tr>
    <tr><td>Age</td><td>${esc(saved.age)}</td></tr>
    <tr><td>Mobile Number</td><td>${esc(saved.mobile)}</td></tr>
    <tr><td>Email</td><td>${esc(saved.email)}</td></tr>
    <tr><td>Gender</td><td>${esc(saved.gender)}</td></tr>
    <tr><td>State</td><td>${esc(saved.state)}</td></tr>
    <tr><td>Skills</td><td>${esc(saved.skills.join(", "))}</td></tr>
  </table>
</body>
</html>`);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error: " + err.message);
  }
});

// Connect to MongoDB, then start the server
async function start() {
  await client.connect();
  console.log("Connected to MongoDB");
  app.listen(PORT, () => {
    console.log("Server running at http://localhost:" + PORT);
  });
}
start();
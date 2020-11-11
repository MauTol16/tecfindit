const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const bodyParser = require("body-parser");
const app = express();
const mysql = require("mysql");

const PORT = 5000;
const saltRounds = 10;
//  ============= MIDDLEWARE
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(
//   cors({
//     origin: "http://localhost:3000",
//     credentials: true,
//   })
// );

// ==================
const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "password",
  database: "tecfindit-test",
});

app.get("/api/", (req, res) => {
  // // res.send("holsadfsa");
  const sqlInsertUser = "select * from posts";
  db.query(sqlInsertUser, (err, result) => {
    if (err) {
      console.log(err);
    }
    res.json(result);
  });
});

app.get("/api/post/:id", (req, res) => {
  const q = "select * from comments where postid = ?";
  db.query(q, req.params.id, (err, result) => {
    if (err) {
      console.log(err);
    }
    res.send(result);
  });
});

app.post("/api/signup/", (req, res) => {
  const name = req.body.registerName;
  const email = req.body.registerEmail;
  const password = req.body.registerPassword;

  const q = "select * from users where correo = ? ";
  db.query(q, email, (err, result) => {
    if (result.length > 0) {
      console.log("ya existe usuario con ese correo");
      res.send("email already registered");
    } else {
      const qq =
        "insert into users(nombreUsuario, correo, passw) values (?, ?, ?)";
      bcrypt.hash(password, saltRounds, (err, hash) => {
        db.query(qq, [name, email, hash], (err, resultx) => {
          console.log("usuario registrado");
          res.send("user registered");
        });
      });
    }
  });
});

app.listen(PORT, () => {
  console.log("running on port 5000");
});

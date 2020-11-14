const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const bodyParser = require("body-parser");
const app = express();
const mysql = require("mysql");
const cookieParser = require("cookie-parser");
const session = require("express-session");

const PORT = 5000;
const saltRounds = 10;
//  ============= MIDDLEWARE
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  session({
    key: "userId",
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 60 * 60 * 24 * 1000,
    },
  })
);

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
        if (err) {
          console.log(err);
        }

        db.query(qq, [name, email, hash], (err, result) => {
          console.log("usuario registrado");
          res.send("user registered");
        });
      });
    }
  });
});

app.get("/api/login", (req, res) => {
  if (req.session.user) {
    res.send({ loggedIn: true, user: req.session.user });
  } else {
    res.send({ loggedIn: false });
  }
});

app.post("/api/login/", (req, res) => {
  const email = req.body.loginEmail;
  const password = req.body.loginPassword;

  db.query("SELECT * FROM users WHERE correo = ?", email, (err, result) => {
    if (err) {
      res.send({ err: err });
    }

    if (result.length > 0) {
      bcrypt.compare(password, result[0].passw, (error, response) => {
        if (response) {
          req.session.user = result;
          console.log(req.session.user);
          res.send("logged in");
        } else {
          res.send({ message: "Wrong email or password." });
        }
      });
    } else {
      res.send({ message: "User doesn't exist." });
    }
  });
});

app.get("/api/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.log(err);
    }
    res.clearCookie("userId");
    res.send("user logged out");
  });
});

app.listen(PORT, () => {
  console.log("running on port 5000");
});

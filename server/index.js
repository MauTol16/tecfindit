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
  const sqlInsertUser = "select * from posts order by fecha desc";
  const q =
    "SELECT P.*, U.nombreUsuario FROM Posts P, Users U WHERE P.correo = U.correo order by fecha desc";
  db.query(q, (err, result) => {
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

/*myposts */
app.get("/api/myposts/", (req, res) => {
  if (req.session) {
    const correo = req.session.user[0].correo;
    const q = "SELECT P.*, U.nombreUsuario FROM Posts P, Users U WHERE P.correo = U.correo and U.correo = ? order by fecha desc";
    db.query(q, correo, (err, result) => {
      if (err) {
        console.log(err);
      }
      console.log(result);
      res.json(result);
    });
  }
});

app.post("/api/signup/", (req, res) => {
  const name = req.body.registerName;
  const email = req.body.registerEmail;
  const password = req.body.registerPassword;

  const q = "select * from users where correo = ? ";
  db.query(q, email, (err, result) => {
    if (result.length > 0) {
      console.log("ya existe usuario con ese correo");
      res.send("Email already registered");
    } else {
      const qq =
        "insert into users(nombreUsuario, correo, passw) values (?, ?, ?)";
      bcrypt.hash(password, saltRounds, (err, hash) => {
        if (err) {
          console.log(err);
        }

        db.query(qq, [name, email, hash], (err, result) => {
          console.log("usuario registrado");
          res.send("User succesfully registered");
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
    console.log(req.session);
    if (err) {
      console.log(err);
    }
    res.clearCookie("userId");
    res.send("user logged out");
  });
});

app.post("/api/createpost/", (req, res) => {
  if (req.session) {
    console.log(req.session);
    const email = req.session.user[0].correo;
    const objName = req.body.objName;
    const place = req.body.place;
    const date = req.body.fDate;
    const image = req.body.image;
    const tag = "Not Found";
    console.log(email);
    const q =
      "INSERT INTO posts(correo, tag, objectName, lugar, fecha,image) values (?, ?, ?, ?, ?, ?)";
    db.query(q, [email, tag, objName, place, date, image], (err, result) => {
      if (err) {
        console.log(err);
        res.send("error, post not created");
      }
      console.log(result);
      res.send("Post created");
    });
  } else {
    res.send("Access Unauthorized");
  }
});

app.listen(PORT, () => {
  console.log("running on port 5000");
});

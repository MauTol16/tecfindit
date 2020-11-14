import React, { Component } from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import {
  BrowserRouter as Router,
  Redirect,
  Switch,
  Route,
  Link,
} from "react-router-dom";

import Login from "./components/Login";
import SignUp from "./components/SignUp";
import CreatePost from "./components/CreatePost";
import Home from "./components/Home";
import Logout from "./components/Logout";
import axios from "axios";

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      posts: [],
      email: "",
      name: "",
    };
  }

  upd = () => {
    axios.get("/api/login").then((response) => {
      console.log("response: " + response.data);
      console.log(response.data);
      if (response.data.loggedIn === true) {
        console.log("im in");
        this.setState({
          email: response.data.user[0].correo,
          name: response.data.user[0].nombreUsuario,
        });
      } else {
        this.setState({
          email: "",
          name: "",
        });
      }
    });
  };

  componentDidMount() {
    this.upd();
  }

  componentDidUpdate() {
    this.upd();
  }

  render() {
    let logout;
    let login;

    if (this.state.email !== "") {
      logout = (
        <li className="nav-item">
          <Link className="nav-link" to={"/"}>
            <Logout />
          </Link>
        </li>
      );
      login = null;
    } else {
      login = (
        <li className="nav-item">
          <Link className="nav-link" to={"/login"}>
            Log in
          </Link>
        </li>
      );
      logout = null;
    }

    return (
      <Router>
        <div className="App">
          <nav className="navbar navbar-expand-lg navbar-light fixed-top">
            {" "}
            tecfind.it
            <div className="container">
              {/* <Link className="navbar-brand" to={"/sign-in"}>
                hola
              </Link> */}
              <div
                className="collapse navbar-collapse"
                id="navbarTogglerDemo02"
              >
                <ul className="navbar-nav ml-auto">
                  <li className="nav-item">
                    <Link className="nav-link" to={"/"}>
                      Home
                    </Link>
                  </li>
                  {logout}

                  {login}
                  <li className="nav-item">
                    <Link className="nav-link" to={"/signup"}>
                      Sign up
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to={"/createpost"}>
                      Create post
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </nav>

          <Switch>
            <Route exact path="/" component={Home} />
            {/* <Route path="/login" component={Login} /> */}
            <Route path="/login">
              {this.state.email !== "" ? <Redirect to="/" /> : <Login />}
            </Route>

            <Route path="/signup" component={SignUp} />
            <Route path="/createpost" component={CreatePost} />
          </Switch>
        </div>
      </Router>
    );
  }
}

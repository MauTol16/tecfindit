import React, { Component } from "react";
import axios from "axios";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";

export default class SignUp extends Component {
  constructor() {
    super();
    this.state = {
      registerName: "",
      registerEmail: "",
      registerPassword: "",
      loginEmail: "",
      loginPassword: "",
      success: "",
    };
  }

  signUp = (e) => {
    this.setState({ success: "" });
    e.preventDefault();
    axios
      .post("/api/signup", this.state, { withCredentials: true })
      .then((response) => {
        this.setState({ success: response.data });
        if (this.state.success === "User succesfully registered") {
          this.setState({ loginEmail: this.state.registerEmail });
          this.setState({ loginPassword: this.state.registerPassword });
          axios
            .post("/api/login", this.state, { withCredentials: true })
            .then((response) => {
              console.log(response.data);
              window.location.reload();
            });
        }
      });
  };

  render() {
    let successColor;
    if (this.state.success === "User succesfully registered") {
      successColor = "green";
    } else {
      successColor = "red";
    }
    return (
      <div className="auth-wrapper">
        <div className="auth-inner">
          <form>
            <h3>Sign Up</h3>

            <div className="form-group">
              <label>Full name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Full name"
                onChange={(e) =>
                  this.setState({ registerName: e.target.value, success: "" })
                }
              />
            </div>

            <div className="form-group">
              <label>Email address</label>
              <input
                type="email"
                className="form-control"
                placeholder="Enter email"
                onChange={(e) =>
                  this.setState({ registerEmail: e.target.value, success: "" })
                }
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Enter password"
                onChange={(e) =>
                  this.setState({
                    registerPassword: e.target.value,
                    success: "",
                  })
                }
              />
            </div>
            <p style={{ color: successColor, paddingBottom: "5px" }}>
              {this.state.success}
            </p>
            <button
              type="submit"
              className="btn btn-primary btn-block"
              onClick={this.signUp}
            >
              Sign Up
            </button>
            <p className="forgot-password text-right">
              Already registered <a href="/login">sign in?</a>
            </p>
          </form>
        </div>
      </div>
    );
  }
}

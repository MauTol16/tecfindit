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
    };
  }

  signUp = (e) => {
    e.preventDefault();
    axios.post("/api/signup", this.state).then((response) => {
      alert(response.data);
    });
  };

  render() {
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
                  this.setState({ registerName: e.target.value })
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
                  this.setState({ registerEmail: e.target.value })
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
                  this.setState({ registerPassword: e.target.value })
                }
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary btn-block"
              onClick={this.signUp}
            >
              Sign Up
            </button>
            <p className="forgot-password text-right">
              Already registered <a href="#">sign in?</a>
            </p>
          </form>
        </div>
      </div>
    );
  }
}

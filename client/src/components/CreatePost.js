import React, { Component } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

export default class CreatePost extends Component {
  constructor(props) {
    super(props);
    let temp = this.formatDate(new Date());
    this.state = {
      objName: "",
      place: "",
      date: new Date(),
      image: "",
      fDate: temp,
      name: "",
      email: "",
      ok: false,
    };
  }

  upd = () => {
    axios.get("/api/login").then((response) => {
      // console.log("response: " + response.data);
      // console.log(response.data);
      if (response.data.loggedIn === true) {
        // console.log("im in");
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
  componentDidUpdate(prevProps, prevState) {
    if (prevState.email !== this.state.email) {
      this.upd();
    }
  }

  formatDate = (date) => {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  };

  onChange = (d) => {
    let temp = this.formatDate(d);
    this.setState({
      fDate: temp,
      date: d,
    });
  };

  createpost = (e) => {
    e.preventDefault();
    axios
      .post("/api/createpost", this.state, { withCredentials: true })
      .then((response) => {
        alert(response.data);
        if (response.data) {
          window.location.href = "/";
        }
      });
  };

  getImageURL = (e) => {
    const id = `Client-ID ${process.env.REACT_APP_CLIENT_ID}`;
    const data = new FormData();
    data.append("image", e.target.files[0]);
    const config = {
      headers: {
        "Content-type": "application/x-www-form-urlencoded",
        Authorization: id,
      },
    };
    axios.post("https://api.imgur.com/3/image", data, config).then((resp) => {
      this.setState({
        image: resp.data.data.link,
      });
    });
  };

  render() {
    return (
      <div className="auth-wrapper">
        <div className="auth-inner">
          <form>
            <h3>Create Post</h3>

            <div className="form-group">
              <label>Object name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter object name"
                onChange={(e) => {
                  this.setState({
                    objName: e.target.value,
                  });
                }}
              />
            </div>

            <div className="form-group">
              <label>Place</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter place description"
                onChange={(e) => {
                  this.setState({
                    place: e.target.value,
                  });
                }}
              />
            </div>

            <div className="form-group">
              <label>Date found</label>
              <br></br>
              <DatePicker
                className="form-control"
                selected={this.state.date}
                onChange={this.onChange}
              />
            </div>

            <div className="form-group">
              <label>Image</label>{" "}
              <small className="text-muted">
                wait 3 seconds for image to load
              </small>
              <input
                type="file"
                className="form-control"
                onChange={this.getImageURL}
              />{" "}
            </div>

            <button
              type="submit"
              className="btn btn-primary btn-block btnCreate"
              onClick={this.createpost}
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  }
}

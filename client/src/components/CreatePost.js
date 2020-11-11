import React, { Component } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
export default class CreatePost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
    };
  }

  onChange = (d) => {
    this.setState({
      date: d,
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
              />
            </div>

            <div className="form-group">
              <label>Place</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter place description"
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

            <button type="submit" className="btn btn-primary btn-block">
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  }
}

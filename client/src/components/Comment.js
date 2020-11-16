import React, { Component } from "react";
import "./Post.css";

export default class Comment extends Component {
  formatDate = (date) => {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();
    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  };

  render() {
    return (
      <div className="social-comment">
        <a className="pull-left">
          <img src="https://fertilitynetworkuk.org/wp-content/uploads/2017/01/Facebook-no-profile-picture-icon-620x389.jpg" />
        </a>
        <div className="media-body">
          <a href="#">{this.props.correo}</a>
          <br />
          {this.props.texto}
          <br />
          <a className="small">
            <i className="fa fa-thumbs-up"></i> 26 Like this!
          </a>{" "}
          -
          <small className="text-muted">
            {this.formatDate(this.props.fecha)}
          </small>
        </div>
      </div>
    );
  }
}

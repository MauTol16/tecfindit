import React, { Component } from "react";
import "./Post.css";

export default class Comment extends Component {
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
          -<small className="text-muted">{this.props.fecha}</small>
        </div>
      </div>
    );
  }
}

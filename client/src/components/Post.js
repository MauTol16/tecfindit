import React, { Component } from "react";
import axios from "axios";
import "./Post.css";
import Comment from "./Comment";
import CreateComment from "./CreateComment";

export default class Post extends Component {
  constructor() {
    super();
    this.state = {
      comments: [],
    };
  }

  componentDidMount() {
    axios.get(`/api/post/${this.props.postID}`).then((response) => {
      this.setState({
        comments: response.data,
      });
    });
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

  deletePost = () => {
    axios
      .delete("/api/post", { data: { postID: this.props.postID } })
      .then((response) => {
        window.location.reload();
      });
  };

  render() {
    let delButton;
    let createComment;

    // if user logged is the same creator of the post
    if (this.props.email == this.props.correo) {
      delButton = (
        <button className="pull-right social-action" onClick={this.deletePost}>
          Delete{" "}
        </button>
      );
    } else {
      delButton = null;
    }

    if(this.props.email != "") {
      createComment = (
        <div className="social-footer">
          <CreateComment
            postID={this.props.postID}
          />
        </div>
      );
    }
    else {
      createComment = null;
    }

    return (
      <div>
        <div className="container">
          <div className="col-md-7">
            <div className="social-feed-separated">
              <div className="social-avatar">
                <a>
                  <img
                    alt="image"
                    src="https://www.kindpng.com/picc/m/24-248253_user-profile-default-image-png-clipart-png-download.png"
                  />
                </a>
              </div>

              <div className="social-feed-box" style={{ width: "650px" }}>
                {/* <div className="pull-right social-action dropdown">
                  <button
                    data-toggle="dropdown"
                    className="dropdown-toggle btn-white"
                  >
                    <i className="fa fa-angle-down"></i>
                  </button>
                  <ul className="dropdown-menu m-t-xs">
                    <li>
                      <a>Config</a>
                    </li>
                  </ul>
                </div> */}
                {delButton}
                <div className="social-avatar">
                  <a>{this.props.nombreUsuario}</a>
                </div>
                <div className="social-body">
                  <p>{this.props.objectName}</p>

                  <small>
                    <a> Status: {this.props.tag} </a> <br />
                    <a>Place: {this.props.lugar} </a> <br />
                    <a>Date found: {this.formatDate(this.props.fecha)} </a>
                  </small>

                  <img
                    src={this.props.image}
                    className="img-responsive img-size"
                  />
                </div>
                {createComment}
                <div className="social-footer">
                  {this.state.comments.map((comment) => {
                    return (
                      <Comment
                        key={comment.commentid}
                        commentid={comment.commentid}
                        correo={comment.correo}
                        postid={comment.postid}
                        fecha={comment.fecha}
                        texto={comment.texto}
                        tag={comment.tag}
                      />
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

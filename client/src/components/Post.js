import React, { Component } from "react";
import axios from "axios";
import "./Post.css";
import Comment from "./Comment";

export default class Post extends Component {
  constructor() {
    super();

    this.state = {
      comments: [],
    };
  }

  componentDidMount() {
    axios.get(`/api/post/${this.props.postID}`).then((response) => {
      console.log("holaaaa");
      console.log(response.data);
      this.setState({
        comments: response.data,
      });
    });
  }

  render() {
    return (
      <div>
        <div className="container">
          <div className="col-md-7">
            <div className="social-feed-separated">
              <div className="social-avatar">
                <a>
                  <img
                    alt="image"
                    src="https://fertilitynetworkuk.org/wp-content/uploads/2017/01/Facebook-no-profile-picture-icon-620x389.jpg"
                  />
                </a>
              </div>

              <div className="social-feed-box" style={{ width: "650px" }}>
                <div className="pull-right social-action dropdown">
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
                </div>
                <div className="social-avatar">
                  <a>{this.props.correo}</a>
                  <small className="text-muted">{this.props.fecha}</small>
                </div>
                <div className="social-body">
                  <p>{this.props.objectName}</p>
                  <img
                    src="https://pm1.narvii.com/7636/c4fac5df831105dff383b0518f9e7f45301229a5r1-720-734v2_00.jpg"
                    className="img-responsive"
                  />
                  <div className="btn-group">
                    <button className="btn btn-white btn-xs">
                      <i className="fa fa-thumbs-up"></i> Like this!
                    </button>
                    <button className="btn btn-white btn-xs">
                      <i className="fa fa-comments"></i> Comment
                    </button>
                    <button className="btn btn-white btn-xs">
                      <i className="fa fa-share"></i> Share
                    </button>
                  </div>
                </div>
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

import React, { Component } from "react";
import axios from "axios";
// import "./Home.css";
import Post from "./Post";

export default class MyPosts extends Component {
  constructor() {
    super();
    this.state = {
      posts: [],
      name: "",
      email: "",
    };
  }

  upd = () => {
    axios.get("/api/login").then((response) => {
      if (response.data.loggedIn === true) {
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
    axios.get("/api/myposts").then((response) => {
      this.setState({
        posts: response.data,
      });
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.email !== this.state.email) {
      this.upd();
    }
  }

  render() {
    return (
      <div style={{ marginTop: "100px" }}>
        <h1 className="post-title">My posts</h1>

        {this.state.posts && this.state.posts.length > 0 ? (
          <div className="postStyle">
            {this.state.posts.map((post) => {
              return (
                <Post
                  key={post.postID}
                  postID={post.postID}
                  correo={post.correo}
                  tag={post.tag}
                  objectName={post.objectName}
                  lugar={post.lugar}
                  fecha={post.fecha}
                  image={post.image}
                  nombreUsuario={post.nombreUsuario}
                  email={this.state.email}
                />
              );
            })}
          </div>
        ) : (
          <h2 className="no-posts">You have no posts 😖</h2>
        )}
      </div>
    );
  }
}

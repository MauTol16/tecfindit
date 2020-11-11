import React, { Component } from "react";
import axios from "axios";
// import "./Home.css";
import Post from "./Post";

export default class Home extends Component {
  constructor() {
    super();
    this.state = {
      posts: [],
    };
  }

  componentDidMount() {
    axios.get("/api/").then((response) => {
      this.setState({
        posts: response.data,
      });
    });
  }

  render() {
    return (
      <div style={{ marginTop: "100px" }}>
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
            />
          );
        })}
      </div>
    );
  }
}

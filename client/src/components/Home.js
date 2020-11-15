import React, { Component } from "react";
import axios from "axios";
// import "./Home.css";
import Post from "./Post";

export default class Home extends Component {
  constructor() {
    super();
    this.state = {
      posts: [],
      email: "",
      name: "",
    };
  }

  componentDidMount() {
    axios.get("/api/login").then((response) => {
      console.log("response: " + response.data);
      console.log(response.data);
      if (response.data.loggedIn === true) {
        console.log("im in");
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

    axios.get("/api/").then((response) => {
      this.setState({
        posts: response.data,
      });
    });
  }

  render() {
    return (
      <div style={{ marginTop: "100px" }}>
        <h1 className="post-title">{"Welcome " + this.state.name}</h1>
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

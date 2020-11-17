import React, { Component } from "react";
import axios from "axios";
// import "./Home.css";
import Post from "./Post";

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      posts: [],
      email: "",
      name: "",
      search: "",
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
    axios.get("/api/").then((response) => {
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

  //Search bar
  updateSearch(event) {
    this.setState({ search: event.target.value });
  }

  render() {
    let filteredPosts = this.state.posts.filter((post) => {
      return (
        post.objectName
          .toLowerCase()
          .indexOf(this.state.search.toLowerCase()) !== -1
      );
    });
    return (
      <div style={{ marginTop: "100px" }}>
        <h1 className="post-title">{"Welcome " + this.state.name}</h1>

        <br />
        <input
          type="text"
          icon="search"
          placeholder="Search object type"
          value={this.state.search}
          onChange={this.updateSearch.bind(this)}
        />
        <br />
        <br />

        {filteredPosts.map((post) => {
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
    );
  }
}

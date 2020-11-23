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
      searchTag: false,
      Tag: "",
      filteredPosts: [],
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
        filteredPosts: response.data,
      });
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.email !== this.state.email) {
      this.upd();
    }
  }

  // Filtering with Search bar
  updateSearch(event) {
    this.setState({ search: event.target.value });
    
    this.setState({
      filteredPosts: this.state.filteredPosts.filter((post) => {
        return (
          post.objectName
            .toLowerCase()
            .indexOf(this.state.search.toLowerCase()) !== -1
        );
      }),
    });

    if(event.target.value === ""){
      this.setState({ filteredPosts: this.state.posts });
    }
  }

  //Fitering for tags
  handleTag = (e) => {
    console.log(e.target.value);
    this.state.searchTag = true;
    this.state.Tag = e.target.value;

    this.setState({ search: "" })

    if (e.target.value === "All" ) {
      this.setState({ filteredPosts: this.state.posts });
    } else {
      this.setState({
        filteredPosts: this.state.posts.filter(
          (item) => item.tag === e.target.value
        ),
      });
    }

  };

  //Fitering for tags
  handlePlace = (e) => {
    console.log(e.target.value);

    this.setState({ search: "" })

    if (e.target.value === "All" ) {
      this.setState({ filteredPosts: this.state.posts });
    } else {
      this.setState({
        filteredPosts: this.state.posts.filter(
          (item) => item.lugar === e.target.value
        ),
      });
    }

  };

  render() {
    
    return (
      <div style={{ marginTop: "50px" }}>
        <div className="sidebar">
          <h3 className="text">Alt Search</h3>

          <div className="sideItemStyle">
            <p className="nameStyle"> Status </p>
            <div className="btns">
            <button className="btn" value="All" onClick={this.handleTag} autoFocus> All </button>
              <button className="btn" value="Open" onClick={this.handleTag}> Open </button>
              <button className="btn" value="Closed" onClick={this.handleTag}> Closed </button>
              <button className="btn" value="To be collected" onClick={this.handleTag}> To be collected </button>
            </div>
          </div>
          <div className="sideItemStyle">
            <p className="nameStyle"> Place </p>
            <div className="btns">
            <button className="btn" value="All" onClick={this.handlePlace}> All </button>
              <button className="btn" value="A2" onClick={this.handlePlace}> A2 </button>
              <button className="btn" value="A4" onClick={this.handlePlace}>  A4 </button>
              <button className="btn" value="Centrales" onClick={this.handlePlace}>  Centrales  </button>
              <button className="btn" value="Biblioteca" onClick={this.handlePlace}> Library </button>
            </div>
          </div>
        </div>

        <div className="postsMenu">
          <h1 className="post-title">{"Welcome " + this.state.name}</h1>
          <br></br>
          <div className = "barrita">
            <input class="search-box"
              type="text"
              icon="search"
              placeholder="Search object type"
              value={this.state.search}
              onChange={this.updateSearch.bind(this)}
            />
            <i class="fa fa-search"></i> 
          </div>
          <br />

          {this.state.filteredPosts.map((post) => {
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
      </div>
    );
  }
}

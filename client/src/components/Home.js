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
  }

  //Fitering for tags
  handleTag=(e)=>{
    console.log(e.target.value);
    this.searchTag = true;
    this.Tag = e.target.value;

    if (e.target.value === "All"){
      this.state.filteredPosts = this.state.posts;
    }
    else{
      this.state.filteredPosts=this.state.posts.filter(item=>item.Tag===e.target.value)
    }
      
    this.setState({ filteredPosts:filteredPosts});
  }

  render() {

    //Filters
    this.state.filteredPosts = this.state.posts.filter((post) => {
        return (
          post.objectName.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1
        );
    });
    return (
      <div style={{ marginTop: "50px" }}>

        <div className="sidebar" > 
            <h3 className = "text">Alt Search</h3>

             <div className = "sideItemStyle">
              <p className="nameStyle"> Tags </p>
                <div className= "btns">
                    <button className="btn" value="Open" onClick={this.handleTag}>Open</button>
                    <button className="btn" value="Closed" onClick={this.handleTag}>Closed</button>
                    <button className="btn" value="Not Found" onClick={this.handleTag}>Not Found</button>
                </div>
            </div>
            <div className = "sideItemStyle">
              <p className="nameStyle"> Place </p>
                <div className= "btns">
                    <button className="btn" value="A1" >A1</button>
                    <button className="btn" value="A4" >A4</button>
                    <button className="btn" value="Centrales" >Centrales</button>
                    <button className="btn" value="Library" >Library</button>
                </div>
            </div>
        </div>

        
        <div className = "postsMenu">
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

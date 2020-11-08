import React from "react";
import './App.css';

function App() {
  return (
  <div className="App">
    <h1 className="titulo">TecFind.it</h1>
    <div className="searchBar">
      <label>Search by object, tag or user</label>
      <input type="text" name="busquedaObjeto"/><button>Submit</button>
    </div>
    
  </div>

  
  );
}

export default App;

import logo from './logo.svg';
import './App.css';
import React, {Component} from "react";

let defaultStyle = {
  color: "black"
}

class Aggregate extends Component {
  render () {
    return (
      <div style={{...defaultStyle, display: "inline-block", padding: "10px"}}>
            <h2>Text</h2>
      </div>
    );
  }
}
class Filter extends Component {
  render ()
{
  return(
    <div>
      <img/>
      <input type="text" style={{margin:"10px"}}/>
      Filter
    </div>
  );
}}
class Playlists extends Component {
  render ()
  {
  return(
    <div style={{...defaultStyle, width: "25%", display: "inline-block"}}>
      <img/>
      <h3>Playlist Name</h3>
      <ul><li>Song1</li><li>Song2</li><li>Song3</li><li>Song4</li></ul>
    </div>
  )
  }
}

function App() {
  let name= "Tobi"
  let color= "green"
  return (
    <div className="App">
      <h1>Title</h1>
      <Aggregate/>
      <Aggregate/>
      <Filter/>
      <Playlists/>
      <Playlists/>
      <Playlists/>
      <Playlists/>

    </div>
  );
}

export default App;

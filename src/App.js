import logo from './logo.svg';
import './App.css';
import React, {Component} from "react";

let defaultStyle = {
  color: "white"
};
let fakeServerData = {
  user: {
    name: "Jasmin",
    playlists: [
      {
        name: "Sternenschweif",
        episodes: "12",
        songs: [{name: "Title1", duration: 210},
                {name: "Title2", duration: 270},
                {name: "Title3", duration: 180},
                {name: "Title4", duration: 210}]
      },
      {
        name: "Emmi von Candis",
        episodes: "14",
        songs: [{name: "Title1", duration: 110},
                {name: "Title2", duration: 270},
                {name: "Title3", duration: 180},
                {name: "Title4", duration: 210}]
      },
      {
        name: "Paw Patrol",
        episodes: "25",
        songs: [{name: "Title1", duration: 10},
                {name: "Title2", duration: 270},
                {name: "Title3", duration: 180},
                {name: "Title4", duration: 210}]
      },
      {
        name: "Conni",
        episodes: "200",
        songs: [{name: "Title1", duration: 510},
                {name: "Title2", duration: 270},
                {name: "Title3", duration: 180},
                {name: "Title4", duration: 210}]
      },
    ]
  }
};

class PlaylistCounter extends Component {
  render () {
    return (
      <div style={{...defaultStyle, display: "inline-block", padding: "10px"}}>
            <h2>{this.props.playlists 
                  && this.props.playlists.length} Playlists</h2>
      </div>
    );
  }
}
class HourCounter extends Component {
  render () {
    let allSongs = this.props.playlists.reduce((songs, eachPlaylist) => {
      return songs.concat(eachPlaylist.songs)
    }, [])
    let totalDuration = allSongs.reduce((sum, eachSong) => {
      return sum + eachSong.duration
    }, 0)
    return (
      <div style={{...defaultStyle, display: "inline-block", padding: "10px"}}>
            <h2>{Math.round(totalDuration/60)} minutes</h2>
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
class App extends Component {
  constructor() {
    super();
    this.state = {serverData: {}}
  }
  componentDidMount() {
    setTimeout(() => {  
    this.setState({serverData: fakeServerData});
  },1000);}
  render() {
  return (

    <div className="App" style={{"background-color":"grey"}}>
      {this.state.serverData.user ?
      <div>
      <h1>{this.state.serverData.user.name}'s Box</h1>
      
      <PlaylistCounter playlists={this.state.serverData.user && 
                    this.state.serverData.user.playlists}/>

      <HourCounter playlists={this.state.serverData.user && 
                    this.state.serverData.user.playlists}/>

      <Filter/>
      <Playlists/>
      <Playlists/>
      <Playlists/>
      <Playlists/>
      </div> : <h1>Loading</h1>
      }
    </div>
  )
}}

export default App;

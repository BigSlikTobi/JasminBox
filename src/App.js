import logo from './logo.svg';
import './App.css';
import React, {Component} from "react";
import Carousel, { Dots } from "@brainhubeu/react-carousel";
import "@brainhubeu/react-carousel/lib/style.css";

//added white as default text color
let defaultStyle = {
  color: "white",
};

//set fake server data to simulize a data source
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
                {name: "Test", duration: 210}]
      },
    ]
  }
};

//Counter of how much playlists are within the fakeServerData
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
//Counter of minutes of all playlists
class MinutesCounter extends Component {
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
//Playlist
class Playlists extends Component {
  render ()
  {
    let playlist = this.props.playlist
  return(
    <div style={{...defaultStyle, width: "25%", display: "inline-block"}}>
      <img/>
      <h3>{playlist.name}</h3>
      <ul>
      {playlist.songs.map(song => 
        <li>{song.name} {((song.duration/60).toFixed(2))} Min</li>)}
        </ul>
    </div>
  )
  }
}

//Carousel Test 
class Carousel extends Component {
  constructor () {
    super()
    this.state = {value: 0};
    this.onChange = this.onChange.blind(this);
  }
  onChange(value) {
    this.setState({ value });
  }

  render() {
    return(
      <div>
        <input type="number" value={this.state.value}
        onChange={e => this.onChange(parseInt(e.target.value || 0))}
        />
        <Carousel value={this.state.value} onChange={this.onChange}
        slides={
          [
            (<img src={"https://onma.de/wp-content/uploads/2016/12/Grafik-1URL2.jpg"}/>)
            (<img src={"https://onma.de/wp-content/uploads/2016/12/Grafik-1URL2.jpg"}/>)
            (<img src={"https://onma.de/wp-content/uploads/2016/12/Grafik-1URL2.jpg"}/>)

          ]}

          plugins={[
            "arrows",
            "clickToChange"
          ]}/>
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
  },500);}
  render() {
  return (

    <div className="App" style={{...defaultStyle, padding:"10px"}}>
      {this.state.serverData.user ?
      <div>
      <h1>{this.state.serverData.user.name}'s Box</h1>
      
      <PlaylistCounter playlists={this.state.serverData.user && 
                    this.state.serverData.user.playlists}/>

      <MinutesCounter playlists={this.state.serverData.user && 
                    this.state.serverData.user.playlists}/>

      <Carousel/>

      <Filter/>
      {
        this.state.serverData.user.playlists.map(playlist => 
          <Playlists playlist={playlist}/>)}
      </div> : <h1>Loading</h1>
      }
    
    </div>
  )
}}

export default App;

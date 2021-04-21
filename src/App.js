import logo from './logo.svg';
import './App.css';
import React, {Component} from "react";
import queryString from "query-string";
//import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel';
//import 'pure-react-carousel/dist/react-carousel.es.css';

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
      }
      
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
      <input type="text" style={{margin:"10px"}} 
        onKeyUp={event => this.props.onTextChange(event.target.value)}/>
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
    <div style={{...defaultStyle, width: "20%", display: "inline-block"}}>
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

//test carousel
/*{class Carousel extends React.Component {
  render() {
    return (
      <CarouselProvider
        naturalSlideWidth={100}
        naturalSlideHeight={125}
        totalSlides={3}
      >
         <Slider>
          <Slide index={0}>I am the first Slide.</Slide>
          <Slide index={1}>I am the second Slide.</Slide>
          <Slide index={2}>I am the third Slide.</Slide>
        </Slider>

        <ButtonBack>Back</ButtonBack>
        <ButtonNext>Next</ButtonNext>

      </CarouselProvider>
    );
  }
}}*/

class App extends Component {
  constructor() {
    super();
    this.state = {
      serverData: {},
      filterString: ""
    }
  }
  componentDidMount() {
    let parsed  = queryString.parse(window.location.search);
    let accessToken = parsed.access_token;
    console.log(accessToken);
    console.log(parsed);
    
    fetch("https://api.spotify.com/v1/me", {
      headers: {"Authorization": "Bearer " + accessToken}
    }).then(response => response.json())
      //.then(data => console.log(data))
      .then(data => this.setState({serverData: {user: {name: data.display_name}}}))
  

    fetch("https://api.spotify.com/v1/me/playlists", {
      headers: {"Authorization": "Bearer " + accessToken}
    }).then(response => response.json())
        .then(data => console.log(data))

  }

  render() {
    let playlistToRender = 
    this.state.serverData.user && 
    this.state.serverData.user.playlists 
      ? this.state.serverData.user.playlists.filter(playlist => 
        playlist.name.toLowerCase().includes(
          this.state.filterString.toLowerCase())) 
      : []
  return (
    
    <div className="App" style={{...defaultStyle, padding:"10px"}}>
      {this.state.serverData.user ?
      <div>
      <h1>{this.state.serverData.user.name}'s Box</h1>
 
    
      <PlaylistCounter playlists={playlistToRender}/>

      <MinutesCounter playlists={playlistToRender}/>

      <Filter onTextChange={text => this.setState({filterString: text})}/>
  
      {
        playlistToRender.map(playlist => 
        <Playlists playlist={playlist}/>)}


      </div> : <button onClick={()=>window.location="http:/localhost:8888/login"}
      style={{padding: "10px", "font-size": "30px"}}>Sign In</button>
      }


{/*<Carousel/>*/}

    </div>
  )
}}

export default App;

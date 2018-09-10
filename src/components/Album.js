import React, { Component } from 'react';
import albumData from './../data/albums';

class Album extends Component {
	constructor(props) {
		super(props);
		const album = albumData.find( album => {
			return album.slug === this.props.match.params.slug
		});
		
		this.state = {
			album: album,
			currentSong: album.songs[0],
			isPlaying: false,
			isPlayVisible: false,
		};		

		this.audioElement = document.createElement('audio');
		this.audioElement.src = album.songs[0].audioSrc;
	}

	play() {
		this.audioElement.play();
		this.setState({isPlaying: true });
	}

	pause() {
		this.audioElement.pause();
		this.setState({ isPlaying: false });
	}

	setSong(song) {
		this.audioElement.src = song.audioSrc;
		this.setState({ currentSong: song });
	}	

	handleSongClick(song) {
		const isSameSong = this.state.currentSong === song;
		const pauseButton = document.getElementsByClassName('icon ion-md-pause');
		if (this.state.isPlaying && isSameSong) {
			this.pause();
		} else {
			if (!isSameSong) { this.setSong(song); }
		this.play();	
		}
	}
	
	//added this but aren't actually using it as of yet. Just tested to make sure it worked.	
	togglePlayVisible () {
		this.setState({
			isPlayVisible: !this.state.isPlayVisible});
		console.log("working");
	}	
	


	render() {
		const hideButtonOrNumber = {
			display: "none"
		};
		const showButtonOrNumber = {
			display: "inline"
		};
		
		/*this needs work. I need to make it target just the "current playing" song but when I used this.setState(currentSong.innerHTML: style={hidButtonOrNumber}) as the "true" value return, currentSong was not defined. 
I'm guessing this is because it is on the render side. But when I made the function on the other side, the other variables weren't defined. I'm confused about how to keep the references connected.*/
		const showOrHideSongNumber = this.state.isPlaying === true ? hideButtonOrNumber : showButtonOrNumber;
		
		/*Similarly need help making this target just the (song, index) and not the entire list of songs. */
		const showPlayOnHover = this.state.isPlayVisible === true ? showButtonOrNumber: hideButtonOrNumber;
		
		/*As this is, it shows up for all when something plays. For all three of these, I need to figure out how to specifically reference songs by index.*/
		const showPauseOnPlay = this.state.isPlaying === true ? /*this doesn't work but I'd like it to ;) this.currentSong === song */ showButtonOrNumber: hideButtonOrNumber ;
 
		return (
			<section className="album">
				<section id="album-info">
					<img id="album-cover-art" src={this.state.album.albumCover} alt={this.state.album.title} />
					<div className="album-details">
						<h1 id="album-title">{this.state.album.title}</h1>
						<h2 className="artist">{this.state.album.artist}</h2>
						<div id="release-info">{this.state.album.releaseInfo}</div>
					</div>
				</section>
				<table id="song-list">
					<colgroup>
						<col id="song-number-column" />
						<col id="song-title-column" />
						<col id="song-duration-column" />
					</colgroup>
					<tbody>
						{	this.state.album.songs.map( (song, index) =>
							<tr className="song" key={index} onClick={() => this.handleSongClick(song)} onMouseEnter={() => this.togglePlayVisible(song, index)}> 		
		 						<span id="play-button" className="icon ion-md-play" style={showPlayOnHover}></span>
								<span id="pause-button" className="icon ion-md-pause" style={showPauseOnPlay}></span>
									<td id="song-number" style={showOrHideSongNumber}>Track {index}</td>
								<td id="song-title">{song.title}</td>
								<td id="song-duration">{song.duration} seconds</td>
							</tr>
							)
						}
					</tbody>
				</table>
			</section>
		);
	}
}

export default Album;

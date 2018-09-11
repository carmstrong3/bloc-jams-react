import React, { Component } from 'react';
import albumData from './../data/albums';
import PlayerBar from './PlayerBar';

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
			hoverSong: null,
			hoverStatus: false,
			currentTime: 0,
			duration: album.songs[0].duration,
			volume: .5,
		};		

		this.audioElement = document.createElement('audio');
		this.audioElement.src = album.songs[0].audioSrc;
		this.audioElement.volume = this.state.volume;
	}

	componentDidMount() {
		this.eventListeners = {
			timeupdate: e => {
				this.setState({ currentTime:this.audioElement.currentTime });
			},
			durationchange: e => {
				this.setState({ duration: this.audioElement.duration });
			}	
		};
		this.audioElement.addEventListener('timeupdate', this.eventListeners.timeupdate);
		this.audioElement.addEventListener('durationchange', this.eventListeners.durationchange);
	}

	componentWillUnmout() {
		this.audioElement.src = null;
		this.audioElement.removeEventListener('timeupdate', this.eventListeners.timeupdate);
		this.audioElement.removeEventListner('durationchange', this.eventListeners.durationchange);
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
		if (this.state.isPlaying && isSameSong) {
			this.pause();
		} else {
			if (!isSameSong) { this.setSong(song); }
		this.play();	
		}
	}
	
	handleTrack(song, index){
		if ((this.state.currentSong === song) && (this.state.isPlaying)){
			return <span className = 'ion-md-pause'></span>
		}	else if ((this.state.hoverSong === song)){
			return <span className = 'ion-md-play'></span>
		}	else {
			return <span>{`${index+1}`}</span>
		}
	} 
	
	showPlay (song) {
		this.setState({hoverSong: song});
		this.setState({hoverStatus : true});
	}	
	
	hidePlay (song) {
		this.setState({hoverSong : null});
		this.setState({hoverStatus: false});
	}
	
	handlePrevClick() {
		const currentIndex = this.state.album.songs.findIndex(song => this.state.currentSong === song);
		const newIndex = Math.max(0, currentIndex - 1);
		const newSong = this.state.album.songs[newIndex];
		this.setSong(newSong);
		this.play();
	}

	handleNextClick() {
		const currentIndex = this.state.album.songs.findIndex(song => this.state.currentSong === song);
		const indexLength = this.state.album.songs.length;
		const newIndex = Math.min(indexLength, currentIndex + 1);
		const newSong = this.state.album.songs[newIndex];
		this.setSong(newSong);
		this.play();
	}

	handleTimeChange(e) {
		const newTime = this.audioElement.duration * e.target.value;
		this.audioElement.currentTime = newTime;
		this.setState({ currentTime: newTime} ) ;
	}

	handleVolumeChange(e) {
		const newVolume = e.target.value;
		this.audioElement.volume = newVolume;
		this.setState({ volume: newVolume });
	}

	handleVolumeUp() {
		const volume = this.state.volume;
		const stepRate = 0.10;
		const newVolume = Math.min(1, (volume + stepRate));
		this.audioElement.volume = newVolume;
		this.setState({ volume: newVolume });
	}

	handleVolumeDown() {
		const volume = this.state.volume;
		const stepRate = 0.10;
		const newVolume = Math.max(0, (volume - stepRate));
		this.audioElement.volume = newVolume;
		this.setState({ volume: newVolume });
	}
	
		
	render() {
	const formatTime = (time) => {
		const sec_num = parseInt(time, 10);
		let minutes = Math.floor(sec_num / 60);
		let seconds = sec_num - (minutes * 60);
		if (seconds < 10) {seconds = "0"+seconds;}
		else if (isNaN(time)) { return "-:--"}
		return minutes+':'+seconds;				
}
	
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
							<tr className="song" key={index} onClick={() => this.handleSongClick(song)} onMouseEnter={() => this.showPlay(song, index)} onMouseLeave={() => this.hidePlay(song, index)}> 		
		 						<td>{this.handleTrack(song,index)}</td>
								<td>{song.title}</td>
								<td>{formatTime(song.duration)}</td>
							</tr>
							)
						}
					</tbody>
				</table>
				<PlayerBar 
					isPlaying={this.state.isPlaying} 
					currentSong={this.state.currentSong}
					currentTime={formatTime(this.audioElement.currentTime)}
					duration={formatTime(this.audioElement.duration)}
					volume={this.state.volume}
					handleSongClick={() => this.handleSongClick(this.state.currentSong)} 
					handlePrevClick={() => this.handlePrevClick()}
					handleNextClick={() => this.handleNextClick()}
					handleTimeChange={(e) => this.handleTimeChange(e)}
					handleVolumeChange={(e) => this.handleVolumeChange(e)}
					handleVolumeUp={() => this.handleVolumeUp()}
					handleVolumeDown={() => this.handleVolumeDown()}
				/>
			</section>
		);
	}
}

export default Album;

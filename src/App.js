import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import Landing from './components/Landing';
import Library from './components/Library';
import Album from './components/Album';
import './App.css';

class App extends Component {
  render() {
    return ( 
			<div className="App">
				<header>
					<nav id='header'>
        		<Link id='logo-link' to="/" >
          	<img id='logo' src="https://vignette.wikia.nocookie.net/clubpenguin/images/d/d7/Music_Jam2008.png/revision/latest?cb=20130825221428" alt="Jams! logo">
						</img>
				 		</Link>
        		<a id='brand-name'>Jams! Music Player</a>
        		<select id='language'>
          		<option value="0" selected>En</option>
          		<option value="2">Es</option>
							<option value="3">Fr</option>
        		</select>
					</nav>
				</header>
      	<main>
					<Route exact path="/" component={Landing} />
					<Route path="/library" component={Library} />
					<Route path="/album/:slug" component={Album} />
				</main>
				<footer>
       		<p className="created-by">Created by: Clifford Armstrong III</p>
      		<p className="contact-email">clifford.armstrong.3@gmail.com</p>
      		<p className="social-ask">Spread the word!</p>
      		<nav className="social-media">
         		<a href="facebook.com" className="fa fa-facebook" alt="facebook button"></a>
         		<a href="twitter.com" className="fa fa-twitter" alt="twitter button"></a>
      		</nav>
    		</footer>
			</div>
    );
  }
}

export default App;

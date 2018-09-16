import React from 'react';
import { Route, Link } from 'react-router-dom';
import Library from './Library';

const Landing = () => (
	<section className="landing">
		<h1 className="hero-title">All your Jams in one place!</h1>
		<section className="selling-points">
			<div className="point">
				<h2 className="point-title">Unlimited Streaming</h2>
				<p className="point-description">Listen to your favorite music with no ads</p>
			</div>
			<div className="point">
				<h2 className="point-title">Mobile Friendly</h2>
				<p className="point-description">Listen to anything you want, anywhere you want</p>
			</div>
			<div className="point">
				<h2 className="point-title">Privacy Focused</h2>
				<p className="point-description">Listen to your music without us listening to you</p>
			</div>
			<Link to='/library'><button className="browse-button">Browse Music</button></Link>
			<p className="terms-privacy"><a href="https://mockflow.com/terms/">Terms</a> and <a href="https://mockflow.com/privacy_policy/">Privacy Policy</a></p>
		</section>
	<Route path="/library" component={Library} />
	</section>
);

export default Landing;	

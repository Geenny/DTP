import React from 'react';
import Site from './components/react/Site';
import './App.css';
import './components/react/Site.css';
import EventDispathcer from './observer/EventDispatcher';

const eventDispatcher = new EventDispathcer();

function App() {
	return (
		<div className="app">
			<Site className="game-site" eventDispatcher={ eventDispatcher } />
		</div>
	);
}

export default App;

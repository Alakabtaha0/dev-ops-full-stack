import React, { useEffect, useState } from 'react';
import "./styles/master.css";
import NavBar from './components/NavBar';
import useWebSocket from 'react-use-websocket';

function App() {
	const { sendMessage, lastMessage } = useWebSocket('ws://localhost:8000', {
		onOpen: () => console.log('opened'),
		onClose: () => console.log('closed'),
	});

	useEffect(() => {
		if (lastMessage !== null) {
			console.log(lastMessage.data);
		}
	}, [lastMessage]);

	return (
		<div className="set-page">
			<NavBar />
		</div>
	);
}

export default App;

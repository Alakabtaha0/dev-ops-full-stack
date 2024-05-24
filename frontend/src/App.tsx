import React, { useEffect, useState } from 'react';
import "./styles/master.css";
import NavBar from './components/NavBar';
import useWebSocket from 'react-use-websocket';
import { Worker, Services } from './utils/types';

function App() {
	const { sendMessage, lastMessage } = useWebSocket('ws://localhost:8000', {
		onOpen: () => console.log('opened'),
		onClose: () => console.log('closed'),
	});
	const [services, setServices] = useState<Services>({} as Services);
	const [workers, setWorkers] = useState<Worker>({} as Worker);
	const [region, setRegion] = useState<string>('');

	useEffect(() => {
		if (lastMessage !== null) {
			const data = JSON.parse(lastMessage.data);
			console.log(data);
			setServices(data.services);
			setWorkers(data.worker);
			console.log(services, workers)
		}
	}, [lastMessage]);

	useEffect(() => {
		sendMessage(region);
	}, [region]);

	return (
		<div className="set-page">
			<NavBar currentRegion={region} setCurrentRegion={setRegion} />
		</div>
	);
}

export default App;

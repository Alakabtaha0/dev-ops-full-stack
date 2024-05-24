import React, { useEffect, useState } from 'react';
import "./styles/master.css";
import NavBar from './components/NavBar';
import useWebSocket from 'react-use-websocket';
import { Worker, Services } from './utils/types';

function App() {
	const [services, setServices] = useState<Services>({} as Services);
	const [workers, setWorkers] = useState<Worker>({} as Worker);
	const [region, setRegion] = useState<string>("");
	const { sendMessage, lastMessage } = useWebSocket('ws://localhost:8000', {
		onOpen: () => console.log('opened'),
		onClose: () => console.log('closed'),
	});
	

	useEffect(() => {
		if (lastMessage !== null) {
			const data = JSON.parse(lastMessage.data);
			setServices(data.services);
			setWorkers(data.worker);
			if (data.services.region !== region) {
				setRegion(data.services.region);
			}
		}
	}, [lastMessage]);

	useEffect(() => {
		if (region !== "") sendMessage(region);
	}, [region]);

	return (
		<div className="set-page">
			<NavBar currentRegion={region} setCurrentRegion={setRegion} />
		</div>
	);
}

export default App;

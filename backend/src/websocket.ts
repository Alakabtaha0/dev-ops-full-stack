import WebSocket, { WebSocketServer } from 'ws';
import { Server } from 'http';
import { v4 } from 'uuid';
import { initialConnection, sendDataToWebSocket, sendToTargetClient } from './utils/fetchData';
import { setLocation, currentLocation } from './utils/states';

// Clients Map
// Stores user and the WebSocket connection
const clients = new Map<string, WebSocket>();

// Initialize WebSocket
const initWebSocket = (server: Server) => {
    const wss: WebSocketServer = new WebSocket.Server({ server });

    // WebSocket connection
    wss.on('connection', (ws: WebSocket) => {
        console.log('Client connected'); // Log the connection

        const clientID = v4(); // Generate a unique client ID
        clients.set(clientID, ws); // Add the client to the map

        initialConnection(currentLocation, clientID); // Send data and the clientID to the client on initial connection

        // Fetch data from the API every 60 seconds and send it to the client
        const intervalData = setInterval(() => {
            sendDataToWebSocket(currentLocation, clientID);
        }, 5000);

        // Listen for messages (location changes) from the client and set the location
        ws.on('message', (message: string) => {
            const changeLocal = setLocation(message); // Set the location

            // Send data to the client on location change otherwise send an error
            if (changeLocal.success) {
                console.log(changeLocal.message);
                initialConnection(currentLocation, clientID); // Send data to the client on location change
            } else {
                sendToTargetClient(clientID, { error: changeLocal.message });
            }
        });

        ws.on('close', () => {
            clients.delete(clientID); // Remove the client from the map
            console.log('Client disconnected'); // Log the disconnection
            clearInterval(intervalData); // Clean up the interval
        });

        ws.on('error', (error) => {
            console.error(`WebSocket error with client ${clientID}:`, error);
        });
    });
}

export { initWebSocket, clients };

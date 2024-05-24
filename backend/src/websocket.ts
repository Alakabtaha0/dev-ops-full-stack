import WebSocket, { WebSocketServer } from 'ws';
import { Server } from 'http';



// Initialize WebSocket
const initWebSocket = (server: Server) => {

    const wss: WebSocketServer = new WebSocket.Server({ server });

    // WebSocket connection
    wss.on('connection', (ws: WebSocket) => {
        console.log('Client connected'); // Log the connection

        ws.on('message', (message: string) => {
            console.log(`Received message => ${message}`);
        });

        ws.on('close', () => {
            console.log('Client disconnected'); // Log the disconnection
        });
    });
}

export default initWebSocket;

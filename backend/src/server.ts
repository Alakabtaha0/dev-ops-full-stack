import express from 'express';
import cors from 'cors';
import {initWebSocket} from './websocket';
import { config } from 'dotenv';

config();

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 8000;

// Start the server
const server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`Websocket is running on ws://localhost:${PORT}`);
});

initWebSocket(server);

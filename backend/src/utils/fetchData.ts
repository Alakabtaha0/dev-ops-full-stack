import { WebSocket } from "ws";
import { clients } from "../websocket";

/**
 * Fetches data from the API for a given location and cleans it.
 * 
 * @async
 * @param {string} location - The location to fetch data for.
 * @returns {Promise<Object>} The cleaned data from the API, or an error object if the fetch fails.
 */
const fetchDataFromAPI = async (location: string) => {
    try {
        const response = await fetch(`https://data--${location}.upscope.io/status?stats=1`);
        const data = await response.json();
        return cleanData(data);
    } catch (err) {
        console.error(`Error fetching data from ${location} API point: `, err);
        return { error: err };
    }
}

/**
 * Cleans the raw data fetched from the API, extracting only the necessary information.
 * 
 * @param {Object} data - The raw data from the API.
 * @returns {Object} The cleaned data.
 */
const cleanData = (data: any) => {
    const cleanedData = {
        services: {
            status: data.status,
            region: data.region,
            redis: data.results.services.redis,
            database: data.results.services.database,
            serverCount: data.results.stats.servers_count,
            online: data.results.stats.online,
            session: data.results.stats.session,
            activeConnections: data.results.stats.server.active_connections,
            waitTime: data.results.stats.server.wait_time,
            cpuLoad: data.results.stats.server.cpu_load,
            timers: data.results.stats.server.timers,
            strict: data.strict,
            serverIssue: data.server_issue
        },
        worker: {
            name: data.results.stats.server.workers[0][0],
            workerInformation: data.results.stats.server.workers[0][1]
        }
    };
    return cleanedData;
}

/**
 * Fetches data from the API for a given location and sends it to a specified client.
 * 
 * @param {string} location - The location to fetch data for.
 * @param {string} clientID - The ID of the client to send data to.
 */
const sendDataToWebSocket = (location: string, clientID: string) => {
    fetchDataFromAPI(location).then(data => {
        sendToTargetClient(clientID, data);
    });
}

/**
 * Sends data to a client upon initial connection.
 * 
 * @async
 * @param {string} location - The location to fetch data for.
 * @param {string} clientID - The ID of the client to send data to.
 */
const initialConnection = async (location: string, clientID: string) => {
    const data = await fetchDataFromAPI(location);
    console.log('Initial data sent to client');
    sendToTargetClient(clientID, data);
};

/**
 * Sends data to a specific client identified by clientID.
 * 
 * @param {string} clientID - The ID of the client to send data to.
 * @param {Object} data - The data to send to the client.
 */
const sendToTargetClient = (clientID: string, data: any) => {
    const targetClient = clients.get(clientID);
    if (targetClient && targetClient.readyState === WebSocket.OPEN) {
        targetClient.send(JSON.stringify(data));
    } else {
        console.error('Client not found');
    }
}

export { fetchDataFromAPI, sendDataToWebSocket, initialConnection, sendToTargetClient };
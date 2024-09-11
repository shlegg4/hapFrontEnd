// index.js
import express from 'express';
import pkg from 'body-parser';
import router from './routes/index.js';
import dotenv from 'dotenv';
import cors from 'cors';
import http from 'http'
import createProxyServer from 'http-proxy';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Create a proxy server instance with WebSocket support enabled
const proxy = new createProxyServer({ ws: true });

// Middleware to parse incoming JSON requests
app.use(pkg.json());

app.use(
  cors({
    credentials: true,
    origin: [
      "http://localhost:3000",
      "http://localhost:8080",
      "http://localhost:8081",
    ],
  })
);



app.use('/', router());

// Create an HTTP server and attach the Express app
const server = http.createServer(app);

// Handle WebSocket upgrade requests by forwarding them to the FastAPI server
server.on('upgrade', (req, socket, head) => {
    proxy.ws(req, socket, head, { target: `${process.env.WEBSOCKET}` });
});

// Start the HTTP server
server.listen(PORT, () => {
    console.log(`Node.js server listening on port ${PORT}`);
});
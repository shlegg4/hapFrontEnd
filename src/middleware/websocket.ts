import express, { Request, Response, NextFunction } from 'express';
import WebSocket from 'ws';

interface CustomRequest extends Request {
    wsClient?: WebSocket;
  }

export const WebSocketMiddleware = (req: CustomRequest, res: Response, next: NextFunction) => {
    // Only create a WebSocket connection if it doesn't exist
    if (!req.wsClient) {
      const wsClient = new WebSocket(`${process.env.WEBSOCKET}`);
  
      // Attach WebSocket to the request object
      req.wsClient = wsClient;
  
      // Handle WebSocket open event
      wsClient.on('open', () => {
        console.log('Connected to WebSocket server');
      });
  
      // Handle WebSocket messages
      wsClient.on('message', (data: string) => {
        //console.log('Received message from WebSocket:', data);
      });
  
      // Handle WebSocket errors
      wsClient.on('error', (error) => {
        console.error('WebSocket error:', error);
      });
  
      // Handle WebSocket close event
      wsClient.on('close', () => {
        console.log('WebSocket connection closed');
      });
    }
  
    next();
  };
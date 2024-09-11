export const listenForTaskUpdates = (taskId) => {
    const ws = new WebSocket(`${process.env.WEBSOCKET}`); // Connect to FastAPI WebSocket
    // When the WebSocket connection is opened
    ws.onopen = () => {
        console.log('Connected to WebSocket, listening for updates for task:', taskId);
        ws.send(taskId); // Send the task ID to the WebSocket server to start tracking
    };
    // When a message is received from the WebSocket
    ws.onmessage = (event) => {
        const data = event.data;
        console.log(`Update for task ${taskId}:`, data);
    };
    // Handle WebSocket errors
    ws.onerror = (error) => {
        console.error('WebSocket error:', error);
    };
    // Handle WebSocket connection close
    ws.onclose = () => {
        console.log('WebSocket connection closed for task:', taskId);
    };
};

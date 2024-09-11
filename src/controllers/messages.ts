import WebSocket from "ws";


// Function to wait until WebSocket is open before sending the task ID
async function waitForWebSocket(wsClient: WebSocket): Promise<void> {
    return new Promise((resolve, reject) => {
        if (wsClient.readyState === WebSocket.OPEN) {
            resolve();
        } else {
            wsClient.on('open', () => {
                console.log('WebSocket connection opened.');
                resolve();
            });
            wsClient.on('error', (err) => {
                console.error('WebSocket error:', err);
                reject(err);
            });
        }
    });
}

// Function to listen for task progress
export async function listenForTaskProgress(wsClient: WebSocket | undefined, taskId: string, onComplete: () => void) {
    if (!wsClient) {
        console.error('WebSocket is undefined. Cannot send task ID.');
        return;
    }

    try {
        // Wait for the WebSocket to be open before sending
        await waitForWebSocket(wsClient);

        // Send the task ID to the WebSocket server
        console.log(`Sending task ID: ${taskId}`);
        wsClient.send(taskId);

        // Listen for WebSocket messages
        wsClient.on('message', (data: Buffer) => {
            const message = data.toString();
            try {
                const parsedData = JSON.parse(message);
                console.log('Received progress update:', parsedData);

                // Process the received message (e.g., check task_id, status, etc.)
                if (parsedData.task_id === taskId) {
                    if (parsedData.status.toString().trim() == 'SUCCESS') {
                        console.log(`Task ${taskId} is complete.`);
                        onComplete();
                    } else {
                        console.log(`Task ${taskId} progress: ${parsedData.status}`);
                    }
                }
            } catch (err) {
                console.error('Error parsing WebSocket message:', err);
            }
        });

    } catch (error) {
        console.error('Error with WebSocket:', error);
    }
}
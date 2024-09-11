import { Request, Response } from 'express';
import axios from 'axios';
import { listenForTaskProgress } from './messages.js';
import WebSocket from 'ws';


export const updateImage = async (req: Request, res: Response) => {
    try {
        const { image_url } = req.body;

        if (!image_url) {
            return res.status(400).send('Invalid request no file_path')
        }

        const result = await axios.post(`${process.env.URL}/update`, {
            image_url: image_url,
        });

        const taskId = result.data.task_id;

        return res.status(200).json({ task_id: taskId });
    } catch (error) {
        console.error('Error starting update task:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}

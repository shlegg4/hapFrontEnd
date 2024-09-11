import axios from 'axios';
export const imageSearch = async (req, res) => {
    try {
        const { image_url, boundary } = req.body;
        // Check if image_path is provided
        if (!image_url) {
            return res.status(400).send('Invalid request: no image_path provided');
        }
        // Check if boundary is a tuple (an array of exactly 4 numbers)
        if (!Array.isArray(boundary) || boundary.length !== 4 || !boundary.every((val) => typeof val === 'number')) {
            return res.status(400).send('Invalid request: boundary must be a tuple of 4 numbers');
        }
        // Call external service with image_path and boundary
        const result = await axios.post(`${process.env.URL}/search`, {
            image_url: image_url,
            boundary: boundary, // Cast to tuple type
        });
        const taskId = result.data.task_id;
        return res.status(200).json({ task_id: taskId });
    }
    catch (error) {
        console.error('Error starting image search task:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};
export const searchResult = async (req, res) => {
    try {
        const task_id = req.query.task_id;
        console.log(task_id);
        // Check if image_path is provided
        if (!task_id) {
            return res.status(400).send('Invalid request: no task_id provided');
        }
        // Call external service with image_path and boundary
        const result = await axios.get(`${process.env.URL}/search/result`, {
            params: {
                task_id: task_id
            }
        });
        return res.status(200).json({ result: result.data });
    }
    catch (error) {
        console.error('Error starting image search task:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

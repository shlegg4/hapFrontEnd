import { updateImage } from '../controllers/update.js';
// Route to update an image
export function update(router) {
    router.post('/update', updateImage);
}

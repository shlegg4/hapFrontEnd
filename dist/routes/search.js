import { imageSearch, searchResult } from '../controllers/search.js';
// Route to update an image
export function search(router) {
    router.post('/search', imageSearch);
    router.get('/search/result', searchResult);
}

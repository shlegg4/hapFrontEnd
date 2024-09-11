// routes/grpcRouter.js
import {Router} from 'express';
import { imageSearch, searchResult } from '../controllers/search.js';


// Route to update an image
export function search (router: Router){
  router.post('/search', imageSearch);
  router.get('/search/result', searchResult);
}


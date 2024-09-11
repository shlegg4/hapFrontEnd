// routes/grpcRouter.js
import {Router} from 'express';
import { updateImage } from '../controllers/update.js';

// Route to update an image
export function update (router: Router){
  router.post('/update', updateImage);
}


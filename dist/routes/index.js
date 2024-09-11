import { Router } from 'express';
import { update } from './update.js';
import { search } from './search.js';
export default () => {
    const router = Router();
    update(router);
    search(router);
    return router;
};

import { Router } from 'express';
import SearchController from '../controllers/search.controller';

const router = Router();

router
  .get(`/`,
    SearchController.searchFinder);
router
  .get('/find/:id/users',
    SearchController.getUser);
export default router;

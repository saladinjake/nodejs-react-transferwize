import { Router } from 'express';
import UserController from '../controllers/user.controller';
import RequestValidator from '../../../core/helpers/middlewares/request.middleware';
import authMiddleware from '../../../core/helpers/middlewares/auth.middleware';

const router = Router();
const validateRequest = RequestValidator();
router
  .post('/signup',
    validateRequest,
    UserController.signUp);
router
  .post('/signin',
   validateRequest,
    UserController.loginUser);


export default router;

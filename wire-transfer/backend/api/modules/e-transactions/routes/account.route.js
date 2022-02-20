import { Router } from 'express';
import AccountContoller from '../controllers/account.controller';

import RequestValidator from '../../../core/helpers/middlewares/request.middleware';
import authMiddleware from '../../../core/helpers/middlewares/auth.middleware';
import ParamsValidator from '../../../core/helpers/middlewares/params.middleware';
import PermissionMiddleware from '../../../core/helpers/middlewares/permission.middleware';



const router = Router();
const validateBody = RequestValidator();
const validateParams = ParamsValidator();


router
  .post('/accounts',
    authMiddleware,
    validateBody,
    AccountContoller.createBankAccount);

router
  .get('/accounts',
    authMiddleware,
    AccountContoller.fetchAllAccounts);

router
  .get('/accounts/:accountNumber',
    authMiddleware,
    validateParams,
    // PermissionMiddleware.strictAccountPermission,
    AccountContoller.getAccount);



router
  .delete('/accounts/:accountNumber',
    authMiddleware,
    validateParams,
      // PermissionMiddleware.strictAccountPermission,
    AccountContoller.deleteAccount);

router
  .get('/user/:email/accounts',
    authMiddleware,
    validateParams,
    // PermissionMiddleware.strictAccountPermission,
    AccountContoller.getAUserAccounts);




export default router;

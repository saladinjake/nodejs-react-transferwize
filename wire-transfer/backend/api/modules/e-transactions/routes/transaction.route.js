import { Router } from 'express';
import TransactionContoller from '../controllers/transaction.controller';

import RequestValidator from '../../../core/helpers/middlewares/request.middleware';
import ParamsValidator from '../../../core/helpers/middlewares/params.middleware';

import authMiddleware from '../../../core/helpers/middlewares/auth.middleware';
import PermissionMiddleware from '../../../core/helpers/middlewares/permission.middleware';



const router = Router();
const validateBody = RequestValidator();
const validateParams = ParamsValidator();


router
  .post('/transactions/:accountNumber/debit',
    authMiddleware,
    PermissionMiddleware.strictAccountPermission,
    validateParams,
    validateBody,
    TransactionContoller.debitUserAccount);

router
  .post('/transactions/:accountNumber/credit',
    authMiddleware,
    PermissionMiddleware.strictAccountPermission,
    validateParams,
    validateBody,
    TransactionContoller.creditUserAccount);

router
  .get('/accounts/:accountNumber/transactions',
    authMiddleware,
    validateParams,
    PermissionMiddleware.strictAccountPermission,
    TransactionContoller.getTransactions);

router
  .get('/transactions/:transactionId',
    authMiddleware,
    validateParams,
    PermissionMiddleware.strictTransactionPermission,
    TransactionContoller.getATransaction);

export default router;

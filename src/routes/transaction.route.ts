import express from 'express';
import { createTransaction } from '../controllers/user/transaction/createTransaction.controller';
import { validateBody } from '../middlewares/joi.middleware';
import { createTransactionSchema } from '../validator/transaction';

const transactionRouter = express.Router();

transactionRouter.post(
    '/',
    validateBody(createTransactionSchema),
    createTransaction
);

export default transactionRouter;

// src/middleware/decryptKeyValidator.ts
import { body } from 'express-validator';

const decryptKeyValidator = [
    body('encryptedData').notEmpty().withMessage('encryptedData is required'),
    body('password').notEmpty().withMessage('password is required'),
    body('amount').isNumeric().withMessage('amount must be a number'),
    body('wallet_addresss').notEmpty().withMessage('wallet_addresss is required'),
    body('recipientAddress').notEmpty().withMessage('recipientAddress is required'),
];

export default decryptKeyValidator;
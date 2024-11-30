import { body, validationResult } from "express-validator";
import { NextFunction, Request, Response } from "express";

const verifyValidator = [
    body('transactionId')
        .notEmpty().withMessage('Transaction ID is required')
        .isString().withMessage('Transaction ID must be a string'),
    body('walletAddress')
        .notEmpty().withMessage('Wallet address is required')
        .isString().withMessage('Wallet address must be a string'),

    (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400).json({ errors: errors.array() });
            return 
        }
        next();
    }
];

export default verifyValidator;
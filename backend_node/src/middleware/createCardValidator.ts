import { body, validationResult } from "express-validator";
import { Response, Request, NextFunction } from "express";

const createCardValidator = [
    body('password')
        .notEmpty().withMessage('Password is required')
        .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    body('walletAddress')
        .notEmpty().withMessage('Wallet address is required')
        .isLength({ min: 66, max: 66 }).withMessage('Wallet address must be 66 characters long'),

    (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400).json({ errors: errors.array() });
            return;
        }
        next();
    }
];

export default createCardValidator;
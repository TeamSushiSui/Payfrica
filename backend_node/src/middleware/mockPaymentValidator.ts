import { body, validationResult } from "express-validator";
import { NextFunction, Request, Response } from "express";

const mockPaymentValidator = [
    body('amount')
        .notEmpty().withMessage('Amount is required')
        .isNumeric().withMessage('Amount must be a number'),

    (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400).json({ errors: errors.array() });
            return 
        }
        next();
    }
];

export default mockPaymentValidator;
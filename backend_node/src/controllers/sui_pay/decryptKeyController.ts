import { Request, Response } from "express";
import { Wallet } from "./wallet";
import { validationResult } from "express-validator";

const decryptKeyController = async (req: Request, res: Response) => {
    const wallet = new Wallet();

    // Validate request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return 
    }

    const { encryptedData, password, amount, wallet_addresss, recipientAddress } = req.body;

    try {
        const result = await wallet.decryptKeyphrase(encryptedData, password, amount, wallet_addresss, recipientAddress);
        res.json({ message: 'Decryption successful', result });
    } catch (error) {
        console.error('Error decrypting keyphrase:', error);
        res.status(500).json({ message: 'Decryption failed' });
    }
};

export default decryptKeyController;
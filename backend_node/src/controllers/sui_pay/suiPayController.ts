import { Request, Response } from "express"
import { Wallet } from "./wallet"

const createCardController = async (req: Request, res: Response) => {
    const wallet = new Wallet()

    try {
        const { password, walletAddress} = req.body
        const result = await wallet.createWallet( password, walletAddress);
        res.json(result);

    } catch (error) {
        res.status(500).json({message:'create wallet failed'})
        
    }

}

export default createCardController;
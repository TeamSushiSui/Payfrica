import { Response, Request } from "express";
import 'dotenv/config';


import verifyTransactionByReference from "../../../ulits/checkTransaction";
import getNariaToUsdc from "../../../ulits/getCurrentRates";
import { sendUSDC } from "../../../ulits/send";
import UserTransaction from "../../models/transactionModel";
import { convertUSDC2NGN, convertNGN2USDC } from '../../../ulits/convert';
import { usdToNgnRate } from "../../../ulits/get_price";


const verifyController = async (req: Request, res: Response) => {
    console.log(req.body)
    const { transactionId, walletAddress } = req.body;

    // Check Transaction Id
    const transaction = await verifyTransactionByReference(transactionId);
    
    if (transaction.status == 'success') {
        const amountPaid = transaction.data.amount_settled
        // const amountSent =   getNariaToUsdc(amountPaid);
        const amountSent = await convertNGN2USDC(amountPaid)
        if (!amountSent) {
            res.status(500).json({message: `Please Contract customer service with the ID ${transactionId}`});
            return;
        }

        // send token to address
        const response = await sendUSDC(amountSent, walletAddress);
        if (response?.status == 'success') {
            const transactionDetails = {transactionId: transactionId,
                amountPaid: amountPaid,
                amountSent: amountSent,
                walletAddress: walletAddress,
            }
            // Make a db entry.
            // try {
            //     await UserTransaction.create(transactionDetails)
            // } catch (error) {
            //     console.log(error)
            //     throw new Error("error");
                
            // }
            // send success details.
            console.log(transactionDetails);
            res.status(200).json({message: 'success', ...transactionDetails})
        } else {
            res.status(500).json({message: `Please Contract customer service with the ID ${transactionId}`});
            return;
        }
    } else {
        res.status(400).json({message: `Transaction ID ${transactionId} is not valid`});
        return;
    }
}

export default verifyController;
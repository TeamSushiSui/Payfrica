import 'dotenv/config';
import { Response, Request } from 'express';
import Flutterwave from 'flutterwave-node-v3';
const flw = new Flutterwave(process.env.FLW_PUBLIC_KEY, process.env.FLW_SECRET_KEY);

const mockPaymentControllers = async (req: Request, res: Response) => {
    const { amount } = req.body
    const transactionId = await bank_trf(amount);
    if (transactionId) {
        res.status(200).json({message: "success", transactionId: transactionId})
        return;
    }

    res.status(500).json({message: "Can't mock pay at the moment"})

}

const bank_trf = async (amount: number) => {

    try {

        const payload = {
            "tx_ref": Date.now().toString(),
            "amount": amount.toString(),
            "email": "johnmadakin@gmail.com",
            // "phone_number": "054709929220",
            "currency": "NGN",
            "client_ip": "154.123.220.1",
            "device_fingerprint": "0xc299192a75ec5296b278953d6efa04f4f6337ad251b744cf437bae03846a1bf1",
            // "narration": "All star college salary for May",
            // "is_permanent": false,
            // "expires": 3600
        }

        const response = await flw.Charge.bank_transfer(payload)
        console.log(response);
        return payload.tx_ref
       

    } catch (error) {
        console.log(error)
    }
    // 489186
}

export default mockPaymentControllers;


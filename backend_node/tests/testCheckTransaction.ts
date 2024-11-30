import 'dotenv/config';
import Flutterwave from 'flutterwave-node-v3';
const flw = new Flutterwave(process.env.FLW_PUBLIC_KEY, process.env.FLW_SECRET_KEY);

const bank_trf = async () => {

    try {

        const payload = {
            "tx_ref": "MC-1585230950508",
            "amount": "1000",
            // "email": "johnmadakin@gmail.com",
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

    } catch (error) {
        console.log(error)
    }
    // 489186

}

bank_trf();


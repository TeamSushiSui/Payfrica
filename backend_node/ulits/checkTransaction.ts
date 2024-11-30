import axios from 'axios';
import 'dotenv/config';

// interface Customer {
//     id: number,
//     name: string,
//     phone_number: string,
//     email: string,
//     created_at: string

// }

// interface TransactionMeta {
//     originatoraccountnumber: string,
//     originatorname: string,
//     bankname: string,
//     originatoramount: string
// }

// // interface TransactionData {
// //     id: number,
// //     tx_ref: string,
// //     flw_ref: string,
// //     device_fingerprint: string,


// // }

interface TransactionDetails {
    status: string,
    message: string,
    data: any 
}

const verifyTransactionByReference = async (tx_ref :string): Promise<TransactionDetails> => {
    const url = `https://api.flutterwave.com/v3/transactions/verify_by_reference?tx_ref=${tx_ref}`;
    try {
        const response = await axios.get(url, {
            headers: {
                Authorization: `Bearer ${process.env.FLW_SECRET_KEY}`,
            },
        });
        console.log(response.data);
        return response.data;
    } catch (error) {
        // console.error(error.response ? error.response.data : error.message);
        console.log(error);
        return {status: 'failed', message: 'An error occur', data: ''};
    }
};

// Usage
// const tx_ref = "MC-1585230950508";
// verifyTransactionByReference(tx_ref);

export default verifyTransactionByReference;

// {
//     status: 'success',
//     message: 'Transaction fetched successfully',
//     data: {
//       id: 8227645,
//       tx_ref: 'MC-1585230950508',
//       flw_ref: '5668087577511732889829968',
//       device_fingerprint: '0xc299192a75ec5296b278953d6efa04f4f6337ad251b744cf437bae03846a1bf1',
//       amount: 1000,
//       currency: 'NGN',
//       charged_amount: 1000,
//       app_fee: 14,
//       merchant_fee: 0,
//       processor_response: 'success',
//       auth_model: 'AUTH',
//       ip: '54.75.161.64',
//       narration: 'George Alainengiya 1732674289304',
//       status: 'successful',
//       payment_type: 'bank_transfer',
//       created_at: '2024-11-29T14:17:17.000Z',
//       account_id: 2566324,
//       meta: {
//         originatoraccountnumber: '123*******90',
//         originatorname: 'JOHN DOE',
//         bankname: 'Access Bank',
//         originatoramount: 'N/A'
//       },
//       amount_settled: 986,
//       customer: {
//         id: 2540332,
//         name: 'Anonymous customer',
//         phone_number: '08012345678',
//         email: 'johnmadakin@gmail.com',
//         created_at: '2024-11-27T04:17:09.000Z'
//       }
//     }
//   }
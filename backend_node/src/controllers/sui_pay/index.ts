import { create } from "domain";
import { Wallet } from "./wallet";
import QRCode from 'qrcode';

interface QrCode{
    walletAddressPublicKey: string;
    encrypted_mnemonic: string;
}

const wallet = new Wallet()

async function transact(qr: QrCode, amount: number, password: string, recipientAddress: string){
    let qr_wallet_address = qr.walletAddressPublicKey;
    let qr_enc = qr.encrypted_mnemonic;

    const result = await wallet.decryptKeyphrase(qr_enc, password, amount, qr_wallet_address, recipientAddress);
    console.log(result);
}

async function createCard(password: string, wallet_address: string){
    const result = await wallet.createWallet(password, wallet_address);
    console.log(result);
}

// const qr = {
//     encrypted_mnemonic: '7f4be940f761475a52e14ab13799e781:2c9bbea8272fed94d66849e7c9d3da67:a0778a814e75920b8ab80acb4552a9798698c9580a4c99a9e47cc68a5cb54e6f00e7c88d00f430cb007436307edcd490bae957db0581b2fe7880e727cc30f833e02bb57c735ea0c37061caed607de129',
//     walletAddressPublicKey: '0x932c18eda3c9c40b7e418636ed2c7e06dd21f4932b9acbc0740fe6f12c62f05b-0xb4a70443acbad964b90e1709f03e2a0ed9e3aaf4268dca037df5c52eab495383'
// }
// const qr = createCard("1234", "0x932c18eda3c9c40b7e418636ed2c7e06dd21f4932b9acbc0740fe6f12c62f05b");
// transact(qr, "1", "1234", "0x932c18eda3c9c40b7e418636ed2c7e06dd21f4932b9acbc0740fe6f12c62f05b");



const qr = {
    encrypted_mnemonic: '7f4be940f761475a52e14ab13799e781:2c9bbea8272fed94d66849e7c9d3da67:a0778a814e75920b8ab80acb4552a9798698c9580a4c99a9e47cc68a5cb54e6f00e7c88d00f430cb007436307edcd490bae957db0581b2fe7880e727cc30f833e02bb57c735ea0c37061caed607de129',
    walletAddressPublicKey: '0x932c18eda3c9c40b7e418636ed2c7e06dd21f4932b9acbc0740fe6f12c62f05b-0xb4a70443acbad964b90e1709f03e2a0ed9e3aaf4268dca037df5c52eab495383'
};

// Convert the object to a JSON string
const qrData = JSON.stringify(qr);

// Generate a QR code
QRCode.toDataURL(qrData)
    .then((url) => {
        console.log('QR Code URL:', url);
        // You can use this URL in an <img> tag to display the QR code
    })
    .catch((err) => {
        console.error('Error generating QR code:', err);
    });

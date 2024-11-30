import { Ed25519Keypair } from '@mysten/sui/keypairs/ed25519';
import * as bip39 from 'bip39';
import { wordlist } from '@scure/bip39/wordlists/english';
import * as crypto from 'crypto';
import { Transaction } from '@mysten/sui/transactions';
import { SuiClient, getFullnodeUrl } from "@mysten/sui/client";
import { resolve4 } from 'dns';
import { checkCardBlocked, updateTrials, createUser, setNewCard } from '../db/crud.ts';
import { connectDB, disconnectDB } from '../db/database.ts';

export class Wallet {
    private async generate12WordMnemonic() {
        const entropy = crypto.randomBytes(16);
        const mnemonic = bip39.entropyToMnemonic(entropy.toString('hex'), wordlist);
        return mnemonic
    }

    async createWallet(password: string, wallet_address: string) {
        try {
            const mnemonic = await this.generate12WordMnemonic();
            console.log(mnemonic);
            const encrypted_mnemonic = this.encryptKeyphrase(mnemonic, password);
            const keypair = Ed25519Keypair.deriveKeypair(mnemonic);
            const publicKey = keypair.getPublicKey().toSuiAddress();
            connectDB();
            await createUser(wallet_address);
            await setNewCard(wallet_address, publicKey, encrypted_mnemonic);
            return {
                encrypted_mnemonic: encrypted_mnemonic,
                walletAddressPublicKey: `${wallet_address}-${publicKey}`
            }
        } catch (error) {
            console.error('Error creating wallet:', error.message || error);
            throw error;
        } finally {
            await disconnectDB();
        }
    }

    private generateKey(password: string, salt: string): Buffer {
        return crypto.scryptSync(password, salt, 32);
    }

    private encryptKeyphrase(keyphrase: string, password: string): string {
        const iv = crypto.randomBytes(16); 
        const salt = crypto.randomBytes(16).toString('hex'); 
        const key = this.generateKey(password, salt);

        const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
        let encrypted = cipher.update(keyphrase, 'utf8', 'hex');
        encrypted += cipher.final('hex');

        return `${iv.toString('hex')}:${salt}:${encrypted}`;
    }

    async decryptKeyphrase(encryptedData: string, password: string, amount, wallet_addresss, recipientAddress){
        try{
            const parts = wallet_addresss.split("-");
            const mainWallet_address = parts[0];
            const wallet_address = parts[1];

            const [ivHex, salt, encrypted] = encryptedData.split(':');
            const iv = Buffer.from(ivHex, 'hex');
            const key = this.generateKey(password, salt);

            const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
            let decrypted = decipher.update(encrypted, 'hex', 'utf8');
            decrypted += decipher.final('utf8');

            const decrypted_kp = Ed25519Keypair.deriveKeypair(decrypted);
            const decypted_address = decrypted_kp.getPublicKey().toSuiAddress();
            await connectDB();
            const card_blocked = await checkCardBlocked(mainWallet_address);
            if (card_blocked) {
                return "card blocked"
            }
            else if (decypted_address != wallet_address) {
                await updateTrials(mainWallet_address);
                return "invalid pin"
            }
            else {
                return await this.signAndExecuteTx(amount, decrypted, wallet_address, mainWallet_address, recipientAddress);
            }
        } catch (error) {
            console.log(error);
            return "invalid pin"
        } finally {
            await disconnectDB();
        }
    }

    private signAndExecuteTx = async (amt, phrase, wallet_address, mainWallet_address, recipientAddress) => {
        const amount = Number(amt) * 1000000;
        const tx = new Transaction();

        const rpc_url = getFullnodeUrl("devnet");
        const client = new SuiClient({ url: rpc_url });

        const { data: coins } = await client.getCoins({
            owner: wallet_address,
            coinType: "0x3198cfde449a429036b8e72bd1235ce55976c7ff31e0232e1c5a5698898a84ba::usdc::USDC",
        });

        if (coins.length === 0) {
            console.log("No USDC coins found");
            return "insufficient balance";
        }
        console.log(coins);
        const [coin] = tx.splitCoins(coins[0].coinObjectId, [amount]);
        tx.transferObjects([coin], tx.pure.address(recipientAddress));

        const keypair = Ed25519Keypair.deriveKeypair(phrase)
        try {
            const { objectChanges, balanceChanges } = await client.signAndExecuteTransaction({
                transaction: tx,
                signer: keypair,
                options: {
                    showBalanceChanges: true,
                    showEvents: true,
                    showInput: false,
                    showEffects: true,
                    showObjectChanges: true,
                    showRawInput: false,
                }
            });
            if (objectChanges) {
                await updateTrials(mainWallet_address);
                return true
            }
            else {
                await updateTrials(mainWallet_address);
                return false
            }
        } catch (error) {
            console.log(error);
            return false
        }
    }
}

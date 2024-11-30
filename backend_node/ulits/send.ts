import { SuiClient, getFullnodeUrl } from '@mysten/sui/client';
import { Transaction } from '@mysten/sui/transactions';
import { Ed25519Keypair } from '@mysten/sui/keypairs/ed25519';
import { convertUSDC2NGN, convertNGN2USDC } from './convert';

const rpc_url = getFullnodeUrl("devnet");

// Initialize the SuiClient
const suiClient = new SuiClient({ url: rpc_url });
const private_key = "manage sweet wrist urge coyote trade direct whale beef orient insane purse"
// Create a keypair for the sender
const senderKeypair = Ed25519Keypair.deriveKeypair(private_key);

// const USDC_TYPE = '0xa1ec7fc00a6f40db9693ad1415d0c193ad3906494428cf252621037bd7117e29::usdc::USDC';
const USDC_TYPE = '0x3198cfde449a429036b8e72bd1235ce55976c7ff31e0232e1c5a5698898a84ba::usdc::USDC'
// const USDC_TYPE = '0x2::sui::SUI';

export async function sendUSDC(USDCAmount: number, recipientAddress: string){
    // const  = await convertNGN2USDC(amt);
    console.log("USD Amount:", USDCAmount);
    if (!USDCAmount) {
        return;
    }
    const amount = Number(USDCAmount) * 1000000;

    const { data: coins } = await suiClient.getCoins({
        owner: senderKeypair.getPublicKey().toSuiAddress(),
        coinType: USDC_TYPE,
    });
    if(coins.length == 0) throw Error ("Coins are empty");
    console.log("Coins:", coins);
    const coin_balance = Number(coins[0].balance) / 1000000;
    console.log("Balance in USDC:", coin_balance);
    console.log("Balance in NGN:", await convertUSDC2NGN(coin_balance));

    const tx = new Transaction();

    const [coin] = tx.splitCoins(coins[0].coinObjectId, [amount]);
    tx.transferObjects([coin], tx.pure.address(recipientAddress));
    
    // tx.setGasOwner(senderKeypair.getPublicKey().toSuiAddress());
    // tx.setGasPayment([{ objectId: coins[0].coinObjectId, version: coins[0].version, digest: coins[0].digest }]);

    const { objectChanges, balanceChanges } = await suiClient.signAndExecuteTransaction({
        transaction: tx,
        signer: senderKeypair,
        options: {
            showBalanceChanges: true,
            showEvents: true,
            showInput: false,
            showEffects: true,
            showObjectChanges: true,
            showRawInput: false,
        }
    });

    // console.log(objectChanges, balanceChanges);
    if (objectChanges) {
        const message = `Successfully sent ${USDCAmount} USDC to ${recipientAddress}`
        console.log(message);
        return { status: 'success', message: message }
    } else {
        const message = `Failed to send ${USDCAmount} USDC to ${recipientAddress}`
        console.log(message);
        return { status: 'failed', message: message }
    }
}


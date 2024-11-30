import { SUI_CLIENT } from "./suiClient.ts";

export class SuiService {
    async getFormattedBalance(owner: string) {
        const res = await SUI_CLIENT.getBalance({
            owner,
        });
        return Number(Number(res.totalBalance) / 1000_000_000).toFixed(2);
    }

    async getBalance(owner: string) {
        const res = await SUI_CLIENT.getBalance({
            owner: owner,
            coinType: "0x3198cfde449a429036b8e72bd1235ce55976c7ff31e0232e1c5a5698898a84ba::usdc::USDC",
        });
        console.log(Number(Number(res.totalBalance) / 1000_000).toFixed(2))
        const  balance = {
            usdc : Number(Number(res.totalBalance) / 1000_000).toFixed(2),
            naira : Number(Number(res.totalBalance) / 1000_000 * 1740).toFixed(2)
        }
        return balance;
    }


}
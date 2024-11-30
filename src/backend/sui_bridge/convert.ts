import { usdToNgnRate } from "./get_price"

export async function convertNGN2USDC(amount: number) {
    const rate = await usdToNgnRate();
    if (isNaN(rate)) {
        return null;
    }
    const usdAmount = amount / rate;
    return Number(usdAmount.toFixed(6));
}

export async function convertUSDC2NGN(amount: number) {
    const rate = await usdToNgnRate();
    if (isNaN(rate)) {
        return null;
    }
    const ngnAmount = amount * rate;
    return Number(ngnAmount.toFixed(2));
}
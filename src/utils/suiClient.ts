import { SuiClient, getFullnodeUrl } from "@mysten/sui/client";

const rpcUrl = getFullnodeUrl("devnet");

export const SUI_CLIENT = new SuiClient({ url: rpcUrl });
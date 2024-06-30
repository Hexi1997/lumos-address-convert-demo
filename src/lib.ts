/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { BI, helpers, Indexer } from "@ckb-lumos/lumos";

const CKB_RPC_URL = "https://testnet.ckb.dev/rpc";
const indexer = new Indexer(CKB_RPC_URL);
// prettier-ignore
interface EthereumRpc {
    (payload: { method: 'personal_sign'; params: [string /*from*/, string /*message*/] }): Promise<string>;
  }

// prettier-ignore
export interface EthereumProvider {
    selectedAddress: string;
    isMetaMask?: boolean;
    enable: () => Promise<string[]>;
    addListener: (event: 'accountsChanged', listener: (addresses: string[]) => void) => void;
    removeEventListener: (event: 'accountsChanged', listener: (addresses: string[]) => void) => void;
    request: EthereumRpc;
  }
export const ethereum = (window as any).ethereum as EthereumProvider;
export const unisat = (window as any).unisat;

export function asyncSleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function capacityOf(address: string): Promise<BI> {
  const collector = indexer.collector({
    lock: helpers.parseAddress(address),
  });

  let balance = BI.from(0);
  for await (const cell of collector.collect()) {
    balance = balance.add(cell.cellOutput.capacity);
  }

  return balance;
}

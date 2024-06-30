/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { helpers, Script, config, commons } from "@ckb-lumos/lumos";
import { asyncSleep, capacityOf, unisat } from "./lib";

// use testnet config
config.initializeConfig(config.predefined.AGGRON4);

export function UnisatDemo() {
  const [bitcoinAddr, setBitcoinAddr] = useState("");
  const [omniAddr, setOmniAddr] = useState("");
  const [omniLock, setOmniLock] = useState<Script>();
  const [balance, setBalance] = useState("-");

  useEffect(() => {
    asyncSleep(300).then(() => {
      if (unisat) connectToWallet();
    });
  }, []);

  function connectToWallet() {
    unisat
      .requestAccounts()
      .then(([bitcoinAddr]: string[]) => {
        const omniLockScript = commons.omnilock.createOmnilockScript({
          auth: { flag: "BITCOIN", content: bitcoinAddr },
        });

        const omniAddr = helpers.encodeToAddress(omniLockScript);

        setBitcoinAddr(bitcoinAddr);
        setOmniAddr(omniAddr);
        setOmniLock(omniLockScript);

        return omniAddr;
      })
      .then((omniAddr:any) => capacityOf(omniAddr))
      .then((balance:any) => setBalance(balance.div(10 ** 8).toString() + " CKB"));
  }



  if (!unisat) return <div>UniSat is not installed</div>;
  if (!bitcoinAddr) return <button onClick={connectToWallet}>Connect to UniSat</button>;

  return (
    <div>
      <ul>
        <li>Bitcoin Address: {bitcoinAddr}</li>
        <li>Nervos Address(Omni): {omniAddr}</li>
        <li>
          Current Omni lock script:
          <pre>{JSON.stringify(omniLock, null, 2)}</pre>
        </li>

        <li>Balance: {balance}</li>
      </ul>
    </div>
  );
}
import { useEffect, useState } from "react";
import { helpers, Script, config, commons } from "@ckb-lumos/lumos";
import { asyncSleep, capacityOf, ethereum } from "./lib";

// use mainnet config
config.initializeConfig(config.predefined.LINA);

export function MetaMaskDemo() {
  const [ethAddr, setEthAddr] = useState("");
  const [omniAddr, setOmniAddr] = useState("");
  const [omniLock, setOmniLock] = useState<Script>();
  const [balance, setBalance] = useState("-");

  useEffect(() => {
    asyncSleep(100).then(() => {
      if (ethereum.selectedAddress) connectToMetaMask();
      ethereum.addListener("accountsChanged", connectToMetaMask);
    });
  }, []);

  function connectToMetaMask() {
    ethereum
      .enable()
      .then(([ethAddr]: string[]) => {
        const omniLockScript = commons.omnilock.createOmnilockScript({
          auth: { flag: "ETHEREUM", content: ethAddr },
        });

        const omniAddr = helpers.encodeToAddress(omniLockScript);

        setEthAddr(ethAddr);
        setOmniAddr(omniAddr);
        setOmniLock(omniLockScript);

        return omniAddr;
      })
      .then((omniAddr) => capacityOf(omniAddr))
      .then((balance) => setBalance(balance.div(10 ** 8).toString() + " CKB"));
  }

  if (!ethereum) return <div>MetaMask is not installed</div>;
  if (!ethAddr)
    return <button onClick={connectToMetaMask}>Connect to MetaMask</button>;

  return (
    <div>
      <ul>
        <li>Ethereum Address: {ethAddr}</li>
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

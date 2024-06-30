import { useState } from "react";
import { MetaMaskDemo } from "./MetaMask";
import { UnisatDemo } from "./Unisat";

export function App() {
  const [type, setType] = useState<"metamask" | "unisat">();
  return (
    <div>
      <button
        onClick={() => {
          setType("metamask");
        }}
      >
        metamask(如果无法connect，请禁用okx插件)
      </button>
      <button
        onClick={() => {
          setType("unisat");
        }}
      >
        unisat
      </button>
      <br />
      <br />
      <br />
      {type === "metamask" && <MetaMaskDemo />}
      {type==="unisat" &&  <UnisatDemo />}
    </div>
  );
}

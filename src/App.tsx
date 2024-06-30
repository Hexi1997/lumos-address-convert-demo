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
        metamask
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

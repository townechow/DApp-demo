"use client";

import { useEffect, useState } from "react";
import { Connector, useConnect } from "wagmi";

export function WalletOptions() {
  const { connectors } = useConnect();

  return (
    <div className="m-2">
      <h1 className="text-4xl font-bold mb-4">Select a wallet to connect</h1>
      <div className="flex flex-col gap-4">
        {connectors.map((connector) => {
          return (
            <WalletConnectButton key={connector.id} connector={connector} />
          );
        })}
      </div>
    </div>
  );
}


function WalletConnectButton({ connector }: { connector: Connector }) {
  const [ready, setReady] = useState(false);
  const { connect } = useConnect();

  useEffect(() => {
    (async () => {
      const provider = await connector.getProvider();
      setReady(!!provider);
    })();
  }, [connector]);

  return (
    <button
      disabled={!ready}
      onClick={() => connect({ connector })}
      className="border border-gray-300 rounded-md p-2 cursor-pointer"
    >
     {connector.name}
    </button>
  );
}

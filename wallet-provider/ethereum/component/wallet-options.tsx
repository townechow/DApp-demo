"use client";

import { useEffect, useState } from "react";
import { Connector, useConnect } from "wagmi";

export function WalletOptions() {
  const { connectors } = useConnect();

  const metaMaskConnector = connectors.find(
    (connector) => connector.type === "metaMask"
  );
  const walletConnectConnector = connectors.find(
    (connector) => connector.type === "walletConnect"
  );

  return (
    <div>
      <h1 className="text-4xl font-bold mb-4">Select wallet</h1>
      <div className="flex flex-col gap-4">
        {metaMaskConnector && <MetaMaskButton connector={metaMaskConnector} />}
        {walletConnectConnector && (
          <WalletConnectButton connector={walletConnectConnector} />
        )}
      </div>
    </div>
  );
}

function MetaMaskButton({ connector }: { connector: Connector }) {
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
      MetaMask connect
    </button>
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
      WalletConnect connect
    </button>
  );
}

"use client";

import { useAccount, useDisconnect } from "wagmi";

import { useEthereumWallet } from "../hook/use-ethereum-wallet";

export function Account() {
  const { address } = useAccount();
  const { handleSignInBackend, authStatus, handleSignOut } =
    useEthereumWallet();
  const { disconnect } = useDisconnect();

  const handleSignIn = async () => {
    const result = await handleSignInBackend();
    if (result) {
      alert("sign in success ✅");
    }
  };

  return (
    <div className="flex flex-col gap-4 mt-10">
      {address && <div>{address}</div>}
      {authStatus === "authenticated" ? (
        <button
          onClick={handleSignOut}
          className="border border-gray-300 rounded-md p-2 cursor-pointer"
        >
          Sign Out
        </button>
      ) : (
        <button
          onClick={handleSignIn}
          className="border border-gray-300 rounded-md p-2 cursor-pointer"
        >
          Sign In
        </button>
      )}
      <button
        onClick={() => {
          handleSignOut();
          disconnect();
        }}
        className="border border-gray-300 rounded-md p-2 cursor-pointer"
      >
        Disconnect
      </button>
    </div>
  );
}

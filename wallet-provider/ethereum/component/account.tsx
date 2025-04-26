"use client";

import { useAccount, useDisconnect, useChainId, useSwitchChain } from "wagmi";

import { useEthereumWallet } from "../hook/use-ethereum-wallet";
import BalanceViewer from "@/components/BalanceViewer";
import Loading from "@/components/Loading";
import { getUserInfo } from "@/utils";

export function Account() {
  const { address, connector } = useAccount();
  const { handleSignInBackend, authStatus, handleSignOut } =
    useEthereumWallet();
  const { disconnect } = useDisconnect();
  const { chains, switchChain } = useSwitchChain();
  const chainId = useChainId();

  const handleSignIn = async () => {
    const result = await handleSignInBackend();
    if (result) {
      // alert("sign in success ✅");
    }
  };
  const curChain = chains.find((c) => c.id === chainId);
  const userInfo = getUserInfo();
  return (
    <div className="flex flex-col gap-4 m-2">
      {authStatus === "loading" && <Loading />}
      <div className="border border-gray-300 rounded-md flex flex-col gap-2 p-4">
        <h2 className="text-2xl font-bold mb-2">Web3</h2>
        <div className="flex gap-2 flex-col mb-1">
          <strong>Switch chain:</strong>
          <div className="flex gap-2 flex-wrap">
            {chains.map((chain) => {
              return (
                <button
                  key={chain.id}
                  onClick={() => {
                    switchChain({ chainId: chain.id });
                  }}
                  className="border border-gray-300 rounded-md px-4 py-2 cursor-pointer"
                >
                  {chain.name}
                </button>
              );
            })}
          </div>
        </div>
        <div>
          <strong>Chain:</strong> {curChain?.name}
        </div>
        <div>
          <strong>Wallet:</strong> {connector?.name}
        </div>
        {address && (
          <div className="break-all">
            <strong>Adress:</strong> {address}
          </div>
        )}
        {address && <BalanceViewer address={address} />}
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

      <div className="border border-gray-300 rounded-md flex flex-col gap-2 p-4">
        <h2 className="text-2xl font-bold mb-2">Web2</h2>
        {authStatus === "authenticated" && (
          <>
            <div>
              <strong>UID:</strong> {userInfo?.uid}
            </div>
            <div>
              <strong>Email:</strong> {userInfo?.email ?? "Not Set"}
            </div>
            <div>
              <strong>NickName:</strong> {userInfo?.nickname ?? "Not Set"}
            </div>
            <div>
              <strong>CreatedAt:</strong>{" "}
              {new Date(userInfo?.createdAt).toISOString()}
            </div>
          </>
        )}
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
      </div>
    </div>
  );
}

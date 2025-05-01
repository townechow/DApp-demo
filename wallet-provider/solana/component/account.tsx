"use client";
import { useState, useEffect } from "react";

// import BalanceViewer from "@/components/BalanceViewer";
import { useSolanaWallet } from "@/wallet-provider/solana/hook/use-solana-wallet";

import Loading from "@/components/Loading";
import { getUserInfo } from "@/utils";

export function Account() {
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  const [userInfo, setUserInfo] = useState<Record<string, any> | null>(null);
  const {
    address,
    authStatus,
    handleSignInBackend,
    handleConnect,
    handleSignOut,
    handleDisconnect,
  } = useSolanaWallet();
  const handleSignIn = async () => {
    const result = await handleSignInBackend();
    if (result) {
      // alert("sign in success ✅");
    }
  };
  useEffect(() => {
    setUserInfo(getUserInfo());
  }, [authStatus]);

  return (
    <div>
      {address ? (
        <div className="flex flex-col gap-4 m-2">
          {authStatus === "loading" && <Loading />}
          <div className="border border-gray-300 rounded-md flex flex-col gap-2 p-4">
            <h2 className="text-2xl font-bold mb-2">Web3</h2>
            {/* <div>
          <strong>Wallet:</strong> {provider?.}
        </div> */}
            {address && (
              <div className="break-all">
                <strong>Adress:</strong> {address}
              </div>
            )}
            {/* {address && <BalanceViewer address={address} />} */}
            <button
              onClick={() => {
                handleSignOut();
                handleDisconnect();
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
                  {new Date(userInfo?.createdAt ?? 0).toISOString()}
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
      ) : (
        <div className="m-2">
          <h1 className="text-4xl font-bold">Connet by phantom wallet</h1>
          <div className="flex flex-col gap-4 mt-10">
            <button
              onClick={handleConnect}
              className="border border-gray-300 rounded-md p-2 cursor-pointer"
            >
              Connect
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

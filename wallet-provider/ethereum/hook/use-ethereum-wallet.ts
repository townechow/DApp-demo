"use client";

import { useState } from "react";
import { useAccount } from "wagmi";
import { signMessage } from "@wagmi/core";
import { setUserToken, getUserToken } from "@/utils";

// signin-pipe-work
import {
  signInPipeWork,
  initAdapter,
  type AuthenticationAdapter,
} from "@/wallet-provider/signin-pipe-work";

// config
import { config } from "@/wallet-provider/ethereum/config";

/** ethereum 錢包登入 */
export function useEthereumWallet() {
  const [authStatus, setAuthStatus] = useState<
    "unauthenticated" | "authenticated" | "loading"
  >(getUserToken() ? "authenticated" : "unauthenticated");
  const { address, chainId } = useAccount();

  /**
   * Sign Message
   * 簽名測試 https://etherscan.io/verifiedSignatures#
   */
  const handleSignMessage = async (message: string): Promise<string> => {
    const signedMessage = await signMessage(config, { message });
    return signedMessage;
  };

  /**
   * Sign In Backend and get userToken
   */
  const handleSignInBackend = async () => {
    if (authStatus === "authenticated" || authStatus === "loading") return;
    if (!address || !chainId) throw new Error("Address or chainId is not set");

    /** ethereum 錢包認證適配器 */
    const ethereumAuthAdapter: AuthenticationAdapter = {
      ...initAdapter,
      createSignature: async ({ nonce }) => {
        const signature = await handleSignMessage(nonce);
        return signature || "";
      },
    };

    try {
      setAuthStatus("loading");
      const signInFlow = signInPipeWork(address, chainId);
      const result = await signInFlow(ethereumAuthAdapter);
      if (result.error) throw new Error(result.error);
      setAuthStatus("authenticated");
      return true;
    } catch (error) {
      setAuthStatus("unauthenticated");
      throw error;
    }
  };
  const handleSignOut = () => {
    setAuthStatus("unauthenticated");
    setUserToken("");
  };
  return {
    authStatus,
    handleSignMessage,
    handleSignInBackend,
    handleSignOut,
  };
}

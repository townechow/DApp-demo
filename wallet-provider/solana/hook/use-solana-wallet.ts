"use client";

import { useEffect, useState } from "react";

// types
import type { PhantomProvider } from "../types";

// signin-pipe-work
import {
  signInPipeWork,
  initAdapter,
  type AuthenticationAdapter,
} from "@/wallet-provider/signin-pipe-work";

// utils
import { getProvider, signMessage } from "../utils";

// constants
import { CHAIN_ID } from "@/constants";
import { setUserToken } from "@/utils";

const SOLANA_CHAIN_ID = CHAIN_ID.SOLANA;

export function useSolanaWallet() {
  const [authStatus, setAuthStatus] = useState<
    "unauthenticated" | "authenticated" | "loading"
  >("unauthenticated");
  const [provider, setProvider] = useState<PhantomProvider | null>(null);
  const [address, setAddress] = useState<string>("");

  /**
   * Connect
   * from https://github.com/phantom/sandbox/blob/b57fdd0e65ce4f01290141a01e33d17fd2f539b9/src/App.tsx#L262
   */
  const handleConnect = async (): Promise<string> => {
    if (!provider) throw new Error("Solana provider not found");

    try {
      const response = await provider.connect();
      const publicKey = response.publicKey.toString();
      setAddress(publicKey);
      return publicKey;
    } catch (error) {
      setAddress("");
      throw error;
    }
  };
  const handleDisconnect = async () => {
    if (!provider) throw new Error("Solana provider not found");
    await provider.disconnect();
    setAddress("");
  };

  /**
   * Sign Message
   * 签名测试 https://solscan.io/verifiedsignatures
   * from https://github.com/phantom/sandbox/blob/b57fdd0e65ce4f01290141a01e33d17fd2f539b9/src/App.tsx#L242
   */
  const handleSignMessage = async (message: string): Promise<string> => {
    if (!provider) throw new Error("Solana provider not found");
    const signedMessage = await signMessage(provider, message);
    return signedMessage;
  };

  /**
   * Sign In Backend and get userToken
   */
  const handleSignInBackend = async () => {
    if (authStatus === "authenticated" || authStatus === "loading") return;
    if (!address) throw new Error("Address not found");

    /** solana 钱包登录认证适配器 */
    const solanaAuthAdapter: AuthenticationAdapter = {
      ...initAdapter,
      createSignature: async ({ nonce }) => {
        const signature = await handleSignMessage(nonce);
        return signature || "";
      },
    };

    try {
      setAuthStatus("loading");
      const signInFlow = signInPipeWork(address, SOLANA_CHAIN_ID);
      const result = await signInFlow(solanaAuthAdapter);
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
  /**
   * Initialize
   */
  useEffect(() => {
    const newProvider = getProvider();
    if (newProvider) {
      setProvider(newProvider);
    }
    
  }, []);

  return {
    authStatus,
    address,
    provider,
    handleConnect,
    handleSignMessage,
    handleSignInBackend,
    handleDisconnect,
    handleSignOut,
  };
}

import { recoverMessageAddress } from "viem";
import {
  verifySignature as verifySignatureSolana,
  getUtf8Encoder,
  getBase58Encoder,
  getPublicKeyFromAddress,
  type Address,
  type SignatureBytes,
} from "@solana/kit";

type chainType = "ETHEREUM" | "SOLANA" | "TRON" | "POLYGON";
export async function verifySignature(
  signature: string,
  address: string,
  message: string,
  chainType: chainType
): Promise<boolean> {
  if (chainType === "ETHEREUM") {
    try {
      const recovered = await recoverMessageAddress({
        message: message,
        signature: signature as `0x${string}`,
      });
      return recovered.toLowerCase() === address.toLowerCase();
    } catch (error) {
      console.error("Ethereum verification failed", error);
      return false;
    }
  }
  if (chainType === "SOLANA") {
    try {
      const messageBytes = getUtf8Encoder().encode(message);
      const signatureBytes = getBase58Encoder().encode(
        signature
      ) as SignatureBytes;
      const publicKey = await getPublicKeyFromAddress(address as Address);
      return await verifySignatureSolana(
        publicKey,
        signatureBytes,
        messageBytes
      );
    } catch (error) {
      console.error("Solana verification failed", error);
      return false;
    }
  }
  if (chainType === "TRON") {
    return false;
  }

  return false;
}

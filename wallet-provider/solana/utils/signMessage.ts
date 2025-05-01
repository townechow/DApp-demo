import { PhantomProvider } from "../types";
import { getBase58Decoder } from "@solana/kit";

/**
 * Signs a message
 * 签名测试 https://solscan.io/verifiedsignatures
 * @param   {PhantomProvider} provider a Phantom Provider
 * @param   {String}          message  a message to sign
 * @returns {Promise<string>}          The signature in base58 format
 */
const signMessage = async (
  provider: PhantomProvider,
  message: string
): Promise<string> => {
  const encodedMessage = new TextEncoder().encode(message);
  const signedMessage = await provider.signMessage(encodedMessage);

  // Handle the signature data properly
  const signatureByteArray =
    signedMessage.signature?.data || signedMessage.signature;
  if (!signatureByteArray) throw new Error("No signature data received");

  // Convert byte array to base58
  const signatureString = getBase58Decoder().decode(signatureByteArray);
  return signatureString;
};

export default signMessage;

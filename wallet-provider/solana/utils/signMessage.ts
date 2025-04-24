import bs58 from 'bs58';
import { PhantomProvider } from '../types';

/**
 * Signs a message
 * 簽名測試 https://solscan.io/verifiedsignatures
 * @param   {PhantomProvider} provider a Phantom Provider
 * @param   {String}          message  a message to sign
 * @returns {Promise<string>}          The signature in base58 format
 */
const signMessage = async (provider: PhantomProvider, message: string): Promise<string> => {
    const encodedMessage = new TextEncoder().encode(message);
    const signedMessage = await provider.signMessage(encodedMessage);

    // Handle the signature data properly
    const signatureByteArray = signedMessage.signature?.data || signedMessage.signature;
    if (!signatureByteArray) throw new Error('No signature data received');
    
    // Convert byte array to base58
    const signatureString = bs58.encode(signatureByteArray);
    return signatureString;
};

export default signMessage;

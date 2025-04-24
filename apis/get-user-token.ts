import { ChainType } from "./type";

export type Args = {
    address: string;
    chainType: ChainType;
    signature: string;
}

export const getUserToken = async ({ address, chainType, signature }: Args) => {
    const baseUrl = '/api/auth/verify'
    const response = await fetch(baseUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'nb-business-id': '240053',
        },
        body: JSON.stringify({
            address,
            chainType,
            signature
        })
    });

    if (!response.ok) {
        throw new Error(`Failed to get user token`);
    }

    const data = await response.json();
    return data;
}
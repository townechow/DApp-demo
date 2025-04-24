import { CHAIN_ID } from "@/constants"
import { ChainType } from "@/apis/type"

export const getChainType = (chainId: number): ChainType => {
    if (chainId === CHAIN_ID.SOLANA) return 'SOLANA'
    if (chainId === CHAIN_ID.TRON) return 'TRON'
    return 'ETHEREUM'
}
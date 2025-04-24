import { http, createConfig } from 'wagmi'
import { mainnet, base, bsc, arbitrum } from 'wagmi/chains'
import { metaMask, walletConnect } from 'wagmi/connectors'

const projectId = process.env.NEXT_PUBLIC_ANALYTICS_WC_ID!

export const config = createConfig({
  ssr: true,
  chains: [mainnet, base, bsc, arbitrum],
  connectors: [
    metaMask(),
    walletConnect({ projectId }),
  ],
  transports: {
    [mainnet.id]: http(),
    [base.id]: http(),
    [bsc.id]: http(),
    [arbitrum.id]: http(),
  },
})
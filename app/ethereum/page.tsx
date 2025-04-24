'use client'

import { useAccount } from 'wagmi'

// component
import { Account } from '@/wallet-provider/ethereum/component/account'
import { WalletOptions } from '@/wallet-provider/ethereum/component/wallet-options'

export default function EthereumPage() {
  return (
    <div className='flex flex-col items-center justify-center h-screen'>
      <ConnectWallet />
    </div>
  )
}

function ConnectWallet() {
  const { isConnected } = useAccount()

  return (
    <div>
      {isConnected ? <Account /> : <WalletOptions />}
    </div>
  )
}
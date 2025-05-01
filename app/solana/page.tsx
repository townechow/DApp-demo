'use client'

import { Account } from '@/wallet-provider/solana/component/account'

export default function SolanaPage() {
    return (
      <div className='flex flex-col items-center justify-center min-h-screen'>
        <ConnectWallet />
      </div>
    )
  }
  function ConnectWallet() {
  
    return (
      <div>
         <Account />
      </div>
    )
  }

'use client'

import { useSolanaWallet } from '@/wallet-provider/solana/hook/use-solana-wallet'

export default function SolanaPage() {
    const { address, handleConnect, handleSignInBackend } = useSolanaWallet()

    const handleSignIn = async () => {
        const result = await handleSignInBackend()
        if (result) {
            alert('sign in success ✅')
        }
    }

    return (
        <div>
            <h1 className='text-2xl font-bold text-center mt-10'>Solana</h1>
            <div className='flex flex-col gap-4 w-1/2 mx-auto mt-5'>
                <button className='border' onClick={handleConnect}>Connect</button>
                <button className='border' onClick={handleSignIn}>Sign In</button>
                <p>{address}</p>
            </div>
        </div>
    )
}
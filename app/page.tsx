import Link from "next/link"
export default function Home() {
  return (
    <div className='flex flex-col items-center justify-center h-screen'>
      <h1 className='text-4xl font-bold mb-4'>Select chain</h1>
      <div className='flex gap-4 flex-col' >
        <Link href='/ethereum' className="border border-gray-300 rounded-md py-2 px-4 text-center">Ethereum</Link>
        <Link href='/solana' className="border border-gray-300 rounded-md py-2 px-4 text-center">Solana</Link>
      </div>
    </div>
  )
}
import { useBalance } from "wagmi";

export default function BalanceViewer({ address }: { address: `0x${string}` }) {
  const { data, isError, isLoading } = useBalance({
    address,
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching balance</div>;

  return (
    <div>
      <strong>Balance:</strong> {data?.formatted} {data?.symbol}
    </div>
  );
}

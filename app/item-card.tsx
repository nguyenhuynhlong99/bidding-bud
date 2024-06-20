import { Item } from '@/db/schema';
import Image from 'next/image';

export function ItemCard({ item }: { item: Item }) {
  return (
    <div className="border p-8 rounded-xl space-y-2">
      <Image src={item.imageUrl} alt={item.name} width={200} height={200} />
      <h2 className="text-xl font-bold">{item.name}</h2>
      <p className="text-lg">starting price: ${item.startingPrice / 100}</p>
    </div>
  );
}
